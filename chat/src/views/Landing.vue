<template>
  <div>
    <div class="columns">
      <div class="column is-2 messages hero is-fullheight">
        <div class="users-list">
          <p class="users-list-header">
            Simple Chat Application
          </p>
          <UsersList />
        </div>
      </div>
      <div class="column " id="message-feed">
        <nav
          class="navbar secondary-navbar"
          role="navigation"
          aria-label="main navigation"
        >
          <div class="navbar-brand">
            <p style="padding:15px;color:black" class="user-name">
              {{ $route.query.n }}
            </p>
          </div>

          <div class="navbar-menu">
            <div class="navbar-end">
              <div class="navbar-item">
                <p style="padding:15px;color:black" class="user-name">
                  Logged in as {{ user.name }}
                </p>
                <div class="buttons">
                  <a @click="logout()" class="button is-light">
                    Log Out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <MessagesList />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    UsersList: () => import("../components/Chat/_users-list"),
    MessagesList: () => import("../components/Chat/_messages-list"),
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  created() {
    this.toggleOnlineStatus(true);
    window.addEventListener("beforeunload", this.leaving);
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$router.replace({ query: {} });
      location.reload();
    },
    leaving() {
      this.toggleOnlineStatus(false);
    },
    toggleOnlineStatus(status) {
      this.$apollo.mutate({
        mutation: require("../graphql/online_status.gql"),
        variables: {
          is_online: status,
        },
      });
    },
  },
};
</script>

<style>
.aside {
  display: block;
  background-color: #f9f9f9;
  border-right: 1px solid #dedede;
}

.messages {
  background-color: #611f69;
  display: block;
  border-right: 1px solid #dedede;
  padding: 40px 20px;
}

.menu-label {
  color: white;
}
span,
p,
i {
  color: white;
}

.users-list-header {
  padding: 8px;
  font-size: 18px;
  font-weight: 900;
  margin-bottom: 15px;
}
.secondary-navbar {
  border-bottom: 1px solid #dedede;
}
.navbar-brand {
  text-align: center;
}

.user-name {
  font-size: 14px;
  font-weight: 400;
}

.dot {
  height: 10px;
  width: 10px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  margin-top: 5px;
}
</style>
