const jwt = require('jsonwebtoken');
const {GraphQLError} = require('graphql')

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // authMiddleware: function({ req }) {
  //   // allows token to be sent via req.body, req.query, or headers
  //   let token = req.body.token || req.query.token || req.headers.authorization;

  //   // ["Bearer", "<tokenvalue>"]
  //   if (req.headers.authorization) {
  //     token = token
  //       .split(' ')
  //       .pop()
  //       .trim();
  //   }

  //   if (!token) {
  //     return req;
  //   }

  //   try {
  //     const { data } = jwt.verify(token, secret, { maxAge: expiration });
  //     req.user = data;
  //   } catch {
  //     console.log('Invalid token');
  //   }

  //   return req;
  authMiddleware: async ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization || '';

    // try to retrieve a user with the token
    const user = getUser(token);

    // optionally block the user
    // we could also check user roles/permissions here
    if (!user)
      // throwing a `GraphQLError` here allows us to specify an HTTP status code,
      // standard `Error`s will have a 500 status code by default
      throw new GraphQLError('User is not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        },
      });

    // add the user to the context
    return { user };
  },
  signToken: function({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  }
};
