<template>
  <div class="users" v-if="users">
    <div
      class="user"
      v-for="(user, index) in users"
      :key="index"
      :class="{ 'is-active': user._id == $route.query.i }"
    >
      <div class="user-info" @click="chat(user, index)">
        <span
          v-if="user.is_online"
          class="dot"
          style="margin-right: 10px;background-color:#6dae6d"
        ></span>
        <span v-else class="dot" style="margin-right: 10px"></span>
        <span class="user-name">{{ user.name }}</span>
      </div>
      <!-- <span class="unread-message-count">2</span> -->
    </div>
  </div>
</template>

<script>
export default {
  apollo: {
    users: require("../../graphql/users.gql"),
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
    return {};
  },
  methods: {
    refresh() {
      this.$apollo.queries.users.refetch();
    },
    chat(user) {
      if (`i` in this.$route.query && this.$route.query.i == user._id) {
        return;
      }
      this.$router.replace({ query: { i: user._id } });
    },
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
