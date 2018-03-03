<template lang="html">
  <div class="welcome">
    <h1>Welcome to this app!</h1>
    <p v-if="!auth">
      <router-link to="/signup">Sign Up</router-link>
    </p>
    <p v-if="!auth">
      <router-link to="/signin">Sign In</router-link>
    </p>
    <p v-if="auth">You are logged in!</p>
  </div>
</template>

<script>
export default {
  computed: {
    auth () {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>

<style lang="scss">
</style>
