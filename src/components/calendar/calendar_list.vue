<template>
  <div class="">
    <li class="list-group-item list-group-item-action flex-column align-items-start" v-on:click="editItem">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{ item.costs | currency }}</h5>
        <small>{{ item.date }} {{ item.time }}</small>
      </div>
      <p class="mb-1">{{ item.description }}</p>
    </li>
  </div>
</template>
<script>
export default {
  props: ["item"],
  methods: {
    editItem() {

    }
  }
}
</script>
<style lang="scss" scoped>
  .list-group-item {
    cursor: pointer;
    margin: 0 auto;
    max-width: 700px;
  }
</style>
