import { Todo } from '@/interfaces/todo.interface';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([]);
  const editingTodoId = ref<number | null>(null); // Для управления модалкой
  const editingTodoTitle = ref(''); // Для хранения нового заголовка задачи

  // Состояние для пагинации
  const currentPage = ref(1);
  const itemsPerPage = ref(7);

  // Новая задача
  const newTodoTitle = ref('');

  const loadTodos = () => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      try {
        todos.value = JSON.parse(storedTodos);
      } catch (error) {
        console.error('Ошибка при парсинге задач из localStorage:', error);
        todos.value = [];
      }
    }
  };

  // Сохранение задач в localStorage при изменении
  watch(
    todos,
    (newTodos) => {
      localStorage.setItem('todos', JSON.stringify(newTodos));
    },
    { deep: true }
  );

  // Добавление новой задачи
  const addTodo = () => {
    const title = newTodoTitle.value.trim();
    if (title) {
      const newTodo: Todo = {
        id: Date.now(),
        title,
        completed: false,
      };
      todos.value.push(newTodo);
      newTodoTitle.value = ''; // Очистка поля после добавления
    }
  };

  // Удаление задачи
  const deleteTodo = (id: number) => {
    todos.value = todos.value.filter((todo) => todo.id !== id);
    // Обновление текущей страницы при удалении задачи
    if (paginatedTodos.value.length === 0 && currentPage.value > 1) {
      currentPage.value -= 1;
    }
  };

  // Удаление всех задач
  const deleteAllTodos = () => {
    todos.value = [];
    currentPage.value = 1; // Сброс на первую страницу
  };

  // Переключение статуса завершенности задачи
  const toggleComplete = (id: number) => {
    const todo = todos.value.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  };

  // Редактирование задачи
  const editTodo = () => {
    const todo = todos.value.find((t) => t.id === editingTodoId.value);
    if (todo) {
      const newTitle = editingTodoTitle.value.trim();
      if (newTitle) {
        todo.title = newTitle;
        closeEditModal();
      }
    }
  };

  // Методы для управления модальным окном редактирования
  const openEditModal = (id: number) => {
    const todo = todos.value.find((t) => t.id === id);
    if (todo) {
      editingTodoId.value = id;
      editingTodoTitle.value = todo.title; // Устанавливаем текущее название для редактирования
      disableScroll();
    }
  };

  const closeEditModal = () => {
    editingTodoId.value = null;
    editingTodoTitle.value = '';
    enableScroll();
  };

  // Функции для управления прокруткой
  const disableScroll = () => {
    document.body.classList.add('no-scroll');
  };

  const enableScroll = () => {
    document.body.classList.remove('no-scroll');
  };

  // Вычисляемые свойства для пагинации
  const totalPages = computed(() =>
    Math.ceil(todos.value.length / itemsPerPage.value)
  );

  const paginatedTodos = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return todos.value.slice(start, end);
  });

  // Методы для управления страницами
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value += 1;
    }
  };

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value -= 1;
    }
  };

  // Загрузка задач при инициализации
  loadTodos();

  return {
    todos,
    addTodo,
    deleteTodo,
    deleteAllTodos,
    toggleComplete,
    editTodo,
    editingTodoId,
    editingTodoTitle,
    openEditModal,
    closeEditModal,
    currentPage,
    itemsPerPage,
    totalPages,
    paginatedTodos,
    goToPage,
    nextPage,
    prevPage,
    newTodoTitle,
  };
});
