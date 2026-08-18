<template>
  <router-link :to="`/blog/${post.slug}`" class="post-card">
    <img :src="post.cover" :alt="post.title" />
    <h2>{{ post.title }}</h2>
    <time :datetime="post.date">{{ formatDate(post.date) }}</time>
  </router-link>
</template>

<style scoped>
.post-card {
  display: block;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.post-card img {
  width: 100%;
  border-radius: 4px;
  margin-bottom: 0.8rem;
}

.post-card h2 {
  font-family: var(--font-label, serif);
  font-size: 1.3rem;
  color: var(--color-blanco, #f5f2ee);
  margin-bottom: 0.3rem;
}

.post-card time {
  font-size: 0.8rem;
  color: var(--color-acento, #c9a84c);
  letter-spacing: 1px;
  text-transform: uppercase;
}
</style>

<script setup>
import { formatDate } from '../utils/formatDate.js'

defineProps({ post: Object })
</script>