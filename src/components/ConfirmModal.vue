<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h3 class="modal-content__title">{{ title }}</h3>
      <p class="modal-content__message">{{ message }}</p>
      <div class="modal-content__buttons">
        <button class="modal-content__button" @click="onConfirm">Да</button>
        <button class="modal-content__button" @click="close">Нет</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue';

defineProps<{
  title: string;
  message: string;
}>();

const emit = defineEmits(['confirm', 'close']);

const onConfirm = () => {
  emit('confirm');
};

const close = () => {
  emit('close');
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
  width: 90%;
  max-width: 400px;
  box-shadow: 0 2px 10px rgb(0 0 0 / 10%);
}

.modal-content__title {
  font-size: 20px;
  color: $primary-color;
}

.modal-content__message {
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;
}

.modal-content__buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.modal-content__button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 14px;
}

.modal-content__button:first-child {
  background-color: $danger-color;
  color: #fff;

  &:hover {
    background-color: $danger-color;
  }
}

/* stylelint-disable-next-line no-descending-specificity */
.modal-content__button:last-child {
  background-color: #ccc;
  color: #333;

  &:hover {
    background-color: #ccc;
  }
}
</style>
