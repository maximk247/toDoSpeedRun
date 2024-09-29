<template>
  <button class="todo-item__delete-button" @click="deleteTask">
    <i class="fas fa-trash"></i>
  </button>
</template>
<script lang="ts" setup>
import { Todo } from '@/interfaces/todo.interface';
import { useTodoStore } from '@/stores/useTodoStore';

const props = defineProps<{
  todo: Todo;
}>();

const todoStore = useTodoStore();

// Метод для удаления задачи
const deleteTask = () => {
  todoStore.deleteTodo(props.todo.id);
};
</script>

<style lang="scss" scoped>
@import '@/assets/variables';

.todo-item {
  &__delete-button {
    padding: 4px 8px;
    cursor: pointer;
    background-color: $danger-color;
    color: #fff;
    border: none;
    border-radius: 4px;
    transition: background-color 0.3s;
    min-width: 40px;

    &:hover {
      background-color: $danger-color;
    }
  }
}
</style>
