<template>
  <div class="">
    <div class="navigation">
      <router-link to="/calendar/add">
        <i class="material-icons">note_add</i>
      </router-link>
    </div>
    <br>
    <h5>2018.03.10 Saturday</h5>
    <ul class="list-group">
        <app-group-item v-for="item in userData.SpendMoney" :item="item" :key="item.time"></app-group-item>
    </ul>
  </div>
</template>

<script>
import ListGroupItem from "./calendar_list.vue"

export default {
  computed: {
    userData () {
      return this.$store.getters.getUserData
    }
  },
  components: {
    "app-group-item": ListGroupItem
  }
}
</script>

<style scoped lang="scss">
  .navigation {
    margin:50px auto 0 auto;
    max-width: 700px;
    text-align: right;
  }
</style>
