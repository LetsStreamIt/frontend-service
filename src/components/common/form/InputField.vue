<template>
  <div class="mb-3">
    <label :for="id" class="form-label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      @blur="onBlur"
      :class="['form-control', { 'is-invalid': hasErrors }]"
    />
    <div v-if="hasErrors" class="invalid-feedback">
      <ul class="mb-0">
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, toRefs } from 'vue'

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

function onBlur() {
  emit('update:modelValue', modelValue.value) // Triggers reactivity in parent
}

const hasErrors = props.errors.length > 0
</script>
