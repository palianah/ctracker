<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import Header from "./components/header/header.vue"
  import Footer from "./components/footer/footer.vue"

  export default {
    name: 'app',
    components: {
      "app-header": Header,
      "app-footer": Footer
    },
    created() {
      this.$store.dispatch("tryAutoLogin")
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    max-width: 1260px;
    margin: 0 auto;
    margin-bottom: 100px;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  i.material-icons {
    font-size: 32px;
  }

  a {
    color: #42b983;
  }
</style>
