<template>
  <nav :class="['navbar', { 'navbar--scrolled': scrolled, 'navbar--open': menuOpen }]">
    <div class="navbar__inner section-inner">


      <!-- Logo -->
      <a href="#inicio" class="navbar__logo" @click="menuOpen = false">
        <span class="navbar__logo-main">ELOY PRIM</span>
        <span class="navbar__logo-sub">Tango Argentino</span>
      </a>

      <!-- Desktop links -->
      <div class="navbar__links">
        <a
          v-for="key in navKeys"
          :key="key"
          :href="'#' + key"
          class="navbar__link"
        >{{ t(content.nav[key]) }}</a>

        <!-- Language switcher -->
        <div class="lang-switcher">
          <button
            v-for="lang in supported"
            :key="lang"
            :class="['lang-btn', { 'lang-btn--active': locale === lang }]"
            @click="setLocale(lang)"
          >{{ lang.toUpperCase() }}</button>
        </div>

        <a href="#contacto" class="navbar__cta">{{ t(content.nav.reservar) }}</a>
      </div>

      <!-- Hamburger -->
      <button
        class="navbar__hamburger"
        :class="{ 'navbar__hamburger--open': menuOpen }"
        @click="menuOpen = !menuOpen"
        aria-label="Menú"
      >
        <span /><span /><span />
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition name="slide">
      <div v-if="menuOpen" class="navbar__mobile">
        <a
          v-for="key in navKeys"
          :key="key"
          :href="'#' + key"
          class="navbar__mobile-link"
          @click="menuOpen = false"
        >{{ t(content.nav[key]) }}</a>

        <div class="navbar__mobile-langs">
          <button
            v-for="lang in supported"
            :key="lang"
            :class="['lang-btn', { 'lang-btn--active': locale === lang }]"
            @click="setLocale(lang)"
          >{{ lang.toUpperCase() }}</button>
        </div>

        <a href="#contacto" class="navbar__mobile-cta" @click="menuOpen = false">
          {{ t(content.nav.reservar) }}
        </a>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { locale, supported, content, setLocale, t } = useLocale()

const navKeys   = ['inicio', 'biografia', 'clases', 'milonga', 'galeria', 'contacto']
const scrolled  = ref(false)
const menuOpen  = ref(false)

function onScroll() { scrolled.value = window.scrollY > 60 }
onMounted(()  => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
/* ── Base ── */
.navbar {
  position: fixed;
  inset-block-start: 0;
  inset-inline: 0;
  z-index: 100;
  transition: background var(--transition-slow), box-shadow var(--transition-slow);

}
.navbar--scrolled {
  background: rgba(14, 14, 14, 0.96);
  backdrop-filter: blur(14px);
  box-shadow: 0 1px 0 rgba(201, 168, 76, 0.18);
}

/* ── Inner ── */
.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 20px;
}

/* ── Logo ── */
.navbar__logo {
  display: flex;
  flex-direction: column;
  line-height: 1;
  gap: 3px;
}
.navbar__logo-main {
  font-family: var(--font-label);
  font-size: 22px;
  letter-spacing: 5px;
  color: var(--color-blanco);
}
.navbar__logo-sub {
  /* font-family: 'Cormorant Garamond', serif;
  font-weight: 300; */
  -webkit-text-stroke: 1px var(--color-acento);
  font-size: 10px;
  letter-spacing: 3px;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--color-acento);
}

/* ── Links ── */
.navbar__links {
  display: flex;
  align-items: center;
  gap: 32px;
}
.navbar__link {
  -webkit-text-stroke: 0.4px;
  color: rgba(245,242,238,.75);
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  position: relative;
  transition: color var(--transition);
}
.navbar__link::after {
  -webkit-text-stroke: 0.9px;

  content: '';
  position: absolute;
  bottom: -4px; left: 0;
  width: 0; height: 1px;
  background: var(--color-acento);
  transition: width var(--transition);
}
.navbar__link:hover            { color: var(--color-blanco); }
.navbar__link:hover::after     { width: 100%; }

/* ── CTA ── */
.navbar__cta {
  background: var(--color-acento);
  color: var(--color-negro);
  padding: 10px 22px;
  font-family: var(--font-label);
  font-size: 13px;
  letter-spacing: 3px;
  transition: background var(--transition), transform var(--transition);
}
.navbar__cta:hover { background: var(--color-acento-lt); transform: translateY(-1px); }

/* ── Lang switcher ── */
.lang-switcher { display: flex; gap: 4px; }
.navbar__mobile-langs { display: flex; gap: 8px; padding: 16px 0; border-top: 1px solid rgba(255,255,255,.07); }

.lang-btn {
  background: transparent;
  border: 1px solid rgba(245,242,238,.2);
  color: rgba(245,242,238,.5);
  font-family: var(--font-label);
  font-size: 11px;
  letter-spacing: 2px;
  padding: 4px 8px;
  cursor: pointer;
  transition: border-color var(--transition), color var(--transition), background var(--transition);
}
.lang-btn:hover            { border-color: var(--color-acento); color: var(--color-acento); }
.lang-btn--active          { border-color: var(--color-acento); color: var(--color-negro); background: var(--color-acento); }

/* ── Hamburger ── */
.navbar__hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.navbar__hamburger span {
  display: block;
  width: 26px; height: 2px;
  background: var(--color-blanco);
  transition: transform var(--transition), opacity var(--transition);
}
.navbar__hamburger--open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.navbar__hamburger--open span:nth-child(2) { opacity: 0; }
.navbar__hamburger--open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

/* ── Mobile menu ── */
.navbar__mobile {
  background: rgba(14,14,14,.98);
  border-top: 1px solid rgba(201,168,76,.18);
  padding: 16px 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.navbar__mobile-link {
  color: rgba(245,242,238,.75);
  font-size: 13px;
  letter-spacing: 3px;
  text-transform: uppercase;
  padding: 13px 0;
  border-bottom: 1px solid rgba(255,255,255,.06);
  transition: color var(--transition);
}
.navbar__mobile-link:hover { color: var(--color-acento); }
.navbar__mobile-cta {
  display: block;
  text-align: center;
  background: var(--color-acento);
  color: var(--color-negro);
  font-family: var(--font-label);
  font-size: 14px;
  letter-spacing: 3px;
  padding: 14px;
  margin-top: 12px;
}

/* ── Transition ── */
.slide-enter-active, .slide-leave-active { transition: opacity .25s, transform .25s; }
.slide-enter-from, .slide-leave-to       { opacity: 0; transform: translateY(-8px); }

/* ── Responsive ── */
@media (max-width: 1024px) { .navbar__links { gap: 20px; } }
@media (max-width: 900px)  {
  .navbar__links    { display: none; }
  .navbar__hamburger{ display: flex; }
  .navbar__inner    { padding-block: 16px; }
}
</style>
