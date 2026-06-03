<template>
  <section id="contacto" class="contacto">
    <div class="contacto__inner section-inner">

      <!-- Left: info -->
      <div class="contacto__info-col">
        <p class="section-label">{{ t(data.label) }}</p>
        <h2 class="contacto__title" v-html="formattedTitle"></h2>
        <p class="contacto__desc">{{ t(data.desc) }}</p>

        <ul class="contacto__info-list">
          <li v-for="item in data.info" :key="item.label.es" class="contacto__info-item">
            <span class="contacto__info-icon" aria-hidden="true">{{ item.icon }}</span>
            <div>
              <span class="contacto__info-label">{{ t(item.label) }}</span>
              <span class="contacto__info-val">{{ t(item.val) }}</span>
            </div>
          </li>
        </ul>

        <div class="contacto__social">
          <a
            v-for="s in data.social"
            :key="s.name"
            :href="s.href"
            class="contacto__social-btn"
            target="_blank"
            rel="noopener"
          >{{ s.name }}</a>
        </div>
      </div>

      <!-- Right: form -->
      <div class="contacto__form-wrap">
        <form class="contacto__form" @submit.prevent="handleSubmit" novalidate>

          <div class="form__row">
            <div class="form__group">
              <label :for="'nombre'">{{ t(f.nombre) }}</label>
              <input
                id="nombre"
                v-model="form.nombre"
                type="text"
                :placeholder="t(f.nombre_ph)"
                required
                autocomplete="name"
              />
            </div>
            <div class="form__group">
              <label :for="'email'">{{ t(f.email) }}</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                :placeholder="t(f.email_ph)"
                required
                autocomplete="email"
              />
            </div>
          </div>

          <div class="form__group">
            <label :for="'asunto'">{{ t(f.asunto) }}</label>
            <select id="asunto" v-model="form.asunto">
              <option value="" disabled>{{ t(f.asunto_ph) }}</option>
              <option v-for="a in f.asuntos" :key="a.es" :value="t(a)">
                {{ t(a) }}
              </option>
            </select>
          </div>

          <div class="form__group">
            <label :for="'mensaje'">{{ t(f.mensaje) }}</label>
            <textarea
              id="mensaje"
              v-model="form.mensaje"
              rows="5"
              :placeholder="t(f.mensaje_ph)"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            :class="['form__submit', { 'form__submit--sent': sent, 'form__submit--error': error }]"
            :disabled="sending"
          >
            <span v-if="sending" class="form__spinner"></span>
            <span v-else-if="sent">{{ t(f.enviado) }}</span>
            <span v-else-if="error">{{ t(f.error) }}</span>
            <span v-else>{{ t(f.enviar) }}</span>
          </button>

          <p v-if="sent" class="form__confirm">{{ t(f.confirmacion) }}</p>
        </form>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { content, t } = useLocale()
const data = content.contacto
const f    = data.form

const form    = ref({ nombre: '', email: '', asunto: '', mensaje: '' })
const sending = ref(false)
const sent    = ref(false)
const error   = ref(false)

const formattedTitle = computed(() => {
  const full  = t(data.titulo)
  const parts = full.split(' ')
  const half  = Math.ceil(parts.length / 2)
  return `${parts.slice(0, half).join(' ')}<br><em>${parts.slice(half).join(' ')}</em>`
})

async function handleSubmit() {
  sending.value = true
  error.value   = false
  try {
    const res = await fetch('https://formspree.io/f/xnjyqpek', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre:  form.value.nombre,
        email:   form.value.email,
        asunto:  form.value.asunto,
        mensaje: form.value.mensaje
      })
    })
    if (res.ok) {
      sent.value = true
      form.value = { nombre: '', email: '', asunto: '', mensaje: '' }
    } else {
      error.value = true
    }
  } catch {
    error.value = true
  } finally {
    sending.value = false
  }
}
</script>

<style scoped>
.contacto {
  background: var(--color-crema);
  color: var(--color-negro);
  padding-block: var(--section-py);
}
.contacto__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 72px;
  align-items: start;
}

/* ── Info column ── */
.contacto__info-col .section-label::before { background: var(--color-acento); }

.contacto__title {
  font-family: var(--font-display);
  font-size: clamp(32px, 4vw, 58px);
  color: var(--color-negro);
  line-height: 1.05;
  margin-bottom: 18px;
}
.contacto__title :deep(em) { font-style: italic; color: var(--color-azul-dark); }

.contacto__desc {
  font-size: 16px;
  line-height: 1.78;
  color: #666;
  font-weight: 300;
  max-width: 380px;
  margin-bottom: 36px;
}

.contacto__info-list { display: flex; flex-direction: column; gap: 18px; margin-bottom: 32px; }
.contacto__info-item { display: flex; align-items: flex-start; gap: 14px; }
.contacto__info-icon { color: var(--color-acento); font-size: 13px; margin-top: 1px; }
.contacto__info-label {
  display: block;
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #aaa;
  margin-bottom: 2px;
}
.contacto__info-val { display: block; font-size: 14.5px; color: var(--color-negro); }

.contacto__social { display: flex; gap: 10px; flex-wrap: wrap; }
.contacto__social-btn {
  border: 1px solid var(--color-azul-dark);
  color: var(--color-azul-dark);
  padding: 7px 18px;
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  transition: background var(--transition), color var(--transition);
}
.contacto__social-btn:hover { background: var(--color-azul-dark); color: var(--color-blanco); }

/* ── Form ── */
.contacto__form-wrap {
  background: #fff;
  padding: 44px 38px;
  box-shadow: 0 4px 40px rgba(0,0,0,.06);
}
.contacto__form { display: flex; flex-direction: column; gap: 18px; }

.form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.form__group { display: flex; flex-direction: column; gap: 7px; }

label {
  font-family: var(--font-label);
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #999;
}

input, select, textarea {
  border: 1px solid #ddd;
  background: #fafafa;
  padding: 13px 15px;
  font-family: var(--font-sans);
  font-size: 15.5px;
  color: var(--color-negro);
  transition: border-color var(--transition);
  outline: none;
  resize: none;
  width: 100%;
  appearance: none;
}
input:focus, select:focus, textarea:focus { border-color: var(--color-azul); background: #fff; }
input::placeholder, textarea::placeholder { color: #bbb; }
select { cursor: pointer; }

.form__submit {
  background: var(--color-negro);
  color: var(--color-blanco);
  border: none;
  padding: 15px 34px;
  font-family: var(--font-label);
  font-size: 15px;
  letter-spacing: 3px;
  cursor: pointer;
  transition: background var(--transition), transform var(--transition);
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 200px;
  justify-content: center;
}
.form__submit:hover:not(:disabled) { background: var(--color-azul-dark); transform: translateY(-2px); }
.form__submit:disabled              { opacity: .65; cursor: not-allowed; }
.form__submit--sent                 { background: #2d6a4f; }
.form__submit--error                { background: #8b2020; }

/* Spinner */
.form__spinner {
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin .7s linear infinite;
  flex-shrink: 0;
}
@keyframes spin { to { transform: rotate(360deg); } }

.form__confirm {
  font-size: 13.5px;
  color: #2d6a4f;
  letter-spacing: .5px;
  margin-top: -6px;
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .contacto { padding-block: var(--section-py-md); }
  .contacto__inner { grid-template-columns: 1fr; gap: 40px; }
  .contacto__form-wrap { padding: 28px 20px; }
  .form__row { grid-template-columns: 1fr; }
}
</style>
