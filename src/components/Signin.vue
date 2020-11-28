<template>
  <div class="postform loginform">
    <div class="container container2">
      <div class="row">
        <div class="form-container">
          <form class="form" @submit.prevent="onSubmit">
            <div class="row spam">
              <h3>Login/ Signin</h3>
            </div>

            <div class="row">
              <div class="input-group">
                <input
                  type="text"
                  class="input-control"
                  placeholder="Enter Your Email"
                  v-model="email"
                />
              </div>
            </div>
            <div class="row">
              <div class="input-group">
                <input
                  type="password"
                  class="input-control"
                  placeholder="Enter Your Password"
                  v-model="password"
                />
              </div>
            </div>

            <div class="row">
              <div class="input-group">
                <button class="btn" type="submit">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Datetime } from "vue-datetime";
export default {
  //   props: ["meetup"],
  data() {
    return {
      email: "hafiz@gmail.com",
      password: "123456",
    };
  },

  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    },
  },
  methods: {
    onSubmit() {
      console.log("1");
      this.$store.dispatch("signIn", {
        email: this.email,
        password: this.password,
      });
      this.$store.dispatch("fetchUsers");
      this.$router.push("/");
      // this.$store.dispatch("fetchUsers");
    },
  },
};
</script>

<style scoped>
.postform {
  /* height: 100vh; */
  z-index: 333;
  display: grid;
  place-items: center;
  top: 50px;
}
.spam {
  position: relative;
}
span {
  display: inline-block;

  position: absolute;
  right: 12px;
  bottom: 19px;
  background: var(--black2);
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 50%;
  cursor: pointer;
}
span i {
  color: var(--grey1);
}
.postform .row {
  display: flex;
  justify-content: center;
  align-items: center;
}
.postform .row .form-container {
  flex: 0 0 100%;
  max-width: 100%;
}
.postform .form-container .form {
  width: 400px;
  max-width: 400px;
  background-color: var(--black1);
  margin: auto;
  padding: 30px 25px;
  box-shadow: 0 0 10px var(--border);
  padding-top: 10px;
}
.form .input-group {
  flex: 0 0 100%;
  max-width: 100%;
  padding: 0 15px;
}
.row h3 {
  padding-bottom: 15px;
  font-size: 25px;
  color: var(--grey1);
}
.form .input-control {
  display: block;
  width: 100%;
  height: 45px;
  margin-bottom: 20px;
  font-size: 16px;
  color: var(--black1);
  padding: 6px 12px;
  color: var(--grey1);
  border: 1px solid #ccc;
  background-color: var(--black1);
}
.container2 {
  margin-top: 20px;
}

.form textarea.input-control {
  height: 120px;
  padding-top: 12px;
  /* vertical-align: ; */
  resize: none;
}
.form .input-control:focus {
  outline: none;
}
.btn {
  color: var(--grey1);
  display: inline-block;
  margin: 0 0px;
  font-size: 16px;
  text-decoration: none;
  margin-bottom: 10px;
  text-transform: capitalize;
  cursor: pointer;
  border: none;
  padding: 7px 3px;
  width: 100%;
  margin-right: 10px;
  background-color: var(--black2);
}
.btn:focus {
  outline: none;
}
.loginform {
  position: relative !important;
  display: grid;
  place-items: center;
  /* background-color: var(--black1); */
}
@media (max-width: 500px) {
  .postform .form-container .form {
    width: 300px;
    max-width: 300px;
  }
}
</style>>
