<template>
  <h1>Landing Page</h1>
</template>

<script>
export default {
  apollo: {
    users: require("../graphql/users.gql"),
  },
};
</script>
