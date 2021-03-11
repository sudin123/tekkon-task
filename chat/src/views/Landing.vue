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
    return {};
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
