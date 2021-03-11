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
    };
  },
  created() {
    this.toggleOnlineStatus();
    window.addEventListener("beforeunload", this.leaving);
  },
  methods: {
    leaving() {
      this.toggleOnlineStatus();
    },
    toggleOnlineStatus() {
      this.$apollo.mutate({
        mutation: require("./graphql/online_status.gql"),
      });
    },
  },
  mounted() {
    // let observer = this.$apollo.subscribe({
    //   query: require("./graphql/new_user.gql"),
    // });
    // observer.subscribe({
    //   next(data) {
    //     console.log(data);
    //   },
    //   error(error) {
    //     console.error(error);
    //   },
    // });
  },
};
</script>

<style>
.help {
  float: left;
}
</style>
