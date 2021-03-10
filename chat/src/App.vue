<template>
  <div id="app">
    <router-view></router-view>
    <!-- <ApolloMutation
      :mutation="require('./graphql/register.gql')"
      :variables="{
        email,
        name,
        password,
      }"
      class="form"
      @done="formData = {}"
    >
      <template slot-scope="{ mutate }">
        <form v-on:submit.prevent="mutate()">
          <label for="field-message">Message</label>
          <input
            id="field-message"
            v-model="name"
            placeholder="Type a message"
            class="input"
          />
        </form>
      </template>
    </ApolloMutation> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "sudin",
      password: "here",
      email: "email",
    };
  },
};
</script>
