<template>
  <div class="home">
    <div class="container">
      <div class="users-list">
        <router-link
          tag="div"
          class="user"
          v-for="(user, key) in users"
          :key="key"
          :to="/chat/ + key"
        >
          <div class="userName">
            <div class="nameChar">{{ user.name.charAt(0) }}</div>
            <div class="name">{{ user.name }}</div>
          </div>
          <div class="status">
            <div class="userStatus" :class="[user.status ? '' : 'offline']">
              {{ user.status ? "Online" : "Offline" }}
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // users: [
      //   {
      //     id: 1,
      //     name: "Hafiz Javaid",
      //     status: true,
      //   },
      //   {
      //     id: 2,
      //     name: "Hafiz Ali",
      //     status: false,
      //   },
      //   {
      //     id: 3,
      //     name: "Hafiz Anam",
      //     status: true,
      //   },
      // ],
    };
  },
  methods: {
    user() {
      this.$route.push("/chat");
    },
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
  },
};
</script>

<style scoped>
.users-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.users-list .user {
  flex: 0 0 100%;
  max-width: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.3s linear;

  /* background-color: aliceblue; */
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}
.users-list .user:hover {
  background-color: #ddd;
  cursor: pointer;
}
.users-list .user .userName {
  flex: 0 0 50%;
  max-width: 50%;
  display: flex;
}
.users-list .user .userName .nameChar {
  width: 60px;
  height: 60px;
  color: #fff;
  background-color: greenyellow;
  border-radius: 50%;
  margin: 10px 20px;
  line-height: 60px;
  text-align: center;
}
.users-list .user .userName .name {
  background: none;
  border-radius: 0;
  margin: 10px 0;
  color: #000;
  line-height: 60px;
  text-align: center;
}
.users-list .user .status {
  flex: 0 0 50%;
  max-width: 50%;
  justify-self: flex-end;
  /* text-align: right; */
  display: flex;
  justify-content: flex-end;
}
.users-list .user .status .userStatus {
  color: #fff;
  background-color: greenyellow;

  margin: 10px 20px;
  line-height: 40px;
  text-align: center;
  padding: 0px 30px;
}
.offline {
  background-color: red !important;
}
</style>


