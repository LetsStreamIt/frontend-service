<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref('')
const joinSession = ref(false)
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
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Session ID:</label>

              <input
                type="email"
                class="form-control mt-2"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Session ID"
                v-model="inputValue"
              />
            </div>

            <div class="d-flex flex-row-reverse mt-2">
              <button type="submit" class="btn btn-primary justify-content-end">
                <RouterLink :to="`/session/${inputValue}`" class="nav-link">Session</RouterLink>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
