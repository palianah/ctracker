<template>
  <div id="fundsOverview">
    <br>
    <h1>Funds Page</h1>
    {{ userData.funds | currency }}
    <div class="form-group">
      <input type="text" name="funds"
             class="form-control"
             placeHolder="Funds in €"
             v-model="fund" />

      <button type="button" name="save"
              @click="storeFund"
              class="btn btn-primary"
      >Save</button>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      fund: ""
    }
  },
  computed: {
    userData() {
      return this.$store.getters.getUserData
    }
  },
  methods: {
    storeFund () {
      this.$store.dispatch('storeFund', this.fund)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
