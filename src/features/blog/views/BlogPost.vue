<template>
  <article v-if="post" class="reader">
    <header class="reader__header">
      <h1 class="reader__title">{{ post.title }}</h1>
      <time class="reader__date" :datetime="post.date">{{ formatDate(post.date) }}</time>
    </header>

    <img v-if="post.cover" :src="post.cover" :alt="post.title" class="reader__cover" />

    <div class="reader__body" v-html="post.body"></div>
  </article>
  <p v-else>Post no encontrado.</p>
</template>

<style scoped>
.reader {
  max-width: 68ch;
  margin: 0 auto;
  padding: 3rem 1.5rem 5rem;
}

.reader__header {
  margin-bottom: 2rem;
}

.reader__title {
  font-family: var(--font-label, serif);
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  line-height: 1.25;
  color: var(--color-blanco, #f5f2ee);
  margin-bottom: 0.5rem;
}

.reader__date {
  font-size: 0.85rem;
  letter-spacing: 1px;
  color: var(--color-acento, #c9a84c);
  text-transform: uppercase;
}

.reader__cover {
  width: 100%;
  border-radius: 4px;
  margin: 2rem 0;
}

.reader__body {
  font-family: Georgia, 'Cormorant Garamond', serif;
  font-size: 1.15rem;
  line-height: 1.8;
  color: rgba(245, 242, 238, 0.9);
}

.reader__body :deep(p) {
  margin-bottom: 1.4em;
}

.reader__body :deep(h2) {
  font-family: var(--font-label, serif);
  font-size: 1.4rem;
  margin: 2rem 0 1rem;
  color: var(--color-blanco);
}

.reader__body :deep(img) {
  width: 100%;
  border-radius: 4px;
  margin: 1.5rem 0;
}

.reader__body :deep(a) {
  color: var(--color-acento, #c9a84c);
  text-decoration: underline;
}

@media (max-width: 640px) {
  .reader { padding: 2rem 1.2rem 3rem; }
}
</style>