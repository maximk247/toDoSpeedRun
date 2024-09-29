<template>
  <button class="add-todo__button" :disabled="isDisabled" @click="submitTodo">
    Добавить
  </button>
</template>

<script lang="ts" setup>
import { useTodoStore } from '@/stores/useTodoStore';
import { computed } from 'vue';

const todoStore = useTodoStore();

// Кнопка отключена, если поле ввода пустое или содержит только пробелы
const isDisabled = computed(() => !todoStore.newTodoTitle.trim());

const submitTodo = () => {
  todoStore.addTodo();
};
</script>

<style scoped lang="scss">
@import '@/assets/variables';

.add-todo__button {
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  background-color: $primary-color;
  color: #fff;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: $primary-color;
  }
}
</style>
