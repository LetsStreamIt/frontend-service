<script>
export default {
  data() {
    return {
      isHidden: false
    }
  },

  computed: {
    cardClass() {
      return {
        card: true,
        'd-none': this.isHidden
      }
    },
    toggleChatChar() {
      if (this.isHidden) {
        return '▲'
      } else {
        return '▼'
      }
    }
  },

  methods: {
    toggleChat() {
      this.isHidden = !this.isHidden
    }
  }
}
</script>

<template>
  <div style="border-radius: 15px">
    <div
      class="card-header d-flex justify-content-between align-items-center p-3 bg-dark text-white border-bottom-0"
      style="border-top-left-radius: 15px; border-top-right-radius: 15px"
    >
      <i class="fas fa-angle-left"></i>
      <p class="mb-0 fw-bold">Live chat</p>
      <button @click="toggleChat" type="button" class="btn text-white fw-bold fs-5">
        {{ toggleChatChar }}
      </button>
    </div>

    <div :class="cardClass">
      <div class="d-flex flex-row justify-content-start mb-4">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
          alt="avatar 1"
          style="width: 45px; height: 100%"
        />
        <div
          class="p-3 ms-3"
          style="border-radius: 15px; background-color: rgba(57, 192, 237, 0.2)"
        >
          <p class="small mb-0">
            Hello and thank you for visiting MDBootstrap. Please click the video below.
          </p>
        </div>
      </div>

      <div class="d-flex flex-row justify-content-end mb-4">
        <div class="p-3 me-3 border" style="border-radius: 15px; background-color: #fbfbfb">
          <p class="small mb-0">Thank you, I really like your product.</p>
        </div>
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
          alt="avatar 1"
          style="width: 45px; height: 100%"
        />
      </div>

      <div class="d-flex flex-row justify-content-end mb-4">
        <div class="p-3 me-3 border" style="border-radius: 15px; background-color: #fbfbfb">
          <p class="small mb-0">Thank you, I really like your product.</p>
        </div>
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
          alt="avatar 1"
          style="width: 45px; height: 100%"
        />
      </div>

      <div class="d-flex flex-row justify-content-end mb-4">
        <div class="p-3 me-3 border" style="border-radius: 15px; background-color: #fbfbfb">
          <p class="small mb-0">Thank you, I really like your product.</p>
        </div>
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
          alt="avatar 1"
          style="width: 45px; height: 100%"
        />
      </div>

      <div class="d-flex flex-row justify-content-end mb-4">
        <div class="p-3 me-3 border" style="border-radius: 15px; background-color: #fbfbfb">
          <p class="small mb-0">Thank you, I really like your product.</p>
        </div>
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
          alt="avatar 1"
          style="width: 45px; height: 100%"
        />
      </div>

      <div class="d-flex flex-row justify-content-end mb-4">
        <div class="p-3 me-3 border" style="border-radius: 15px; background-color: #fbfbfb">
          <p class="small mb-0">Thank you, I really like your product.</p>
        </div>
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
          alt="avatar 1"
          style="width: 45px; height: 100%"
        />
      </div>
      <div class="d-flex flex-row justify-content-end mb-4">
        <div class="p-3 me-3 border" style="border-radius: 15px; background-color: #fbfbfb">
          <p class="small mb-0">Thank you, I really like your product.</p>
        </div>
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
          alt="avatar 1"
          style="width: 45px; height: 100%"
        />
      </div>
    </div>
  </div>
</template>

<style>
/* .col-fixed {
    display: flex;
    flex-direction: column;
    height: 300px;
}

.card-bottom {
    margin-top: auto;
} */
</style>
