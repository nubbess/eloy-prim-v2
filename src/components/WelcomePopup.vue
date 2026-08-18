<template>
  <Teleport to="body">
    <Transition name="popup">
      <div v-if="isOpen" class="popup-overlay" @click.self="closePopup">
        <div class="popup">
          
          <button
            class="popup-close"
            @click="closePopup"
            aria-label="Cerrar"
          >
            ×
          </button>

          <div class="carousel">
            <Transition name="slide" mode="out-in">
              <img
                :key="currentSlide"
                :src="images[currentSlide]"
                class="carousel-image"
                alt="Imagen informativa"
              />
            </Transition>

            <button
              class="carousel-arrow carousel-arrow--prev"
              @click="prevSlide"
              aria-label="Foto anterior"
            >
              ←
            </button>

            <button
              class="carousel-arrow carousel-arrow--next"
              @click="nextSlide"
              aria-label="Foto siguiente"
            >
              →
            </button>

            <div class="carousel-dots">
              <button
                v-for="(_, index) in images"
                :key="index"
                class="carousel-dot"
                :class="{ 'is-active': currentSlide === index }"
                @click="currentSlide = index"
                :aria-label="`Ir a imagen ${index + 1}`"
              ></button>
            </div>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)
const currentSlide = ref(0)



// array con imagenes de content.galeria_welcome
const images = [
    //las url
    '/welcome/autentica.png',
    '/welcome/estacion.png'
]
let interval

function nextSlide() {
  currentSlide.value =
    (currentSlide.value + 1) % images.length
}

function prevSlide() {
  currentSlide.value =
    (currentSlide.value - 1 + images.length) % images.length
}

function closePopup() {
  isOpen.value = false
  clearInterval(interval)
}

onMounted(() => {
  // Se abre automáticamente al cargar
  isOpen.value = true

  // Cambia de foto cada 5 segundos
  interval = setInterval(nextSlide, 5000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<style scoped>
/* ── Fondo ── */
.popup-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

  background: rgba(0, 0, 0, 0.65);
}

/* ── Popup ── */
.popup {
  position: relative;
  width: min(90vw, 600px);
  aspect-ratio: 1 / 1;

  background: black;
  border: 1px solid black;
  /* borde redondeado */
  border-radius: 10px;
  overflow: hidden;

  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
}

/* ── Botón cerrar ── */
.popup-close {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;

  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  background: var(--color-negro);
  color: var(--color-blanco);

  font-size: 28px;
  line-height: 1;

  cursor: pointer;

  transition:
    background var(--transition),
    transform var(--transition);
}

.popup-close:hover {
  background: var(--color-acento);
  transform: rotate(90deg);
}

/* ── Carrusel ── */
.carousel {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
}

.carousel-image {
  display: block;
  width: 100% !important;
  height: 100% !important;
  object-fit: contain;
}

/* ── Flechas ── */
.carousel-arrow {
  position: absolute;
  top: 50%;
  z-index: 5;

  transform: translateY(-50%);

  width: 45px;
  height: 45px;

  border: 1px solid var(--color-blanco);
  background: rgba(0, 0, 0, 0.55);
  color: var(--color-blanco);

  font-size: 22px;
  cursor: pointer;

  transition:
    background var(--transition),
    color var(--transition);
}

.carousel-arrow:hover {
  background: var(--color-acento);
  color: var(--color-negro);
}

.carousel-arrow--prev {
  left: 15px;
}

.carousel-arrow--next {
  right: 15px;
}

/* ── Indicadores ── */
.carousel-dots {
  position: absolute;
  bottom: 18px;
  left: 50%;

  display: flex;
  gap: 8px;

  transform: translateX(-50%);
}

.carousel-dot {
  width: 9px;
  height: 9px;

  padding: 0;

  border: 1px solid var(--color-blanco);
  border-radius: 50%;

  background: transparent;
  cursor: pointer;
}

.carousel-dot.is-active {
  background: var(--color-acento);
  border-color: var(--color-acento);
}

/* ── Animación del popup ── */
.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.3s ease;
}

.popup-enter-active .popup,
.popup-leave-active .popup {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
}

.popup-enter-from .popup,
.popup-leave-to .popup {
  transform: translateY(20px) scale(0.97);
  opacity: 0;
}

/* ── Animación entre fotos ── */
.slide-enter-active,
.slide-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* ── Mobile ── */
@media (max-width: 640px) {
  .popup-overlay {
    padding: 12px;
  }

  .popup {
    width: 100%;
  }


  .carousel-arrow {
    width: 38px;
    height: 38px;
  }

  .carousel-arrow--prev {
    left: 8px;
  }

  .carousel-arrow--next {
    right: 8px;
  }
}
</style>