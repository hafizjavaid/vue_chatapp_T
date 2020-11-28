import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";
// import { use } from "vue/types/umd";/
let messageRef;
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    nuser: null,
    users: {},
    messages: {},
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setnUser(state, payload) {
      state.nuser = payload;
    },
    addUser(state, payload) {
      Vue.set(state.users, payload.userId, payload.usersDetails);
    },
    updateUserStatus(state, payload) {
      Object.assign(state.users[payload.userId], payload.user);
    },
    setMessages(state, payload) {
      Vue.set(state.messages, payload.msgId, payload.msgDetails);
    },
    clearMsgs(state) {
      state.messages = {};
    },
  },

  actions: {
    signUp({ commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          console.log(response);
          let userId = firebase.auth().currentUser.uid;
          firebase
            .database()
            .ref("chatusers/" + userId)
            .set({
              email: payload.email,
              name: payload.name,
              status: true,
            });
          const newUser = {
            email: payload.email,
          };
          commit("setnUser", newUser);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    signIn({ commit }, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          console.log(response);
          let userId = firebase.auth().currentUser.uid;

          const newUser = {
            email: payload.email,
            userId,
          };
          commit("setnUser", newUser);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    autoSignin({ commit }, payload) {
      commit("setUser", payload);
    },
    autoLogout({ commit, dispatch }, payload) {
      firebase.auth().signOut();
      dispatch("updateUser", {
        userId: payload.userId,
        updates: {
          status: false,
        },
      });
      // console.log("Updating logout");
      commit("setUser", null);
    },
    authChanged({ commit, dispatch }) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          //  User is Logged In
          let userId = firebase.auth().currentUser.uid;

          firebase
            .database()
            .ref("chatusers/" + userId)
            .once("value")
            .then((snapShot) => {
              // console.log(snapShot);
              let user = snapShot.val();

              commit("setUser", {
                name: user.name,
                email: user.email,
                userId,
              });
            });

          dispatch("updateUser", {
            userId,
            updates: {
              status: true,
            },
          });
          dispatch("fetchUsers");
        }
      });
      // this.$router.push("/");
    },
    updateUser({ commit }, payload) {
      commit("setnUser", null);
      // console.log(payload.userId);
      if (payload.userId) {
        firebase
          .database()
          .ref("chatusers/" + payload.userId)
          .update(payload.updates);
      }
    },
    fetchUsers({ commit }) {
      firebase
        .database()
        .ref("chatusers/")
        .on("child_added", (snapShot) => {
          let usersDetails = snapShot.val();
          let userId = snapShot.key;

          commit("addUser", {
            userId,
            usersDetails,
          });
        });
      firebase
        .database()
        .ref("chatusers/")
        .on("child_changed", (snapShot) => {
          let usersDetails = snapShot.val();
          let userId = snapShot.key;

          commit("updateUserStatus", {
            userId,
            usersDetails,
          });
        });
    },
    getFireMessages({ commit, state }, payload) {
      console.log("ID :" + payload);
      let userId = state.user.userId;
      messageRef = firebase.database().ref("chats/" + userId + "/" + payload);

      messageRef.on("child_added", (snapShot) => {
        let msgDetails = snapShot.val();
        console.log("msg Details :" + msgDetails);
        let msgId = snapShot.key;
        console.log("msg ID :" + msgId);
        commit("setMessages", {
          msgId,
          msgDetails,
        });
      });
    },
    stopFireMessages({ commit }) {
      if (messageRef) {
        messageRef.off("child_added");
      }
      commit("clearMsgs");
    },
    sendMessage({ commit, state }, payload) {
      commit("setnUser", null);
      firebase
        .database()
        .ref("chats/" + state.user.userId + "/" + payload.otherUserId)
        .push(payload.message);
      payload.message.from = "them";
      firebase
        .database()
        .ref("chats/" + payload.otherUserId + "/" + state.user.userId)
        .push(payload.message);
    },
  },
  modules: {},
  getters: {
    user(state) {
      return state.user;
    },
    users(state) {
      let filteredusers = {};
      if (state.user) {
        Object.keys(state.users).forEach((userKey) => {
          if (userKey !== state.user.userId) {
            filteredusers[userKey] = state.users[userKey];
          }
        });
      }

      return filteredusers;
    },
    // otherUser(state) {
    //   return state.users[]
    // },
  },
});
