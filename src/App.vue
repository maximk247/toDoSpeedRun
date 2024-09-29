<template>
  <div class="app">
    <h1>To-Do Список</h1>
    <TodoList />
  </div>
</template>

<script lang="ts" setup>
import TodoList from '@/components/ToDoList.vue';
</script>

<style scoped>
.app {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
