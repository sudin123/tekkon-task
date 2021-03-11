const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    info: String
    users: [User]!
    chat(user_id: String): Chat!
    messages(chat_id: String): [Message]!
    chats: [Chats!]
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
    sendMessage(user_id: String, message: String, chat_id: String): Message!
    sendTypingStatus(receiver_id: String): TypingStatus!
    readMessages(chat_id: String): Boolean
  }

  type Subscription {
    refreshUsers: User!
    newMessage: NewMessage!
    isTyping: TypingStatus!
  }

  type Chat {
    _id: String
    user: User!
  }

  type Chats {
    user1_id: String
    user2_id: String
    unread_messages_count: Int
  }

  type Message {
    chat_id: String
    message: String
    created_at: String
    sender_id: String
    is_read: Boolean
  }
  type NewMessage {
    sender_id: String
    to: String
    message: String
  }

  type TypingStatus {
    sender_id: String
    receiver_id: String
  }
`;
