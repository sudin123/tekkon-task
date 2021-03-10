<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-black">Login</h3>
          <hr class="login-hr" />
          <p class="subtitle has-text-black">Please login to proceed.</p>
          <div class="box">
            <ApolloMutation
              :mutation="require('../graphql/login.gql')"
              :variables="{
                email,
                password,
              }"
              class="form"
              @done="formData = {}"
            >
              <template slot-scope="{ mutate }">
                <div @keypress.enter="mutate()">
                  <div class="field">
                    <div class="control">
                      <input
                        v-model="email"
                        class="input is-large"
                        type="email"
                        placeholder="Your Email"
                        autofocus=""
                      />
                    </div>
                  </div>

                  <div class="field">
                    <div class="control">
                      <input
                        v-model="password"
                        class="input is-large"
                        type="password"
                        placeholder="Your Password"
                      />
                    </div>
                  </div>
                  <div class="field">
                    <label class="checkbox">
                      <input type="checkbox" />
                      Remember me
                    </label>
                  </div>
                  <button
                    class="button is-block is-info is-large is-fullwidth"
                    @click="mutate()"
                  >
                    Login <i class="fa fa-sign-in" aria-hidden="true"></i>
                  </button>
                </div>
              </template>
            </ApolloMutation>
          </div>
          <p class="has-text-grey">
            <a href="#">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
};
</script>
<style scoped>
.hero.is-success {
  background: #f2f6fa;
}
.hero .nav,
.hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.box {
  margin-top: 5rem;
}
.avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}
.avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
input {
  font-weight: 300;
}
p {
  font-weight: 700;
}
p.subtitle {
  padding-top: 1rem;
}

.login-hr {
  border-bottom: 1px solid black;
}

.has-text-black {
  color: black;
}

.field {
  padding-bottom: 10px;
}

.fa {
  margin-left: 5px;
}
</style>
