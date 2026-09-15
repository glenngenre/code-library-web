<script setup lang="ts">
import { computed } from "vue";
import { PhSpinner } from "@phosphor-icons/vue";

export type ButtonVariant = "primary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    type?: "button" | "submit" | "reset";
    icon?: unknown;
    iconTrailing?: unknown;
  }>(),
  {
    variant: "primary",
    size: "md",
    disabled: false,
    loading: false,
    type: "button",
    icon: undefined,
    iconTrailing: undefined,
  },
);

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const buttonClasses = computed(() => [
  "app-button",
  `variant-${props.variant}`,
  `size-${props.size}`,
  {
    "is-disabled": props.disabled,
    "is-loading": props.loading,
  },
]);

const iconSize = computed(() => {
  switch (props.size) {
    case "sm":
      return 14;
    case "lg":
      return 18;
    default:
      return 16;
  }
});

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit("click", event);
  }
};
</script>

<template>
  <button :type="type" :class="buttonClasses" :disabled="disabled || loading" @click="handleClick">
    <span v-if="loading" class="button-icon">
      <PhSpinner :size="iconSize" class="spinner" />
    </span>
    <span v-else-if="icon" class="button-icon">
      <component :is="icon" :size="iconSize" />
    </span>
    <span v-if="$slots.default" class="button-text">
      <slot />
    </span>
    <span v-if="iconTrailing && !loading" class="button-icon">
      <component :is="iconTrailing" :size="iconSize" />
    </span>
  </button>
</template>

<style scoped>
/* ─── Base Button ──────────────────────────────────────────────── */
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  font-family: var(--font-mono);
  font-weight: 400;
  text-transform: lowercase;
  letter-spacing: var(--tracking-wider);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition:
    background-color var(--transition-base),
    color var(--transition-base),
    border-color var(--transition-base),
    box-shadow var(--transition-base);
  white-space: nowrap;
  user-select: none;
}

.button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.button-text {
  display: inline-block;
}

/* ─── Spinner ──────────────────────────────────────────────────── */
.spinner {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ─── Disabled State ───────────────────────────────────────────── */
.app-button.is-disabled,
.app-button.is-loading {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* ════════════════════════════════════════════════════════════════
   SIZES
   ════════════════════════════════════════════════════════════════ */

.size-sm {
  padding: 0.375rem 0.875rem;
  font-size: var(--text-xs);
}

.size-md {
  padding: 0.6rem 1.4rem;
  font-size: var(--text-sm);
}

.size-lg {
  padding: 0.75rem 1.75rem;
  font-size: var(--text-base);
}

/* ════════════════════════════════════════════════════════════════
   VARIANTS
   ════════════════════════════════════════════════════════════════ */

/* ─── Primary ──────────────────────────────────────────────────── */
.variant-primary {
  background-color: var(--color-text);
  color: var(--color-background-elevated);
  border: 1px solid var(--color-text);
}

.variant-primary:hover:not(.is-disabled):not(.is-loading) {
  color: var(--color-text);
  background-color: var(--color-primary);
  border: 1px solid var(--color-primary);
}

/* ─── Outline ──────────────────────────────────────────────────── */
.variant-outline {
  background-color: transparent;
  border: 1px solid var(--color-border-strong);
  color: var(--color-primary);
}

.variant-outline:hover:not(.is-disabled):not(.is-loading) {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-text);
}

/* ─── Ghost ────────────────────────────────────────────────────── */
.variant-ghost {
  background-color: transparent;
  border: none;
  color: var(--color-text-muted);
}

.variant-ghost:hover:not(.is-disabled):not(.is-loading) {
  background-color: var(--color-primary-subtle);
  color: var(--color-primary);
}
</style>
