<template>
  <input
    ref="inputRef"
    v-model="editingTitle"
    class="edit-todo__input"
    type="text"
    placeholder="Изменить название задачи"
    @keyup.enter="submitEdit"
  />
</template>

<script lang="ts" setup>
import { useTodoStore } from '@/stores/useTodoStore';
import { computed, onMounted, ref } from 'vue';

const todoStore = useTodoStore();

// Привязка к editingTodoTitle из хранилища
const editingTitle = computed({
  get: () => todoStore.editingTodoTitle,
  set: (value: string) => {
    todoStore.editingTodoTitle = value;
  },
});

const submitEdit = () => {
  todoStore.editTodo();
};

// Управление фокусом
const inputRef = ref<HTMLInputElement | null>(null);

onMounted(() => {
  inputRef.value?.focus();
});
</script>

<style scoped lang="scss">
@import '@/assets/variables';

.edit-todo__input {
  width: 100%;
  padding: 8px;
  margin: 0 auto;
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
