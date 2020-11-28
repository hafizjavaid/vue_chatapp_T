<template>
  <div id="app">
    <Nav></Nav>
    <router-view />
  </div>
</template>
<script>
import Nav from "./views/Navbar";
export default {
  computed: {
    title() {
      console.log(this.$route);
      let current = this.$route.fullPath;
      if (current == "/") return "RiggersChat";
      else if (current == "/chat") return "Chat";
      else if (current == "/auth") return "Login";
      return 1;
    },
  },
  components: {
    Nav,
  },
};
</script>
<style>
#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  background-color: greenyellow;
  height: 7vh;
  line-height: 7vh;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.container {
  max-width: 900px;
  margin: auto;
  padding: 20px 20px;
  /* background-color: rgb(187, 137, 137); */
}
* {
  margin: 0;
  padding: 0;
}
</style>
