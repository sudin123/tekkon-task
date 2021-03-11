<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  created() {
    if (this.user) {
      this.toggleOnlineStatus(true);
      window.addEventListener("beforeunload", this.leaving);
    }
  },
  methods: {
    leaving() {
      this.toggleOnlineStatus(false);
    },
    toggleOnlineStatus(status) {
      this.$apollo.mutate({
        mutation: require("./graphql/online_status.gql"),
        variables: {
          is_online: status,
        },
      });
    },
  },
};
</script>

<style>
.help {
  float: left;
}
</style>
