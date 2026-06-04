<template>
    <Teleport to="body">
      <div v-if="modelValue" class="lightbox" @click.self="$emit('update:modelValue', null)">
        <button class="lightbox__close" @click="$emit('update:modelValue', null)">✕</button>
        <img :src="modelValue.src" :alt="modelValue.caption" class="lightbox__img" />
        <p v-if="modelValue.caption" class="lightbox__caption">{{ modelValue.caption }}</p>
      </div>
    </Teleport>
  </template>
  
  <script setup>
  defineProps({ modelValue: Object })
  defineEmits(['update:modelValue'])
  </script>
  
  <style scoped>
  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.88);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
  .lightbox__img {
    max-width: 90vw;
    max-height: 80vh;
    object-fit: contain;
    border-radius: 2px;
  }
  .lightbox__close {
    position: absolute;
    top: 20px;
    right: 24px;
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s;
  }
  .lightbox__close:hover { opacity: 1; }
  .lightbox__caption {
    margin-top: 16px;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.55);
  }
  </style>