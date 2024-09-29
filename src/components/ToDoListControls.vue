<template>
  <div class="todo-list__controls">
    <AddToDo />
    <DeleteAllToDo />
  </div>
</template>

<script lang="ts" setup>
import AddToDo from './AddToDo.vue';
import DeleteAllToDo from './DeleteAllToDo.vue';
</script>

<style scoped lang="scss">
.todo-list__controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
