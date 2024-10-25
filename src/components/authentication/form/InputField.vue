<template>
  <input
    :id="id"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    :autofocus="autofocus"
    :required="required"
    @input="onInput"
    :class="['form-control', { 'is-invalid': hasErrors }]"
  />
  <div v-if="hasErrors" class="invalid-feedback">
    <ul class="mb-2 no-bullets text-start">
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
/**
 * @file InputField.vue
 * @module InputField
 * Reusable input field component.
 */
import { toRefs, computed } from 'vue'

const props = defineProps({
  /**
   * The unique identifier of the input field.
   */
  id: {
    type: String,
    required: true
  },
  /**
   * The label of the input field.
   */
  label: {
    type: String,
    required: true
  },
  /**
   * The type of the input field.
   */
  type: {
    type: String,
    default: 'text'
  },
  /**
   * The placeholder of the input field.
   */
  placeholder: {
    type: String,
    default: ''
  },
  /**
   * The value of the input field.
   */
  modelValue: {
    type: String,
    default: ''
  },
  /**
   * The autofocus state of the input field.
   */
  autofocus: {
    type: Boolean,
    default: false
  },
  /**
   * The required state of the input field.
   */
  required: {
    type: Boolean,
    default: false
  },
  /**
   * A list of errors to display.
   */
  errors: {
    type: Array as () => string[],
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const { modelValue } = toRefs(props)

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

const hasErrors = computed(() => props.errors.length > 0)
</script>

<style scoped lang="scss">
ul.no-bullets {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
