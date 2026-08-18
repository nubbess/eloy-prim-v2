<template>
  <article v-if="post" class="blog-post">
    <h1>{{ post.title }}</h1>
    <time :datetime="post.date">{{ formatDate(post.date) }}</time>
    <img :src="post.cover" :alt="post.title" />
    <div class="post-body" v-html="post.body"></div>
  </article>
  <p v-else>Post no encontrado.</p>
</template>

<script setup>
import { computed } from 'vue'
import { getPostBySlug } from '../composables/usePosts.js'
import { formatDate } from '../utils/formatDate.js'

const props = defineProps({ slug: String })
const post = computed(() => getPostBySlug(props.slug))
</script>