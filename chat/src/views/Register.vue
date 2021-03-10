<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-black">Register</h3>
          <hr class="login-hr" />
          <p class="subtitle has-text-black">Please register to proceed.</p>
          <div class="box">
            <ApolloMutation
              :mutation="require('../graphql/register.gql')"
              :variables="{
                ...formData,
              }"
              class="form"
              @done="registered"
            >
              <template slot-scope="{ mutate, loading, error }">
                <span v-if="error">
                  {{ populateErrors(error) }}
                  <p v-if="errorMessage !== null" style="color:red">
                    {{ errorMessage }}
                  </p>
                </span>
                <div @keypress.enter="mutate()">
                  <b-field
                    :type="`name` in errors ? 'is-danger' : null"
                    :message="`name` in errors ? errors['name'] : null"
                  >
                    <b-input
                      placeholder="Your Name"
                      v-model="formData.name"
                    ></b-input>
                  </b-field>

                  <b-field
                    :type="`email` in errors ? 'is-danger' : null"
                    :message="`email` in errors ? errors['email'] : null"
                  >
                    <b-input
                      type="email"
                      placeholder="Your Email"
                      v-model="formData.email"
                    ></b-input>
                  </b-field>

                  <b-field
                    :type="`password` in errors ? 'is-danger' : null"
                    :message="`password` in errors ? errors['password'] : null"
                  >
                    <b-input
                      type="password"
                      placeholder="Your Password"
                      v-model="formData.password"
                    ></b-input>
                  </b-field>

                  <b-field>
                    <b-input
                      type="password"
                      placeholder="Retype password"
                      v-model="formData.password_confirmation"
                    ></b-input>
                  </b-field>

                  <b-button
                    :loading="loading"
                    class="button is-block is-info is-large is-fullwidth"
                    @click="mutate()"
                  >
                    Register <i class="fa fa-sign-in" aria-hidden="true"></i>
                  </b-button>
                </div>
              </template>
            </ApolloMutation>
          </div>
          <p class="has-text-grey">
            <a @click="$router.push('/')">Login</a>
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
      formData: {},
      errors: {},
      errorMessage: null,
    };
  },
  methods: {
    populateErrors(error) {
      if (
        error.graphQLErrors[0].extensions.code === "GRAPHQL_VALIDATION_FAILED"
      ) {
        let errors = JSON.parse(error.graphQLErrors[0].message);
        errors.map((err) => {
          this.errors[err.field] = err.message;
        });
      } else {
        this.errorMessage = error.graphQLErrors[0].message;
      }
    },
    registered(res) {
      let registeredUser = res.data.register;
      localStorage.setItem("user", JSON.stringify(registeredUser));
      location.reload();
    },
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
