<template>
  <footer class="footer">
    <div class="footer__inner section-inner">

      <div class="footer__brand">
        <p class="footer__logo">ELOY PRIM</p>
        <p class="footer__tagline">{{ t(data.tagline) }}</p>
        <p class="footer__frase">{{ t(data.frase) }}</p>
      </div>

      <nav class="footer__nav" aria-label="Footer navigation">
        <div class="footer__col">
          <p class="footer__col-title">{{ t(data.col_nav) }}</p>
          <a v-for="k in navKeys" :key="k" :href="'#' + k">{{ t(content.nav[k]) }}</a>
        </div>
        <div class="footer__col">
          <p class="footer__col-title">{{ t(data.col_prog) }}</p>
          <a v-for="p in programas" :key="p.key" :href="p.href">{{ t(p.label) }}</a>
        </div>
        <div class="footer__col">
          <p class="footer__col-title">{{ t(data.col_redes) }}</p>
          <a v-for="s in content.contacto.social" :key="s.name" :href="s.href" target="_blank" rel="noopener">
            {{ s.name }}
          </a>
        </div>
      </nav>

    </div>

    <div class="footer__bottom">
      <span>© {{ year }} Eloy Prim | All rights reserved | Photos by Barbara Klein | Design & Development: Julián Martínez Sänger - 
        julianmartinezsanger@gmail.com | Salzburg, Österreich</span>
      <span>{{ t(data.copyright) }}</span>
    </div>
  </footer>
</template>

<script setup>
import { useLocale } from '@/composables/useLocale'

const { content, t } = useLocale()
const data = content.footer

const year    = new Date().getFullYear()
const navKeys = ['inicio', 'biografia', 'clases', 'milonga', 'galeria', 'contacto']

const programas = [
  { key: 'priv',  href: '#clases',  label: content.clases.items[0].titulo },
  { key: 'grup',  href: '#clases',  label: content.clases.items[1].titulo },
  { key: 'work',  href: '#clases',  label: content.clases.items[2].titulo },
  { key: 'mil1',  href: '#milonga', label: content.milonga.eventos[0].nombre },
  { key: 'mil2',  href: '#milonga', label: content.milonga.eventos[1].nombre },
  { key: 'mil3',  href: '#milonga', label: content.milonga.eventos[2].nombre },
]
</script>

<style scoped>
.footer {
  background: var(--color-negro);
  border-top: 1px solid rgba(201,168,76,.14);
}
.footer__inner {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 72px;
  padding-block: 60px 40px;
}

/* Brand */
.footer__logo {
  font-family: var(--font-label);
  font-size: 26px;
  letter-spacing: 6px;
  color: var(--color-blanco);
  margin-bottom: 6px;
}
.footer__tagline {
  font-size: 10px;
  letter-spacing: 3px;
  color: var(--color-acento);
  text-transform: uppercase;
  margin-bottom: 18px;
}
.footer__frase {
  font-family: var(--font-display);
  font-size: 15px;
  font-style: italic;
  color: rgba(245,242,238,.3);
  max-width: 220px;
  line-height: 1.5;
}

/* Nav */
.footer__nav {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
.footer__col { display: flex; flex-direction: column; gap: 9px; }
.footer__col-title {
  font-family: var(--font-label);
  font-size: 11px;
  letter-spacing: 4px;
  color: var(--color-acento);
  text-transform: uppercase;
  margin-bottom: 4px;
}
.footer__col a {
  color: rgba(245,242,238,.38);
  font-size: 13.5px;
  transition: color var(--transition);
}
.footer__col a:hover { color: var(--color-blanco); }

/* Bottom bar */
.footer__bottom {
  max-width: var(--max-width);
  -webkit-text-stroke: 0.7px;
  color: white;
  margin: 0 auto;
  padding: 20px var(--pad-x);
  border-top: 1px solid rgba(255,255,255,.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}
.footer__bottom span {
  font-size: 11px;
  color: rgba(245,242,238,.18);
  letter-spacing: 1px;
}

/* Responsive */
@media (max-width: 900px) {
  .footer__inner { grid-template-columns: 1fr; gap: 36px; padding-block: 40px 24px; }
  .footer__nav   { grid-template-columns: 1fr 1fr; }
  .footer__bottom { flex-direction: column; text-align: center; padding: 18px var(--pad-x-md); }
}
@media (max-width: 480px) {
  .footer__nav { grid-template-columns: 1fr; }
}
</style>
