<template>
  <section class="calendario">
    <button
      class="accordion-header"
      :class="{ 'is-open': isOpen }"
      @click="isOpen = !isOpen"
      :aria-expanded="isOpen"
      aria-controls="calendar-panel"
    >
      <span class="accordion-title">{{ t(data.calendario  ) }}</span>
      <span class="chevron" :class="{ 'is-open': isOpen }">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </button>

    <div
      id="calendar-panel"
      class="accordion-panel"
      :class="{ 'is-open': isOpen }"
      ref="panel"
      :style="panelStyle"
    >
      <div class="accordion-panel-inner">
        <iframe
          src="https://calendar.google.com/calendar/embed?src=2l84qc1v4q7f1t969a8ap60je0%40group.calendar.google.com&ctz=Europe%2FVienna"
          title="Google Calendar"
          width="100%"
          height="600"
          frameborder="0"
          scrolling="no"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, nextTick, watch, computed } from 'vue'
import { useLocale } from '@/composables/useLocale'

const {content, t} = useLocale()

const data = content.contacto

console.log(data.calendario)

const props = defineProps({
  defaultOpen: {
    type: Boolean,
    default: false
  }
})

const isOpen = ref(props.defaultOpen)
const panel = ref(null)
const contentHeight = ref(0)

const panelStyle = computed(() => ({
  maxHeight: isOpen.value ? `${contentHeight.value}px` : '0px'
}))

async function measure() {
  await nextTick()
  if (panel.value) {
    contentHeight.value = panel.value.scrollHeight
  }
}

watch(isOpen, () => {
  measure()
})

// Recalculate on mount in case the iframe/content loads late
nextTick(measure)
</script>

<style scoped>
.calendario {
  width: 100%;
  background: var(--color-crema);
  border: 1px solid var(--color-azul-dark);
  margin: 2rem 0;
}

/* ── Header ── */
.accordion-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1.1rem 1.5rem;

  background: var(--color-crema);
  border: none;
  cursor: pointer;

  color: var(--color-negro);

  font-family: var(--font-label);
  font-size: 20 px;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;

  transition:
    background var(--transition),
    color var(--transition);
}

.accordion-header:hover,
.accordion-header.is-open {
  /* background: var(--color-azul-dark); */
  /* color: var(--color-blanco); */
}

.accordion-title {
  font-weight: 500;
}

/* ── Chevron ── */
.chevron {
  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--color-acento);

  transition: transform 0.3s ease;
}

.chevron.is-open {
  transform: rotate(180deg);
}

/* ── Panel ── */
.accordion-panel {
  max-height: 0;
  overflow: hidden;
  opacity: 0;

  background: var(--color-crema);

  transition:
    max-height 0.5s ease,
    opacity 0.3s ease;
}

.accordion-panel.is-open {
  max-height: 700px;
  opacity: 1;
}

.accordion-panel-inner {
  padding: 1.5rem;
}

/* ── Calendar ── */
.accordion-panel-inner iframe {
  display: block;
  width: 100%;
  height: 600px;

  border: 1px solid var(--color-azul-dark);
  background: #fff;
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .accordion-header {
    padding: 1rem;
    font-size: 9px;
    letter-spacing: 2px;
  }

  .accordion-panel.is-open {
    max-height: 560px;
  }

  .accordion-panel-inner {
    padding: 1rem;
  }

  .accordion-panel-inner iframe {
    height: 500px;
  }
}
</style>