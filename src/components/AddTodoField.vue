<template>
  <input
    v-model="newTodo"
    class="add-todo__input"
    type="text"
    placeholder="Добавить новую задачу"
    @keyup.enter="submitTodo"
  />
</template>

<script lang="ts" setup>
import { useTodoStore } from '@/stores/useTodoStore';
import { computed } from 'vue';

const todoStore = useTodoStore();

// Привязка к newTodoTitle из хранилища
const newTodo = computed({
  get: () => todoStore.newTodoTitle,
  set: (value: string) => {
    todoStore.newTodoTitle = value;
  },
});

const submitTodo = () => {
  todoStore.addTodo();
};
</script>

<style scoped lang="scss">
@import '@/assets/variables';

.add-todo__input {
  flex: 1;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: $primary-color;
  }
}
</style>
