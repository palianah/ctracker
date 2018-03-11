<template>
  <div class="header">
    <header id="header">
      <div class="logo">
        <router-link to="/">Money Tracker</router-link>
      </div>
      <nav class="topnav">
        <ul>
          <li v-if="!auth">
            <router-link to="/signup">Sign Up</router-link>
          </li>
          <li v-if="!auth">
            <router-link to="/signin">Sign In</router-link>
          </li>
          <li v-if="auth">
            <router-link to="/accounts" class="funds">
              Funds: {{ userData.funds | currency }}
            </router-link>
          </li>
          <li v-if="auth">
            <button @click="onLogout" class="logout">Logout</button>
          </li>
        </ul>
      </nav>
    </header>
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
    },
    methods: {
      onLogout() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style scoped lang="scss">
  header {
    height: 56px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    background-color: #4286f4;
    padding: 0 20px;

    .logo {
      font-weight: bold;
      color: white;
    }

    .logo a {
      text-decoration: none;
      color: white;
    }

    ul {
     list-style: none;
     margin: 0;
     padding: 0;
     height: 100%;
     display: flex;
     flex-flow: row;
     align-items: center;
   }

   li {
     margin: 0 16px;
   }

   .funds {
     color: white;
   }

   li a {
     text-decoration: none;
     color: white;
   }

   li a:hover,
   li a:active,
   li a.router-link-active {
     color: #fa923f;
   }

   .logout {
     background-color: transparent;
     border: none;
     font: inherit;
     color: white;
     cursor: pointer;
   }

  }

  nav {
    height: 100%;
  }
</style>
