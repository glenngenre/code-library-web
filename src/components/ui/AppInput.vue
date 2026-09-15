<script setup lang="ts">
import { computed, ref } from "vue";
import {
  PhMagnifyingGlass,
  PhEnvelope,
  PhLock,
  PhUser,
  PhPhone,
  PhCalendar,
  PhEye,
  PhEyeSlash,
  PhWarning,
  PhSpinner,
} from "@phosphor-icons/vue";

export type InputVariant = "text" | "outlined" | "filled" | "underlined";
export type InputType =
  | "text"
  | "email"
  | "password"
  | "search"
  | "tel"
  | "number"
  | "date"
  | "url";

const iconMap: Record<string, unknown> = {
  email: PhEnvelope,
  password: PhLock,
  search: PhMagnifyingGlass,
  tel: PhPhone,
  date: PhCalendar,
  text: PhUser,
};

const props = withDefaults(
  defineProps<{
    variant?: InputVariant;
    type?: InputType;
    label?: string;
    placeholder?: string;
    modelValue?: string;
    name?: string;
    id?: string;
    error?: string;
    hint?: string;
    disabled?: boolean;
    loading?: boolean;
    showIcon?: boolean;
    icon?: unknown;
  }>(),
  {
    variant: "outlined",
    type: "text",
    label: "",
    placeholder: "",
    modelValue: "",
    name: "input",
    id: "input",
    error: "",
    hint: "",
    disabled: false,
    loading: false,
    showIcon: true,
    icon: undefined,
  },
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "blur", event: FocusEvent): void;
  (e: "focus", event: FocusEvent): void;
}>();

const isFocused = ref(false);
const showPassword = ref(false);

const resolvedType = computed(() => {
  if (props.type === "password") return showPassword.value ? "text" : "password";
  return props.type;
});

const resolvedIcon = computed(() => props.icon ?? iconMap[props.type] ?? PhUser);

const wrapperClasses = computed(() => [
  "form-element",
  `variant-${props.variant}`,
  {
    "is-focused": isFocused.value,
    "is-disabled": props.disabled,
    "is-error": !!props.error,
    "is-loading": props.loading,
  },
]);

const onInput = (e: Event) => emit("update:modelValue", (e.target as HTMLInputElement).value);

const onFocus = (e: FocusEvent) => {
  isFocused.value = true;
  emit("focus", e);
};

const onBlur = (e: FocusEvent) => {
  isFocused.value = false;
  emit("blur", e);
};
</script>

<template>
  <div :class="wrapperClasses">
    <label v-if="label" :for="id" class="input-label">{{ label }}</label>

    <div class="input-wrapper">
      <div v-if="showIcon" class="icon icon-leading">
        <component :is="resolvedIcon" :size="16" weight="regular" />
      </div>

      <input
        :id="id"
        :name="name"
        :type="resolvedType"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled || loading"
        class="input-field"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      />

      <div class="icon icon-trailing">
        <PhSpinner v-if="loading" :size="16" class="spinner" />
        <PhWarning v-else-if="error" :size="16" />
        <button
          v-else-if="type === 'password'"
          type="button"
          class="toggle-btn"
          :aria-label="showPassword ? 'Hide password' : 'Show password'"
          @click="showPassword = !showPassword"
          @mousedown.prevent
        >
          <component :is="showPassword ? PhEyeSlash : PhEye" :size="16" />
        </button>
      </div>
    </div>

    <p v-if="error" class="helper-text is-error-text">{{ error }}</p>
    <p v-else-if="hint" class="helper-text is-hint-text">{{ hint }}</p>
  </div>
</template>

<style scoped>
.form-element {
  --pl: var(--primary-l);
  --pc: var(--primary-c);
  --ph: var(--primary-h);

  --input-border: var(--color-border-strong);
  --input-border-focus: var(--color-border-focus);
  --input-border-error: oklch(0.55 0.2 25);
  --input-bg: var(--color-background);
  --input-filled-bg: oklch(var(--pl) var(--pc) var(--ph) / 0.05);
  --input-radius: 6px;
  --input-transition: 0.16s ease;

  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  font-family: var(--font-display);
}

/* ─── Label ───────────────────────────────────────────────────── */
.input-label {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  color: var(--color-text-muted);
  transition: color var(--input-transition);
}
.is-focused .input-label {
  color: var(--color-primary);
}
.is-error .input-label {
  color: var(--input-border-error);
}

/* ─── Wrapper ─────────────────────────────────────────────────── */
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

