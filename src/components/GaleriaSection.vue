<template>
  <section id="galeria" class="galeria">
    <div class="galeria__inner section-inner">
      <p class="section-label">{{ t(data.galeria_label) }}</p>
      <h2 class="galeria__title" v-html="formattedTitle"></h2>

      <div class="galeria__grid">
  <div
    v-for="(item, i) in data.galeria_items"
    :key="i"
    :class="['galeria__item', `galeria__item--${item.size}`]"
  >
    <img :src="item.src" :alt="t(item.caption)" class="galeria__img" />
    <div class="galeria__overlay">
      <span class="galeria__caption">{{ t(item.caption) }}</span>
    </div>
  </div>
</div>

      <!-- <p class="galeria__note">
        <span aria-hidden="true">◈</span>
        {{ placeholderNote }}
      </p> -->
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { content, locale, t } = useLocale()
const data = content.milonga

const formattedTitle = computed(() => {
  const full  = t(data.galeria_titulo)
  const parts = full.split(' ')
  const half  = Math.ceil(parts.length / 2)
  return `${parts.slice(0, half).join(' ')}<br><em>${parts.slice(half).join(' ')}</em>`
})

// const placeholderNote = computed(() => {
//   const map = {
//     es: 'Reemplazar con fotos reales del cliente',
//     fr: 'Remplacer par de vraies photos du client',
//     en: 'Replace with actual client photos',
//     de: 'Durch echte Fotos des Kunden ersetzen',
//   }
//   return map[locale.value] ?? map.es
// })
</script>

<style scoped>
.galeria {
  background: var(--color-blanco);
  color: var(--color-negro);
  padding-block: var(--section-py);
}
.galeria__inner { display: flex; flex-direction: column; gap: 48px; }
.galeria__inner .section-label::before { background: var(--color-acento); }

.galeria__title {
  font-family: var(--font-display);
  font-size: clamp(34px, 4.5vw, 58px);
  color: var(--color-negro);
  line-height: 1.06;
}
.galeria__title :deep(em) { font-style: italic; color: var(--color-azul-dark); }

/* Grid */
.galeria__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 210px 210px;
  gap: 3px;
}
.galeria__item {
  background: var(--color-azul);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.galeria__img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}
.galeria__item--large  {
  grid-column: span 2;
  grid-row: span 2;
  background: var(--color-azul-dark);
}
.galeria__item--medium { grid-column: span 2; background: var(--color-azul); }
.galeria__item--small  { background: black; }

.galeria__overlay {
  position: absolute;
  inset: 0;
  background: transparent;
  display: flex;
  align-items: flex-end;
  padding: 18px;
  transition: background var(--transition-slow);
}
.galeria__item:hover .galeria__overlay { background: rgba(0,0,0,.52); }

.galeria__caption {
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--color-blanco);
  opacity: 0;
  transition: opacity var(--transition);
}
.galeria__item:hover .galeria__caption { opacity: 1; }

/* Note */
.galeria__note {
  font-size: 12px;
  letter-spacing: 1px;
  color: rgba(0,0,0,.28);
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
}

/* Responsive */
@media (max-width: 900px) {
  .galeria { padding-block: var(--section-py-md); }
  .galeria__grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
  }
  .galeria__item--large  { grid-column: span 2; height: 220px; }
  .galeria__item--medium { grid-column: span 2; height: 180px; }
  .galeria__item--small  { height: 155px; }
}
@media (max-width: 480px) {
  .galeria__grid { grid-template-columns: 1fr; }
  .galeria__item--large,
  .galeria__item--medium { grid-column: span 1; height: 200px; }
}
</style>
