import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { Todo } from '../interfaces/todo.interface';

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([]);

  const loadTodos = () => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      todos.value = JSON.parse(storedTodos);
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

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
    };
    todos.value.push(newTodo);
  };

  const deleteTodo = (id: number) => {
    todos.value = todos.value.filter((todo) => todo.id !== id);
  };

  const toggleComplete = (id: number) => {
    const todo = todos.value.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  };

  const editTodo = (id: number, newTitle: string) => {
    const todo = todos.value.find((t) => t.id === id);
    if (todo) {
      todo.title = newTitle;
    }
  };

  loadTodos();

  return { todos, addTodo, deleteTodo, toggleComplete, editTodo };
});
