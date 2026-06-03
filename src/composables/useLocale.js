// composables/useLocale.js
// ─────────────────────────────────────────────
// Maneja el idioma activo de forma global (reactivo).
// Cualquier componente que lo importe comparte el mismo estado.
// ─────────────────────────────────────────────
import { ref, computed } from 'vue'
import content from '@/locales/content.json'

const SUPPORTED = ['es', 'fr', 'en', 'de']
const DEFAULT   = 'es'

// Estado singleton — se comparte entre todos los componentes
const locale = ref(
  SUPPORTED.includes(navigator.language?.slice(0, 2))
    ? navigator.language.slice(0, 2)
    : DEFAULT
)

export function useLocale() {
  /**
   * Cambia el idioma activo.
   * @param {string} lang - 'es' | 'fr' | 'en' | 'de'
   */
  function setLocale(lang) {
    if (SUPPORTED.includes(lang)) locale.value = lang
  }

  /**
   * Resuelve un nodo i18n del JSON.
   * Acepta tanto objetos { es, fr, en, de } como valores primitivos.
   * @param {object|string} node
   * @returns {string}
   */
  function t(node) {
    if (!node) return ''
    if (typeof node === 'string') return node
    return node[locale.value] ?? node[DEFAULT] ?? ''
  }

  return {
    locale: computed(() => locale.value),
    supported: SUPPORTED,
    content,
    setLocale,
    t,
  }
}
