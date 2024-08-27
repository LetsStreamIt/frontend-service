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
    <ul class="mb-2 text-start">
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { toRefs, computed } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  },
  autofocus: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  errors: {
    type: Array as () => string[],
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const { modelValue } = toRefs(props)

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

const hasErrors = computed(() => props.errors.length > 0)
</script>
