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
