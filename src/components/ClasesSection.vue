<template>
  <section id="clases" class="clases">
    <div class="clases__inner section-inner">

      <div class="clases__header">
        <div>
          <p class="section-label">{{ t(data.label) }}</p>
          <h2 class="clases__title" v-html="formattedTitle"></h2>
        </div>
        <p class="clases__sub">{{ t(data.subtitulo) }}</p>
      </div>

      <div class="clases__grid">
        <article
          v-for="item in data.items"
          :key="item.titulo.es"
          :class="['clases__card', { 'clases__card--featured': item.featured }]"
        >
          <div class="clases__card-top">
            <span class="clases__card-icon" aria-hidden="true">{{ item.icon }}</span>
            <span class="clases__card-tag">{{ t(item.tag) }}</span>
            <span v-if="item.featured" class="clases__card-badge">
              {{ t(data.destacado_badge) }}
            </span>
          </div>

          <div class="clases__card-body">
            <h3 class="clases__card-title">{{ t(item.titulo) }}</h3>
            <p  class="clases__card-desc">{{ t(item.desc) }}</p>
            <ul class="clases__card-details">
              <li v-for="d in item.detalles" :key="d.es">
                <span aria-hidden="true">·</span> {{ t(d) }}
              </li>
            </ul>
          </div>

          <div class="clases__card-footer">
            <div class="clases__card-precio">
              <span class="clases__precio-num">{{ item.precio }}</span>
              <span class="clases__precio-per">{{ t(item.per) }}</span>
            </div>
            <a href="#contacto" class="clases__card-btn">{{ t(data.reservar) }}</a>
          </div>
        </article>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { content, t } = useLocale()
const data = content.clases

const formattedTitle = computed(() => {
  const parts = t(data.titulo).split('&')
  return parts.length === 2
    ? `${parts[0].trim()} &<br><em>${parts[1].trim()}</em>`
    : t(data.titulo)
})
</script>

<style scoped>
.clases {
  background: var(--color-negro);
  padding-block: var(--section-py);
}
.clases__inner { display: flex; flex-direction: column; gap: 56px; }

/* Header */
.clases__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 40px;
}
.clases__title {
  font-family: var(--font-display);
  font-size: clamp(34px, 4.5vw, 62px);
  color: var(--color-blanco);
  line-height: 1.06;
}
.clases__title :deep(em) { font-style: italic; color: var(--color-acento); }

.clases__sub {
  -webkit-text-stroke: 0.7px;
  font-size: 15px;
  line-height: 1.72;
  color: rgba(245,242,238,.45);
  text-align: right;
  max-width: 320px;
  font-weight: 300;
}

/* Grid */
.clases__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(252px, 1fr));
  gap: 2px;
}

/* Card */
.clases__card {
  -webkit-text-stroke: 0.7px;
  background: #161616;
  padding: 34px 26px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  border-bottom: 2px solid transparent;
  transition: background var(--transition), transform var(--transition), border-color var(--transition);
}
.clases__card:hover {
  background: #1d1d1d;
  border-bottom-color: var(--color-acento);
  transform: translateY(-4px);
}
.clases__card--featured {
  background: var(--color-azul-dark);
  border-bottom-color: var(--color-acento);
}
.clases__card--featured:hover { background: var(--color-azul); }

/* Card top */
.clases__card-top { display: flex; align-items: center; gap: 10px; }
.clases__card-icon { font-size: 26px; color: var(--color-acento); line-height: 1; }
.clases__card-tag {
  font-size: 9px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(245,242,238,.38);
  flex: 1;
}
.clases__card-badge {
  background: var(--color-acento);
  color: var(--color-negro);
  font-family: var(--font-label);
  font-size: 9px;
  letter-spacing: 2px;
  padding: 3px 9px;
}

/* Card body */
.clases__card-body { flex: 1; display: flex; flex-direction: column; gap: 10px; }
.clases__card-title {
  font-family: var(--font-display);
  font-size: 21px;
  color: var(--color-blanco);
  line-height: 1.2;
}
.clases__card-desc {
  font-size: 13.5px;
  line-height: 1.72;
  color: rgba(245,242,238,.52);
  font-weight: 300;
}
.clases__card-details {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 4px;
}
.clases__card-details li {
  font-size: 12.5px;
  color: rgba(245,242,238,.4);
  display: flex;
  gap: 8px;
}
.clases__card-details li span { color: var(--color-acento); }

/* Card footer */
.clases__card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 18px;
  border-top: 1px solid rgba(255,255,255,.07);
}
.clases__card-precio { display: flex; align-items: baseline; gap: 4px; }
.clases__precio-num {
  font-family: var(--font-label);
  font-size: 34px;
  color: var(--color-acento);
  line-height: 1;
}
.clases__precio-per { font-size: 12px; color: rgba(245,242,238,.35); }

.clases__card-btn {
  border: 1px solid var(--color-acento);
  color: var(--color-acento);
  padding: 7px 18px;
  font-family: var(--font-label);
  font-size: 12px;
  letter-spacing: 2px;
  transition: background var(--transition), color var(--transition);
}
.clases__card-btn:hover { background: var(--color-acento); color: var(--color-negro); }

/* Responsive */
@media (max-width: 900px) {
  .clases { padding-block: var(--section-py-md); }
  .clases__header { flex-direction: column; align-items: flex-start; }
  .clases__sub    { text-align: left; max-width: 100%; }
  .clases__grid   { grid-template-columns: 1fr; }
}
</style>
