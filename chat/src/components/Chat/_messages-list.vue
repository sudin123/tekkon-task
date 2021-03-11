<template>
  <div class="messages-list-container">
    <div class="messages-list" v-chat-scroll>
      <div
        class="message-data"
        v-for="(message, index) in messages"
        :key="index"
      >
        <div class="message-info">
          <p class="messenger-name">{{ getUsername(message) }}</p>
          <p class="messenger-timestamp" style="margin-left:5px">
            {{
              message.created_at == "Just now"
                ? "Just now"
                : $moment(+message.created_at).fromNow()
            }}
          </p>
        </div>
        <div
          class="message-inbox"
          style="color:black"
          v-html="formattedMessage(message.message)"
        ></div>
      </div>
    </div>

    <div class="is-typing">
      <p v-if="isTyping" style="font-style:italic;color:black;padding:12px">
        {{ chat.user.name }} is typing ...
      </p>
    </div>

    <div class="message-input" @keypress.enter="sendMessage">
      <b-input v-model="message" maxlength="200" type="textarea"></b-input>
    </div>
  </div>
</template>

<script>
export default {
  apollo: {
    $subscribe: {
      newMessage: {
        query: require("../../graphql/new_message.gql"),
        result({ data }) {
          if (
            data.newMessage.to == this.authUser._id &&
            data.newMessage.sender_id == this.$route.query.i
          ) {
            this.messages = [
              ...this.messages,
              ...[
                {
                  message: data.newMessage.message,
                  sender_id: data.newMessage.sender_id,
                  created_at: "Just now",
                },
              ],
            ];
          }
        },
      },
      isTyping: {
        query: require("../../graphql/is_typing.gql"),
        result({ data }) {
          if (
            data.isTyping.sender_id == this.$route.query.i &&
            data.isTyping.receiver_id == this.authUser._id
          ) {
            this.isTyping = true;
            setTimeout(() => {
              this.isTyping = false;
            }, 1000);
          }
        },
      },
    },
  },
  data() {
    return {
      chat: {},
      isLoading: false,
      message: "",
      messages: [],
      authUser: JSON.parse(localStorage.getItem("user")),
      isTyping: false,
    };
  },
  watch: {
    "$route.query.i": {
      immediate: true,
      handler(val) {
        if (val) {
          this.fetchChat();
        }
      },
    },
    message(val) {
      if (val.length > 2) {
        this.$apollo.mutate({
          mutation: require("../../graphql/send_typing_status.gql"),
          variables: {
            receiver_id: this.$route.query.i,
          },
        });
      }
    },
  },
  methods: {
    getUsername(message) {
      if (message.sender_id == this.authUser._id) {
        return this.authUser.name;
      }
      return this.chat.user.name;
    },
    async fetchChat() {
      this.isLoading = true;
      let res = await this.$apollo.query({
        query: require("../../graphql/chat.gql"),
        variables: {
          user_id: this.$route.query.i,
        },
      });
      this.chat = res.data.chat;
      this.fetchMessages();
      this.isLoading = false;
    },

    async fetchMessages() {
      let res = await this.$apollo.query({
        query: require("../../graphql/messages_list.gql"),
        variables: {
          chat_id: this.chat._id,
        },
      });
      this.messages = res.data.messages;
    },

    sendMessage(e) {
      try {
        if (this.message.trim().length == 0) {
          return;
        }
        if (e.charCode == 13 && e.shiftKey == true) {
          return;
        }
        e.preventDefault();
        this.$apollo.mutate({
          mutation: require("../../graphql/message.gql"),
          variables: {
            user_id: this.$route.query.i,
            message: this.message,
            chat_id: this.chat._id,
          },
        });

        this.messages = [
          ...this.messages,
          ...[
            {
              message: this.message,
              sender_id: this.authUser._id,
              created_at: "Just now",
            },
          ],
        ];
        this.message = "";
      } catch (e) {
        //eslint-disable
      }
    },
    formattedMessage(message) {
      let formattedMessage = message.replace(/\n/g, "<br />");
      var urlRegex = /(https?:\/\/[^\s]+)/g;
      return formattedMessage.replace(urlRegex, function(url) {
        return (
          '<a style="color:blue" href="' +
          url +
          '" target="_blank">' +
          url +
          "</a>"
        );
      });
    },
  },
};
</script>

<style scoped>
.messages-list-container {
  display: flex;
  flex-direction: column;
}

.messages-list {
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 12px;
  height: 70vh;
}
.message-data {
  padding-bottom: 18px;
}
.message-info {
  display: flex;
  /* flex-direction: column; */
}

.messenger-name {
  font-weight: bold;
  font-size: 15px;
  /* margin-right: 10px; */
}
.messenger-timestamp {
  font-size: 12px;
  font-weight: lighter;
  margin-top: 5px;
}
.messenger-name,
.messenger-timestamp {
  color: black;
}
.message-inbox {
  font-size: 14px;
  line-height: 25px;
}
.message-input {
  margin-bottom: 20px;
  padding: 12px;
}
</style>
