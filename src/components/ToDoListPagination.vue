<template>
  <div class="pagination">
    <button
      v-show="totalPages > 1"
      :disabled="currentPage === 1"
      class="pagination__button"
      aria-label="Предыдущая страница"
      @click="prevPage"
    >
      <i class="fas fa-chevron-left"></i>
    </button>

    <!-- Кнопка первой страницы всегда отображается, если есть более одной страницы -->
    <button
      v-if="totalPages > 1"
      :class="[
        'pagination__page',
        { 'pagination__page--active': 1 === currentPage },
      ]"
      aria-label="Страница 1"
      @click="goToPage(1)"
    >
      1
    </button>

    <!-- Эллипсис перед видимыми страницами, если нужно -->
    <span v-if="shouldShowLeftEllipsis" class="pagination__ellipsis">...</span>

    <!-- Видимые страницы вокруг текущей страницы -->
    <button
      v-for="page in visiblePages"
      :key="page"
      :class="[
        'pagination__page',
        { 'pagination__page--active': page === currentPage },
      ]"
      :aria-label="`Страница ${page}`"
      @click="goToPage(page)"
    >
      {{ page }}
    </button>

    <!-- Эллипсис после видимых страниц, если нужно -->
    <span v-if="shouldShowRightEllipsis" class="pagination__ellipsis">...</span>

    <!-- Кнопка последней страницы всегда отображается, если больше одной страницы -->
    <button
      v-if="totalPages > 1 && totalPages !== 1"
      :class="[
        'pagination__page',
        { 'pagination__page--active': totalPages === currentPage },
      ]"
      :aria-label="`Страница ${totalPages}`"
      @click="goToPage(totalPages)"
    >
      {{ totalPages }}
    </button>

    <button
      v-show="totalPages > 1"
      :disabled="currentPage === totalPages"
      class="pagination__button"
      aria-label="Следующая страница"
      @click="nextPage"
    >
      <i class="fas fa-chevron-right"></i>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useTodoStore } from '@/stores/useTodoStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const todoStore = useTodoStore();
const { currentPage, totalPages } = storeToRefs(todoStore);

// Логика для отображения эллипсиса слева
const shouldShowLeftEllipsis = computed(() => {
  return currentPage.value > 3;
});

// Логика для отображения эллипсиса справа
const shouldShowRightEllipsis = computed(() => {
  return currentPage.value < totalPages.value - 3;
});

// Генерация видимых страниц вокруг текущей страницы
const visiblePages = computed(() => {
  const pages = [];
  let start = Math.max(currentPage.value - 1, 2);
  let end = Math.min(currentPage.value + 1, totalPages.value - 1);

  // Корректируем диапазон, если текущая страница близка к началу
  if (currentPage.value <= 4) {
    start = 2;
    end = Math.min(5, totalPages.value - 1);
  }

  // Корректируем диапазон, если текущая страница близка к концу
  if (currentPage.value >= totalPages.value - 3) {
    start = Math.max(totalPages.value - 4, 2);
    end = totalPages.value - 1;
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

// Методы для управления страницами
const goToPage = (page: number) => {
  todoStore.goToPage(page);
};

const nextPage = () => {
  todoStore.nextPage();
};

const prevPage = () => {
  todoStore.prevPage();
};
</script>

<style scoped lang="scss">
@import '@/assets/variables';

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.pagination__button {
  padding: 6px 12px;
  border: none;
  background-color: $primary-color;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  min-width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: $primary-color;
  }

  i {
    font-size: 14px;
  }
}

.pagination__page {
  padding: 6px 12px;
  border: none;
  background-color: #f0f0f0;
  color: #333;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &--active {
    background-color: $primary-color;
    color: #fff;
    cursor: default;
  }

  &:hover:not(.pagination__page--active) {
    background-color: #f0f0f0;
  }
}

.pagination__ellipsis {
  padding: 6px 12px;
  color: #666;
  font-size: 16px;
}
</style>
