<template>
  <div
    class="modal-overlay"
    role="dialog"
    aria-modal="true"
    @click.self="close"
  >
    <div class="modal-content">
      <h3 class="modal-content__title">Редактировать задачу</h3>
      <EditTodoField />
      <div class="modal-content__buttons">
        <button class="modal-content__button confirm" @click="submitEdit">
          Сохранить
        </button>
        <button class="modal-content__button cancel" @click="close">
          Отмена
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTodoStore } from '@/stores/useTodoStore';
import EditTodoField from './EditToDoField.vue';

const todoStore = useTodoStore();

const submitEdit = () => {
  todoStore.editTodo();
};

const close = () => {
  todoStore.closeEditModal();
};
</script>

<style scoped lang="scss">
@import '@/assets/variables';

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 2px 10px rgb(0 0 0 / 10%);
}

.modal-content__title {
  font-size: 20px;
  color: $primary-color;
}

.modal-content__buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.modal-content__button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 14px;

  &.confirm {
    background-color: $primary-color;
    color: #fff;

    &:hover {
      background-color: $primary-color;
    }
  }

  &.cancel {
    background-color: #ccc;
    color: #333;

    &:hover {
      background-color: #ccc;
    }
  }
}
</style>
