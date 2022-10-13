const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//User Schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 12,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

//Static methods
// userSchema.statics.findByCredentials = async (email, password) => {
//   const user = await User.findOne({ email });
//   if (user) {
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (isMatch) {
//       return user;
//     } else {
//       throw new Error("Unable to login");
//     }
//   } else {
//     throw new Error({ error: "Unable to login" });
//   }
// };
// //User methods for encrypt password and generate auth token.
// userSchema.methods.encryptPassword = async (password) => {
//   return await bcrypt.hash(password, 8);
// };

// userSchema.methods.generateAuthToken = async function () {
//   const user = this;

//   const token = jwt.sign(
//     { _id: user._id.toString() },
//     process.env.AUTHTOKENSTRING
//   );
//   user.tokens = user.tokens.concat({ token });

//   try {
//     await user.save();
//   } catch (error) {
//     throw new Error(error);
//   }

//   return token;
// };

// userSchema.methods.toJSON = function () {
//   const user = this;
//   const userObject = user.toObject();

//   return userObject.tokens;
// };

// const User = model("User", userSchema);

// module.exports = User;

userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;