<template>
  <section id="biografia" class="bio">
    <div class="bio__inner section-inner">

      <div class="bio__header">
        <p class="section-label">{{ t(data.label) }}</p>
        <h2 class="bio__title" v-html="formattedTitle"></h2>
      </div>

      <div class="bio__body">
        <!-- Text column -->
        <div class="bio__text">
          <p class="bio__lead">{{ t(data.lead) }}</p>
          <p class="bio__p">{{ t(data.parrafo1) }}</p>
          <p class="bio__p">{{ t(data.parrafo2) }}</p>
          <div class="bio__firma">
            <div class="bio__firma-line"></div>
            <div>
              <strong class="bio__firma-name">Eloy Prim</strong>
              <span  class="bio__firma-role">{{ t(data.firma) }}</span>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <aside class="bio__sidebar">

          <!-- Formación -->
          <div class="bio__card">
            <h3 class="bio__card-title">{{ t(data.sidebar_formacion_label) }}</h3>
            <div v-for="f in data.formacion" :key="f.año" class="bio__card-row">
              <span class="bio__card-year">{{ f.año }}</span>
              <span class="bio__card-desc">{{ t(f.desc) }}</span>
            </div>
          </div>

          <!-- Estilos -->
          <div class="bio__card bio__card--accent">
            <h3 class="bio__card-title">{{ t(data.sidebar_estilos_label) }}</h3>
            <div class="bio__tags">
              <span v-for="e in data.estilos" :key="e" class="bio__tag">{{ e }}</span>
            </div>
          </div>

          <!-- Idiomas
          <div class="bio__card">
            <h3 class="bio__card-title">{{ t(data.sidebar_idiomas_label) }}</h3>
            <div v-for="l in data.idiomas" :key="l.lang" class="bio__lang">
              <span class="bio__lang-name">{{ l.lang }}</span>
              <div class="bio__lang-bar">
                <div class="bio__lang-fill" :style="{ width: l.pct + '%' }"></div>
              </div>
            </div>
          </div> -->

        </aside>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { content, t } = useLocale()
const data = content.biografia

const formattedTitle = computed(() => {
  const full = t(data.titulo)
  const words = full.split(' ')
  const half  = Math.ceil(words.length / 2)
  const line1 = words.slice(0, half).join(' ')
  const line2 = words.slice(half).join(' ')
  return `${line1}<br><em>${line2}</em>`
})
</script>

<style scoped>
.bio {
  background: var(--color-blanco);
  color: var(--color-negro);
  padding-block: var(--section-py);
}
.bio__inner { display: flex; flex-direction: column; gap: 56px; }

/* Header */
.bio__header .section-label::before { background: var(--color-acento); }
.bio__title {
  font-family: var(--font-display);
  font-size: clamp(34px, 4.5vw, 62px);
  line-height: 1.06;
  font-weight: 700;
  color: var(--color-negro);
}
.bio__title :deep(em) { font-style: italic; color: var(--color-azul-dark); }

/* Body grid */
.bio__body {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 72px;
  align-items: start;
}

/* Text */
.bio__lead {
  font-family: var(--font-display);
  font-size: 21px;
  line-height: 1.62;
  color: var(--color-negro);
  margin-bottom: 22px;
}
.bio__p {
  -webkit-text-stroke: 0.5px;
  font-size: 16.5px;
  line-height: 1.88;
  color: #555;
  font-weight: 300;
  margin-bottom: 18px;
}

.bio__firma {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 36px;
}
.bio__firma-line {
  width: 52px; height: 2px;
  background: var(--color-acento);
  flex-shrink: 0;
}
.bio__firma-name {
  display: block;
  font-family: var(--font-display);
  font-size: 18px;
  color: var(--color-negro);
}
.bio__firma-role {
  -webkit-text-stroke: 0.7px;
  display: block;
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #999;
  margin-top: 3px;
}

/* Cards */
.bio__card {
  background: #fff;
  border: 1px solid #e2dbd0;
  padding: 26px 24px;
  margin-bottom: 14px;
}
.bio__card--accent {
  background: var(--color-azul);
  border-color: var(--color-azul);
}
.bio__card-title {
  font-family: var(--font-label);
  font-size: 11px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--color-acento);
  margin-bottom: 18px;
}

.bio__card-row {
  display: flex;
  gap: 14px;
  padding: 9px 0;
  border-bottom: 1px solid rgba(0,0,0,.06);
  align-items: flex-start;
}
.bio__card-row:last-child { border: none; }
.bio__card-year {
  font-family: var(--font-label);
  font-size: 18px;
  color: var(--color-acento);
  line-height: 1;
  flex-shrink: 0;
  padding-top: 1px;
}
.bio__card-desc { font-size: 13px; line-height: 1.5; color: #555; }

.bio__tags { display: flex; flex-wrap: wrap; gap: 8px; }
.bio__tag {
  -webkit-text-stroke: 0.7px;
  border: 1px solid rgba(255,255,255,.25);
  color: var(--color-blanco);
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 5px 12px;
}

.bio__lang { display: flex; align-items: center; gap: 14px; padding: 7px 0; }
.bio__lang-name { font-size: 13px; color: #444; width: 68px; flex-shrink: 0; }
.bio__lang-bar  { flex: 1; height: 3px; background: #e8e0d4; }
.bio__lang-fill { height: 100%; background: var(--color-azul); transition: width 1.2s ease; }

/* Responsive */
@media (max-width: 900px) {
  .bio { padding-block: var(--section-py-md); }
  .bio__body { grid-template-columns: 1fr; gap: 40px; }
}
</style>
