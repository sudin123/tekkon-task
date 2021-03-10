const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    info: String
    users: [User]!
  }

  type User {
    _id: String
    email: String
    name: String
  }
`;
