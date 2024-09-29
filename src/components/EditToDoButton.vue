<template>
  <button class="edit-todo-button" @click="startEditing">
    <i class="fas fa-edit"></i>
  </button>
</template>

<script lang="ts" setup>
import { useTodoStore } from '@/stores/useTodoStore';
import { defineProps } from 'vue';

const props = defineProps<{
  todoId: number;
}>();

const todoStore = useTodoStore();

const startEditing = () => {
  todoStore.openEditModal(props.todoId);
};
</script>

<style scoped lang="scss">
@import '@/assets/variables';

.edit-todo-button {
  padding: 6px 12px;
  background-color: $primary-color;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;

  &:hover {
    background-color: $primary-color, 10%;
  }

  i {
    margin-right: 5px;
  }
}
</style>