/* ─── Field ───────────────────────────────────────────────────── */
.input-field {
  width: 100%;
  font-size: 0.875rem;
  font-family: var(--font-display);
  color: var(--color-text);
  background: transparent;
  border: none;
  outline: none;
  padding: 0.5rem 2rem 0.5rem 2rem;
  transition: background var(--input-transition);
}
.input-field::placeholder {
  color: oklch(var(--pl) var(--pc) var(--ph) / 0.35);
}
.input-field:disabled {
  cursor: not-allowed;
  color: oklch(var(--pl) var(--pc) var(--ph) / 0.3);
}

/* ─── Search Cancel Button ────────────────────────────────────── */
/* This is annoying so I removed it. */
.input-field[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
  display: none;
}

/* ─── Icons ───────────────────────────────────────────────────── */
.icon {
  position: absolute;
  display: flex;
  align-items: center;
  color: oklch(var(--pl) var(--pc) var(--ph) / 0.35);
  pointer-events: none;
  transition: color var(--input-transition);
}
.icon-leading {
  left: 0.5rem;
}
.icon-trailing {
  right: 0.5rem;
  pointer-events: auto;
}

.is-focused .icon-leading {
  color: var(--color-primary);
}
.is-error .icon-leading,
.is-error .icon-trailing {
  color: var(--input-border-error);
}
.is-disabled .icon {
  color: oklch(var(--pl) var(--pc) var(--ph) / 0.2);
}

/* ─── Password toggle ─────────────────────────────────────────── */
.toggle-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  display: flex;
  align-items: center;
  color: oklch(var(--pl) var(--pc) var(--ph) / 0.4);
  transition: color var(--input-transition);
}
.toggle-btn:hover {
  color: var(--color-primary);
}

/* ─── Spinner ─────────────────────────────────────────────────── */
.spinner {
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ─── Helper text ─────────────────────────────────────────────── */
.helper-text {
  font-size: 0.6875rem;
  font-family: var(--font-mono);
  margin: 0;
}
.is-hint-text {
  color: oklch(var(--pl) var(--pc) var(--ph) / 0.45);
}
.is-error-text {
  color: var(--input-border-error);
}

/* ════════════════════════════════════════════════════════════════
   VARIANTS
   ════════════════════════════════════════════════════════════════ */

/* ── outlined ────────────────────────────────────────────────── */
.variant-outlined .input-wrapper {
  border: 1px solid var(--input-border);
  border-radius: var(--input-radius);
  background: var(--input-bg);
  transition:
    border-color var(--input-transition),
    box-shadow var(--input-transition);
}
.variant-outlined.is-focused .input-wrapper {
  border-color: var(--input-border-focus);
  box-shadow: 0 0 0 3px oklch(var(--pl) var(--pc) var(--ph) / 0.12);
}
.variant-outlined.is-error .input-wrapper {
  border-color: var(--input-border-error);
  box-shadow: 0 0 0 3px oklch(0.55 0.2 25 / 0.1);
}
.variant-outlined.is-disabled .input-wrapper {
  border-color: var(--color-border);
  background: oklch(var(--pl) var(--pc) var(--ph) / 0.03);
}

/* ── filled ──────────────────────────────────────────────────── */
.variant-filled .input-wrapper {
  border: 1px solid transparent;
  border-bottom-color: var(--input-border);
  border-radius: var(--input-radius) var(--input-radius) 0 0;
  background: var(--input-filled-bg);
  transition:
    background var(--input-transition),
    border-color var(--input-transition);
}
.variant-filled.is-focused .input-wrapper {
  background: oklch(var(--pl) var(--pc) var(--ph) / 0.08);
  border-bottom-color: var(--input-border-focus);
}
.variant-filled.is-error .input-wrapper {
  border-bottom-color: var(--input-border-error);
}
.variant-filled.is-disabled .input-wrapper {
  background: oklch(var(--pl) var(--pc) var(--ph) / 0.03);
  border-bottom-color: var(--color-border);
}

/* ── underlined ──────────────────────────────────────────────── */
.variant-underlined .input-wrapper {
  border-bottom: 1px solid var(--input-border);
  transition: border-color var(--input-transition);
}
.variant-underlined .input-field {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.variant-underlined.is-focused .input-wrapper {
  border-bottom-color: var(--input-border-focus);
}
.variant-underlined.is-error .input-wrapper {
  border-bottom-color: var(--input-border-error);
}

/* ── text (ghost) ────────────────────────────────────────────── */
.variant-text .input-field {
  padding-left: 1.5rem;
}
</style>
