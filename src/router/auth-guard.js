import store from "../store";
export default (to, from, next) => {
  // It means if user is present then go to
  // page we click otherwise redirect to
  // signin page
  if (store.getters.user) {
    next();
  } else {
    next("/auth");
  }
};
