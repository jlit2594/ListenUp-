const { Schema, model } = require("mongoose");
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');
const slugify = require("slugify");

//Post Schema
const postSchema = new Schema(
  {
    postTitle: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    comments: [commentSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

// postSchema.pre("validate", function(next) {
//   const post = this;
  
//   if(post.title) {
//     post.slug = slugify(post.title, { lower: true, strict: true });
//   }

//   next();
// })

// const Post = model("Post", postSchema);

// module.exports = Post;

postSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

const Post = model('Post', postSchema);

module.exports = Post;