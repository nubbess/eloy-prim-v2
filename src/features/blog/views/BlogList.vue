<template>
  <div class="blog-list">
    <PostCard
      v-for="post in posts"
      :key="post.slug"
      :post="post"
    />
  </div>
</template>

<style scoped>
.blog-list {
  max-width: 68ch;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>

<script setup>
import { posts } from '../composables/usePosts.js'
import PostCard from '../components/PostCard.vue'
</script>