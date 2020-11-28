<template>
  <div id="nav">
    <router-link v-if="$route.fullPath.includes('/chat')" to="/" tag="button"
      >Back</router-link
    >
    {{ title }}
    <router-link v-if="!userIsAuthenticated" to="/auth" tag="button"
      >Login</router-link
    >
    <button v-else @click="logout">
      Logout
      <br />
      {{ userName }}
    </button>
  </div>
</template>
<script>
import mixinOtherUser from "@/mixins/mixin-other-user";
export default {
  mixins: [mixinOtherUser],
  computed: {
    title() {
      // console.log(this.$route);
      let current = this.$route.fullPath;
      if (current === "/") {
        return "RiggersChat";
      } else if (current.includes("/chat")) {
        return this.otherUser.name;
      } else if (current === "/auth") {
        return "Login";
      } else {
        return "";
      }

      //   return 1;
    },

    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== "undefined"
      );
    },
    userName() {
      return this.$store.getters.user.name;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("autoLogout", this.$store.getters.user);
      this.$router.replace("/auth");
    },
  },
};
</script>
<style>
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
