<script setup lang="ts">
const emit = defineEmits<{
  closeJoinSessionPopup: []
}>()

function closePopup() {
  emit('closeJoinSessionPopup')
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
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Session ID:</label>

              <input
                type="email"
                class="form-control mt-2"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Session ID"
              />
            </div>
            <div class="d-flex flex-row-reverse mt-2">
              <button type="submit" class="btn btn-primary justify-content-end">
                Join Session
              </button>
            </div>
          </form>
        </div>
        <!-- <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        @click="closePopup">Close</button>
                    <button type="button" class="btn btn-secondary">Save changes</button>
                </div> -->
      </div>
    </div>
  </div>
</template>
