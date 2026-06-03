<template>
  <!-- Event banner -->
  <section id="milonga" class="milonga">
  <div class="section-inner">
    <p class="section-label">{{ t(data.label) }}</p>
    <h2 class="milonga__title">{{ t(data.titulo) }}</h2>

    <div class="milonga__eventos">
      <div v-for="evento in data.eventos" :key="evento.nombre.es" class="milonga__evento">
        <div class="milonga__text">
          <p class="milonga__icon">{{ evento.icon }}</p>
          <h3 class="milonga__evento-nombre">{{ t(evento.nombre) }}</h3>
          <p class="milonga__evento-sub">{{ t(evento.subtitulo) }}</p>
          <p class="milonga__fecha">{{ t(evento.frecuencia) }} · {{ evento.horario }}</p>
          <p class="milonga__lugar">{{ evento.lugar }}</p>
          <a href="#contacto" class="btn-primary milonga__cta">{{ t(data.proximo_evento.cta) }}</a>
        </div>
        <!-- <div class="milonga__info">
          <div v-for="row in data.info" :key="row.label.es" class="milonga__info-row">
            <span class="milonga__info-label">{{ t(row.label) }}</span>
            <span class="milonga__info-val">{{ t(row.val) }}</span>
          </div>
        </div> -->
      </div>
    </div>

  </div>
</section>

  <!-- Testimonials -->
  <section class="testimonios">
    <div class="testimonios__inner section-inner">
      <p class="section-label">{{ t(data.testimonios_label) }}</p>
      <h2 class="testimonios__title" v-html="formattedTestTitle"></h2>

      <div class="testimonios__grid">
        <blockquote
          v-for="t_ in data.testimonios"
          :key="t_.nombre"
          class="testimonios__card"
        >
          <div class="testimonios__quote" aria-hidden="true">"</div>
          <p class="testimonios__text">{{ t(t_.texto) }}</p>
          <footer class="testimonios__autor">
            <div class="testimonios__avatar">{{ t_.nombre[0] }}</div>
            <div>
              <cite class="testimonios__nombre">{{ t_.nombre }}</cite>
              <span class="testimonios__origen">{{ t(t_.origen) }}</span>
            </div>
          </footer>
        </blockquote>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { content, t } = useLocale()
const data = content.milonga

const formattedTitle = computed(() => {
  const full  = t(data.titulo)
  const parts = full.split(' ')
  const half  = Math.ceil(parts.length / 2)
  return `${parts.slice(0, half).join(' ')}<br><em>${parts.slice(half).join(' ')}</em>`
})

const formattedTestTitle = computed(() => {
  const full  = t(data.testimonios_titulo)
  const parts = full.split(' ')
  const half  = Math.ceil(parts.length / 2)
  return `${parts.slice(0, half).join(' ')}<br><em>${parts.slice(half).join(' ')}</em>`
})
</script>

<style scoped>
/* ── Event banner ── */
.milonga {
  background: var(--color-azul-dark);
  padding-block: var(--section-py);
}
.milonga__title {
  font-family: var(--font-display);
  font-size: clamp(38px, 5vw, 68px);
  color: var(--color-blanco);
  line-height: 1.0;
  margin-bottom: 32px;
}
.milonga__title :deep(em) { font-style: italic; color: var(--color-acento); }

/* ── Grid de eventos ── */
.milonga__eventos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}
.milonga__evento {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0;
  transition: background var(--transition);
}
.milonga__evento:hover {
  background: rgba(255,255,255,0.07);
}

/* ── Contenido del evento ── */
.milonga__icon {
  font-size: 1.4rem;
  margin-bottom: 1rem;
}
.milonga__evento-sub {
  -webkit-text-stroke: 0.5px;
  font-size: 10px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--color-acento);
  margin: 0 0 6px;
}
.milonga__evento-nombre {
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  color: var(--color-blanco);
  font-weight: 600;
  margin: 0 0 1.25rem;
  line-height: 1.2;
}
.milonga__fecha {
  font-family: var(--font-label);
  font-size: 12px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--color-blanco);
  margin: 0 0 6px;
}
.milonga__lugar {
  -webkit-text-stroke: 0.5px;
  font-size: 13px;
  color: rgba(245,242,238,.42);
  letter-spacing: 0.5px;
  line-height: 1.6;
  margin: 0 0 1.75rem;
}
.milonga__cta {
  display: inline-block;
  margin-top: auto;
  align-self: flex-start;
}

/* ── Testimonials ── */
.testimonios {
  background: var(--color-negro);
  padding-block: var(--section-py);
}
.testimonios__inner { display: flex; flex-direction: column; gap: 52px; }
.testimonios__title {
  font-family: var(--font-display);
  font-size: clamp(34px, 4.5vw, 58px);
  color: var(--color-blanco);
  line-height: 1.06;
}
.testimonios__title :deep(em) { font-style: italic; color: var(--color-acento); }
.testimonios__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 2px;
}
.testimonios__card {
  background: #141414;
  padding: 34px 26px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  transition: background var(--transition);
}
.testimonios__card:hover { background: #1a1a1a; }
.testimonios__quote {
  font-family: var(--font-display);
  font-size: 56px;
  color: var(--color-acento);
  line-height: .7;
  opacity: .55;
}
.testimonios__text {
  font-size: 14.5px;
  line-height: 1.82;
  color: rgba(245,242,238,.62);
  font-weight: 300;
  font-style: italic;
  flex: 1;
}
.testimonios__autor {
  display: flex;
  align-items: center;
  gap: 13px;
  padding-top: 18px;
  border-top: 1px solid rgba(255,255,255,.06);
}
.testimonios__avatar {
  width: 38px; height: 38px;
  background: var(--color-azul-dark);
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-family: var(--font-label);
  font-size: 18px;
  color: var(--color-acento);
  flex-shrink: 0;
}
.testimonios__nombre {
  display: block;
  font-family: var(--font-sans);
  font-style: normal;
  font-size: 14.5px;
  color: var(--color-blanco);
  font-weight: 600;
}
.testimonios__origen {
  display: block;
  font-size: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(245,242,238,.3);
  margin-top: 2px;
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .milonga { padding-block: var(--section-py-md); }
  .milonga__eventos { grid-template-columns: 1fr; }
  .testimonios { padding-block: var(--section-py-md); }
}

</style>