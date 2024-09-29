<template>
  <div class="todo-list">
    <AddTodoField />
    <ToDoListControls />
    <TodoListItem v-for="todo in paginatedTodos" :key="todo.id" :todo="todo" />
    <ToDoListPagination />
    <ConfirmModal
      v-if="showConfirmModal"
      title="Удалить все задачи"
      message="Вы уверены, что хотите удалить все задачи? Это действие невозможно отменить."
      @confirm="handleDeleteAll"
      @close="showConfirmModal = false"
    />
  </div>
</template>

<script lang="ts" setup>
import { useTodoStore } from '@/stores/useTodoStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import AddTodoField from './AddTodoField.vue';
import ConfirmModal from './ConfirmModal.vue';
import ToDoListControls from './ToDoListControls.vue';
import TodoListItem from './ToDoListItem.vue';
import ToDoListPagination from './ToDoListPagination.vue';

const todoStore = useTodoStore();
const { paginatedTodos } = storeToRefs(todoStore);

const showConfirmModal = ref(false);

const handleDeleteAll = () => {
  todoStore.deleteAllTodos();
  showConfirmModal.value = false;
};
</script>

<style scoped lang="scss">
@import '@/assets/variables';

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
