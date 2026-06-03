<template>
  <section id="inicio" class="hero">
    <div class="hero__bg-word" aria-hidden="true">TANGO</div>

    <div class="hero__inner section-inner">
      <!-- Text -->
      <div class="hero__text">
        <span class="hero__tag">{{ t(data.tag) }}</span>

        <h1 class="hero__title">
          {{ t(data.titulo) }}
        </h1>

        <p class="hero__sub">{{ t(data.subtitulo) }}</p>
        <p class="hero__desc">{{ t(data.descripcion) }}</p>

        <div class="hero__cta">
          <a href="#contacto" class="btn-primary">{{ t(data.cta_primary) }}</a>
          <a href="#clases"   class="btn-ghost">{{ t(data.cta_secondary) }}</a>
        </div>

        <div class="hero__stats">
          <div v-for="s in data.stats" :key="s.num" class="hero__stat">
            <span class="hero__stat-num">{{ s.num }}</span>
            <span class="hero__stat-label">{{ t(s.label) }}</span>
          </div>
        </div>
      </div>

      <!-- Photo -->
      <div class="hero__photo-wrap">
        <div class="hero__photo-frame">
          <img src="/eloy.png" alt="Eloy Prim" class="hero__photo" />
        </div>
        <div class="hero__badge">
          <span class="hero__badge-num">+30</span>
          <span class="hero__badge-text">{{ badgeText }}</span>
        </div>
      </div>
    </div>

    <div class="hero__scroll" aria-hidden="true">
      <span>Scroll</span>
      <div class="hero__scroll-line"></div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { content, t } = useLocale()
const data = content.hero

// Split title into 3 lines removing the "em" word
const titleParts = computed(() => {
  // const full = t(data.titulo)
  // // "El arte del Tango Argentino" → ["El arte", "del", "Argentino"]
  // const em = t(data.titulo_em)
  // const withoutEm = full.replace(em, '').trim()
  // console.log(withoutEm)
  // const words = withoutEm.split(' ')
  // const mid = Math.floor(words.length / 2)
  // return [
  //   words.slice(0, mid).join(' '),
  //   words[mid] ?? '',
  //   words.slice(mid + 1).join(' '),
  // ]
  return t(data.titulo).split('{em}')
})

const badgeText = computed(() => {
  const map = { es: 'años de\ntrayectoria', fr: 'ans de\nparcours', en: 'years of\nexperience', de: 'Jahre\nErfahrung' }
  return map[useLocale().locale.value] ?? map.es
})
</script>

