<template>
  <router-link :to="`/blog/${post.slug}`" class="post-card">
    <img :src="post.cover" :alt="post.title" />
    <h2>{{ post.title }}</h2>
    <time :datetime="post.date">{{ formatDate(post.date) }}</time>
  </router-link>
</template>

<script setup>
import { formatDate } from '../utils/formatDate.js'

defineProps({ post: Object })
</script>