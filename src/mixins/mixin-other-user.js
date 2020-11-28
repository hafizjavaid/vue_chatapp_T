export default {
  computed: {
    otherUser() {
      return this.$store.state.users[this.$route.params.id];
    },
  },
};
