<template>
  <div class="users" v-if="users">
    <div
      class="user"
      v-for="(user, index) in users"
      :key="index"
      :class="{ 'is-active': user._id == $route.query.i }"
      @click="chat(user, index)"
    >
      <div class="user-info">
        <span
          v-if="user.is_online"
          class="dot"
          style="margin-right: 10px;background-color:#6dae6d"
        ></span>
        <span v-else class="dot" style="margin-right: 10px"></span>
        <span class="user-name">{{ user.name }}</span>
      </div>
      <span
        class="unread-message-count"
        v-if="chats && getUnreadCount(user) > 0 && $route.query.i !== user._id"
        >{{ getUnreadCount(user) }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  apollo: {
    users: require("../../graphql/users.gql"),
    chats: require("../../graphql/chats.gql"),
    $subscribe: {
      refreshUsers: {
        query: require("../../graphql/refresh_users.gql"),
        result(_) {
          this.refresh();
        },
      },
    },
  },

  data() {
    return {
      authUser: JSON.parse(localStorage.getItem("user")),
    };
  },

  created() {
    this.$bus.on("refresh-chats", () => {
      this.$apollo.queries.chats.refetch();
    });
  },

  destroyed() {
    this.$bus.off("refresh-chats");
  },

  methods: {
    getUnreadCount(user) {
      for (let i = 0; i < this.chats.length; i++) {
        if (
          (this.chats[i].user1_id == user._id &&
            this.chats[i].user2_id == this.authUser._id) ||
          (this.chats[i].user2_id == user._id &&
            this.chats[i].user1_id == this.authUser._id)
        ) {
          return this.chats[i].unread_messages_count;
        }
      }
      return 0;
    },
    refresh() {
      this.$apollo.queries.users.refetch();
    },
    chat(user) {
      if (`i` in this.$route.query && this.$route.query.i == user._id) {
        return;
      }
      this.$router.replace({ query: { i: user._id, n: user.name } });
    },
  },
  updated() {
    if (this.users.length > 0 && !(`i` in this.$route.query)) {
      this.$router.replace({
        query: { i: this.users[0]._id, n: this.users[0].name },
      });
    }
    if (this.users.length == 0) {
      this.$buefy.dialog.alert({
        title: "No Users",
        message: "There are no other users to chat with",
        confirmText: "Cool!",
      });
    }
  },
};
</script>
<style scoped>
.user {
  padding: 8px;
  padding-bottom: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}
.user-info {
  display: flex;
  justify-content: space-between;
}

.avatar {
  vertical-align: middle;
  width: 20px;
  height: 20px;
  border-radius: 30%;
  margin-right: 5px;
}
.unread-message-count {
  background: red;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  margin-left: 10px;
}

.is-active {
  background-color: blue;
  border-radius: 5px;
}
</style>
