<template>
  <footer class="footer">
    <nav v-if="auth" class="subnav">
      <ul>
        <router-link to="/" tag="li">
          <i class="material-icons">home</i>
        </router-link>
        <router-link to="/calendar" tag="li">
          <i class="material-icons">list</i>
        </router-link>
        <router-link to="/stats" tag="li">
          <i class="material-icons">graphic_eq</i>
        </router-link>
        <router-link to="/accounts" tag="li">
          <i class="material-icons">account_balance</i>
        </router-link>
        <router-link to="/settings" tag="li">
          <i class="material-icons">settings</i>
        </router-link>
      </ul>
    </nav>
  </footer>
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
    },
    methods: {
      onLogout() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style lang="scss">
  footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    padding: 0;
    margin: 0;
    max-width: 1260px;

    .subnav {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      background: #3b3d3d;

      li {
        padding: 10px 20px;
        margin: 0;
        cursor: pointer;

        &.router-link-exact-active {
          background: black;
        }
      }

      i {
        color: white;
        font-size: 38px;
      }
    }
  }
</style>