<style scoped>
.hero {
  min-height: 100vh;
  background: linear-gradient(135deg,
    var(--color-azul)      0%,
    var(--color-azul-dark) 55%,
    var(--color-azul-deep) 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Background word */
.hero__bg-word {
  position: absolute;
  bottom: -60px; left: -20px;
  font-family: var(--font-label);
  font-size: clamp(140px, 26vw, 380px);
  color: rgba(255,255,255,.04);
  line-height: 1;
  pointer-events: none;
  white-space: nowrap;
  letter-spacing: -8px;
}

/* Inner layout */
.hero__inner {
  display: flex;
  align-items: center;
  gap: 80px;
  padding-block: 140px 80px;
  position: relative;
  z-index: 2;
}

/* Text column */
.hero__text { flex: 1; }

.hero__tag {
  -webkit-text-stroke: 0.5px var(--color-acento);

  display: inline-block;
  border: 1px solid var(--color-acento);
  color: var(--color-acento);
  font-size: 11px;
  letter-spacing: 4px;
  text-transform: uppercase;
  padding: 6px 16px;
  margin-bottom: 28px;
  animation: fadeUp .6s ease .1s both;
}

.hero__title {
  font-family: var(--font-display);
  font-size: clamp(46px, 6.5vw, 92px);
  line-height: .94;
  font-weight: 700;
  animation: fadeUp .7s ease .2s both;
}
.hero__title em { font-style: italic; color: var(--color-acento); }

.hero__sub {
  -webkit-text-stroke: 0.5px ;
  margin-top: 20px;
  font-size: 14px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(245,242,238,.55);
  animation: fadeUp .7s ease .28s both;
}

.hero__desc {
  -webkit-text-stroke: 0.5px;
  margin-top: 18px;
  font-size: 17px;
  line-height: 1.82;
  color: rgba(245,242,238,.68);
  max-width: 440px;
  font-weight: 300;
  animation: fadeUp .7s ease .34s both;
}

/* CTA */
.hero__cta {
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 36px;
  animation: fadeUp .7s ease .4s both;
}

.btn-primary {
  background: var(--color-acento);
  color: var(--color-negro);
  padding: 15px 38px;
  font-family: var(--font-label);
  font-size: 15px;
  letter-spacing: 3px;
  transition: background var(--transition), transform var(--transition);
}
.btn-primary:hover { background: var(--color-acento-lt); transform: translateY(-2px); }

.btn-ghost {
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(201,168,76,.5);
  padding-bottom: 3px;
  transition: color var(--transition), border-color var(--transition);
}
.btn-ghost:hover { color: var(--color-acento); border-color: var(--color-acento); }

/* Stats */
.hero__stats {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  margin-top: 48px;
  padding-top: 36px;
  border-top: 1px solid rgba(255,255,255,.1);
  animation: fadeUp .7s ease .48s both;
}
.hero__stat { display: flex; flex-direction: column; gap: 4px; }
.hero__stat-num {
  font-family: var(--font-label);
  font-size: 38px;
  color: var(--color-acento);
  line-height: 1;
}
.hero__stat-label {
  -webkit-text-stroke: 0.5px;
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(245,242,238,.4);
}

/* Photo */
.hero__photo-wrap {
  position: relative;
  flex-shrink: 0;
  animation: fadeIn 1s ease .4s both;
}
.hero__photo-frame {
  position: relative;
  width: clamp(260px, 28vw, 400px);
}
.hero__photo {
  width: 100%;
  position: relative;
  z-index: 2;
  animation: float 6s ease-in-out infinite;
  filter: drop-shadow(0 30px 60px rgba(0,0,0,.45));
}
.hero__deco-corner {
  position: absolute;
  bottom: -20px; right: -20px;
  width: 120px; height: 120px;
  border: 1px solid var(--color-acento);
  z-index: 1;
}
.hero__deco-dot {
  position: absolute;
  top: 36px; left: -14px;
  width: 52px; height: 52px;
  background: var(--color-acento);
  opacity: .14;
}

.hero__badge {
  position: absolute;
  bottom: 1; left: -52px;
  background: var(--color-negro);
  border: 1px solid rgba(201,168,76,.28);
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 5;
}
.hero__badge-num {
  font-family: var(--font-label);
  font-size: 40px;
  color: var(--color-acento);
  line-height: 1;
}
.hero__badge-text {
  -webkit-text-stroke: 0.7px;
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(245,242,238,.55);
  white-space: pre-line;
  line-height: 1.5;
}

/* Scroll hint */
.hero__scroll {
  -webkit-text-stroke: 0.7px;
  position: absolute;
  bottom: 32px; left: var(--pad-x);
  display: flex;
  align-items: center;
  gap: 12px;
  opacity: .35;
}
.hero__scroll span {
  font-size: 9px;
  letter-spacing: 4px;
  text-transform: uppercase;
}
.hero__scroll-line {
  width: 48px; height: 1px;
  background: var(--color-blanco);
  transform-origin: left;
  animation: lineGrow 1.6s ease infinite alternate;
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .hero__inner {
    flex-direction: column-reverse;
    padding-block: 100px 60px;
    gap: 36px;
    text-align: center;
  }
  .hero__photo-frame  { width: clamp(200px, 60vw, 300px); }
  .hero__badge        { left: -8px; bottom: 8px; }
  .hero__desc         { max-width: 100%; }
  .hero__cta          { justify-content: center; }
  .hero__stats        { justify-content: center; gap: 24px; }
  .hero__tag          { display: block; }
  .hero__scroll       { display: none; }
}
@media (max-width: 480px) {
  .hero__badge, .hero__deco-corner, .hero__deco-dot { display: none; }
}
</style>
