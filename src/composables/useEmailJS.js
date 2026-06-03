// composables/useEmailJS.js
// ─────────────────────────────────────────────
// Encapsula toda la lógica de EmailJS.
// Configura SERVICE_ID, TEMPLATE_ID y PUBLIC_KEY
// en el archivo .env (ver .env.example).
//
// El template en EmailJS debe tener estas variables:
//   {{from_name}}   — nombre del remitente
//   {{from_email}}  — email del remitente
//   {{subject}}     — asunto seleccionado
//   {{message}}     — cuerpo del mensaje
//   {{reply_to}}    — para reply automático
// ─────────────────────────────────────────────
import { ref } from 'vue'
import emailjs from '@emailjs/browser'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export function useEmailJS() {
  const sending = ref(false)
  const sent    = ref(false)
  const error   = ref(false)

  /**
   * Envía el formulario via EmailJS.
   * @param {{ nombre: string, email: string, asunto: string, mensaje: string }} formData
   */
  async function sendEmail(formData) {
    sending.value = true
    error.value   = false

    const templateParams = {
      from_name:  formData.nombre,
      from_email: formData.email,
      reply_to:   formData.email,
      subject:    formData.asunto,
      message:    formData.mensaje,
    }

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      sent.value = true
      setTimeout(() => { sent.value = false }, 5000)
      return true
    } catch (err) {
      console.error('[EmailJS]', err)
      error.value = true
      setTimeout(() => { error.value = false }, 5000)
      return false
    } finally {
      sending.value = false
    }
  }

  return { sending, sent, error, sendEmail }
}
