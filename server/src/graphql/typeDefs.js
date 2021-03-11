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
    is_online: Boolean
  }

  type Mutation {
    register(
      name: String
      email: String
      password: String
      password_confirmation: String
    ): User!
    login(email: String, password: String): User!
    toggleOnlineStatus(is_online: Boolean!): User!
  }

  type Subscription {
    refreshUsers: User!
  }
`;
