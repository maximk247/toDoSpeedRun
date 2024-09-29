<template>
  <div class="todo-item">
    <input
      :checked="todo.completed"
      class="todo-item__checkbox"
      type="checkbox"
      @change="toggleComplete"
    />
    <span
      class="todo-item__title"
      :class="{ 'todo-item__title--completed': todo.completed }"
      @dblclick="openEditModal"
    >
      {{ todo.title }}
    </span>

    <!-- Кнопка для редактирования задачи -->
    <EditToDoButton :todo-id="todo.id" />
    <!-- Кнопка для удаления задачи -->
    <DeleteToDo :todo="todo" />

    <!-- Модальное окно для редактирования -->
    <EditTodoModal
      v-if="isBeingEdited"
      :id="todo.id"
      :current-title="todo.title"
    />
  </div>
</template>

<script lang="ts" setup>
import { Todo } from '@/interfaces/todo.interface';
import { useTodoStore } from '@/stores/useTodoStore';
import { computed } from 'vue';
import DeleteToDo from './DeleteToDo.vue';
import EditToDoButton from './EditToDoButton.vue';
import EditTodoModal from './EditToDoModal.vue';

const props = defineProps<{
  todo: Todo;
}>();

const todoStore = useTodoStore();

const isBeingEdited = computed(() => todoStore.editingTodoId === props.todo.id);

// Метод для переключения статуса завершенности задачи
const toggleComplete = () => {
  todoStore.toggleComplete(props.todo.id);
};

// Метод для открытия модального окна редактирования
const openEditModal = () => {
  todoStore.openEditModal(props.todo.id);
};
</script>

<style lang="scss" scoped>
@import '@/assets/variables';

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;

  &__checkbox {
    width: 20px;
    height: 20px;
    cursor: pointer;
    transition: transform 0.3s;

    &:checked {
      transform: scale(1.2);
    }
  }

  &__title {
    flex: 1;
    font-size: 16px;
    cursor: pointer;
    transition: color 0.3s;

    &--completed {
      text-decoration: line-through;
      color: gray;
    }

    &:hover {
      color: $primary-color;
    }
  }

  &__edit-input {
    flex: 1;
    padding: 4px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.3s;

    &:focus {
      outline: none;
      border-color: $primary-color;
    }
  }
}
</style>
