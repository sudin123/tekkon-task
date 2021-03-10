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
    access_token: String
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): User!
  }
`;
