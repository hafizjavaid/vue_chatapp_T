<template>
  <div class="home">
    <div class="btns">
      <button @click="value = 'Signin'">Signin</button>
      <button @click="value = 'Signup'">Signup</button>
    </div>
    <component :is="value"></component>
  </div>
</template>

<script>
import Signin from "../components/Signin";
import Signup from "../components/Signup";
export default {
  name: "Home",
  data() {
    return {
      value: "Signin",
    };
  },
  components: {
    Signin,
    Signup,
  },
};
</script>
