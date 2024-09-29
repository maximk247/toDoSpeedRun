<template>
  <div>
    <button
      class="delete-all-button"
      :disabled="todoStore.todos.length === 0"
      @click="showConfirmModal = true"
    >
      Удалить все
    </button>
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
import { ref } from 'vue';
import ConfirmModal from './ConfirmModal.vue';

const todoStore = useTodoStore();

const showConfirmModal = ref(false);

const handleDeleteAll = () => {
  todoStore.deleteAllTodos();
  showConfirmModal.value = false;
};
</script>

<style scoped lang="scss">
@import '@/assets/variables';

.delete-all-button {
  padding: 8px 16px;
  font-size: 16px;
  background-color: $danger-color;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: $danger-color, 10%;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
}
</style>
