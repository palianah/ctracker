<template lang="html">
  <div class="welcome">
    <br>
    <h1>Money Tracker</h1>
    <p>
      You may Track your Money for your self, or the Money of a Group
      like friends, family or Couples in a single Account.
    </p>
    <p>
      All Participicants can have a overview of the Total Money and
      how the money was spend.
    </p>
    <p v-if="!auth">
      <router-link to="/signup">Sign Up</router-link>
    </p>
    <p v-if="!auth">
      <router-link to="/signin">Sign In</router-link>
    </p>
    <p v-if="auth">Total Funds: {{userData.funds | currency }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    auth () {
      return this.$store.getters.isAuthenticated
    },
    userData () {
      return this.$store.getters.getUserData
    }
  }
}
</script>

<style lang="scss">
</style>
