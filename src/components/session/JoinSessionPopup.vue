<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const sessionId = ref('')
const router = useRouter()

const emit = defineEmits<{
  joiningSession: []
}>()

const joinSession = () => {
  if (sessionId.value) {
    // Programmatically navigate to the session route
    router.push(`/session/${sessionId.value}`)
    emit('joiningSession')
  }
}
</script>

<template>
  <div class="modal" id="joinSessionPopup" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content text-dark" aria-hidden="true">
        <div class="modal-header">
          <h5 class="modal-title">Join an existing Session</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="joinSession">
            <div class="form-group">
              <label for="sessionIdInput">Session ID:</label>

              <input
                class="form-control mt-2"
                id="sessionIdInput"
                placeholder="Enter Session ID"
                v-model="sessionId"
              />
            </div>

            <div class="d-flex flex-row-reverse mt-2">
              <button type="submit" class="btn btn-primary justify-content-end">
                Join Session
                <!-- <RouterLink :to="`/session/${sessionId}`" class="nav-link">Join Session</RouterLink> -->
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
