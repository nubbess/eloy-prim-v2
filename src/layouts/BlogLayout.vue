    <template>
        <div class="blog-layout">
            <router-link to="/" class="back-button">← Volver</router-link>
            <router-view />
        </div>
    </template>

<style scoped>
.back-button {
    display: inline-block;
    margin: 1.5rem;
    color: var(--color-acento, #c9a84c);
    text-decoration: none;
    font-size: 0.95rem;
}

.blog-layout {
  min-height: 100vh;
  background: var(--color-negro, #0e0e0e);
}
</style>