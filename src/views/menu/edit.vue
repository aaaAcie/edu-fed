<template>
  <div class="menu-edit">
    <!-- 引入并通过 is-edit -->
    <CreateOrEdit :is-edit="true"></CreateOrEdit>
  </div>
</template>

<script>
import CreateOrEdit from './components/CreateOrEdit'
export default {
  name: 'MenuEdit',
  components: {
    CreateOrEdit
  }
}
</script>

<style lang="scss" scoped></style>
