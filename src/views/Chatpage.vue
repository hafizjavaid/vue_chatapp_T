


<template>
  <div class="container" ref="pageChat">
    <!-- It means if value is false -->
    <div class="user-status" v-if="!otherUser.status">
      <div>{{ otherUser.name }} is offline</div>
    </div>
    <div class="converse">
      <div class="bubbleWrapper" v-for="(message, i) in messages" :key="i">
        <div
          class="inlineContainer"
          :class="[message.from == 'me' ? 'own' : 'other']"
        >
          <div :class="[message.from == 'me' ? 'own' : 'other']">
            {{ message.text }}

            <span
              >+ {{ message.from == "me" ? user.name : otherUser.name }} +</span
            >
          </div>
        </div>
      </div>
    </div>

    <form class="conversation-compose" @submit.prevent="onSubmit">
      <input
        class="input-msg"
        name="input"
        placeholder="Type a message"
        autocomplete="off"
        autofocus
        v-model="message"
      />

      <button class="send" type="submit">
        <div class="circle">
          <i class="fas fa-arrow-right"></i>
        </div>
      </button>
    </form>
  </div>
</template>

<script>
import mixinOtherUser from "@/mixins/mixin-other-user";
export default {
  mixins: [mixinOtherUser],
  name: "Home",
  data() {
    return {
      message: "",
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("sendMessage", {
        message: {
          text: this.message,
          from: "me",
        },
        otherUserId: this.$route.params.id,
      });
      // this.messages.push({});
      this.message = "";
    },
    scrollBottom() {
      // let pageChat = ;
      // console.log(pageChat);
      var container = this.$el.querySelector(".converse");
      // container.scrollHeight;
      console.log("Height : " + container.scrollHeight);
      container.scrollTop = container.scrollHeight;
    },
  },
  components: {},
  mounted() {
    console.log("id:");
    this.$store.dispatch("getFireMessages", this.$route.params.id);
  },
  computed: {
    messages() {
      return this.$store.state.messages;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  destroyed() {
    this.$store.dispatch("stopFireMessages");
  },
  watch: {
    messages: function (val) {
      if (Object.keys(val).length) {
        this.scrollBottom();
      }
    },
  },
};
</script>
<style scoped>
.container {
  position: relative;
  height: calc(100vh - 157px);
}

.conversation-compose {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  overflow: hidden;
  height: 50px;

  z-index: 2;
  position: absolute;
  bottom: -70px;
  left: 0px;

  justify-content: center;
  right: 0;
  padding: 10px;
  background-color: greenyellow;
  margin: auto;
  width: 94%;
}

.conversation-compose div,
.conversation-compose input {
  background: #eee;
  height: 100%;
}
.conversation-compose .input-msg {
  border: 0;
  flex: 1 1 auto;
  font-size: 16px;
  margin: 0;
  outline: none;
  min-width: 50px;
  border-radius: 30px;
  padding-left: 10px;
}

.conversation-compose .send {
  background: transparent;
  border: 0;
  cursor: pointer;
  flex: 0 0 auto;
  margin-left: 8px;
  margin-right: 8px;
  padding: 0;
  position: relative;
  outline: none;
}

.conversation-compose .send .circle {
  background: #aaa;
  border-radius: 50%;
  color: #fff;
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.conversation-compose .send .circle i {
  font-size: 24px;
  margin-left: 5px;
}
.converse {
  overflow-y: scroll;
  height: 63vh;
  padding: 30px;
  margin: 5px auto;
  background: rgb(211, 176, 176);
}

.bubbleWrapper {
  padding: 10px 10px;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-self: flex-end;
  color: #fff;
}
.inlineContainer {
  display: flex;
}
.inlineContainer.own {
  /* flex-direction: row-reverse; */
}

.own {
  align-self: flex-end;
  min-width: 60px;
  max-width: 700px;
  padding: 14px 18px;
  margin: 6px 8px;
  background-color: #6c8ea4;
  border-radius: 16px 16px 16px 0;
  border: 1px solid #54788e;
}
.other {
  align-self: flex-start;
  min-width: 60px;
  max-width: 700px;
  padding: 14px 18px;
  margin: 6px 8px;
  background-color: #5b5377;
  border-radius: 16px 16px 0 16px;
  border: 1px solid #443f56;
}
span.own,
span.other {
  font-size: 14px;
  color: grey;
}
.user-status {
  display: grid;
  place-items: center;
  margin-top: -10px;
}
.user-status div {
  padding: 5px;
  background: #ddd;
  color: #000;
  width: 68px;
  cursor: pointer;
}
</style>