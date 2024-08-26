<script>
import TextMessageComponent from '@/components/session/TextMessageComponent.vue'
import { socket } from '@/socket'
import { connectToChat } from './message'
import { Ack } from './message'
export default {
  components: {
    TextMessageComponent
  },

  data() {
    return {
      chatMessages: [],
      isHidden: false,
      room: 'myroom',
      inputMessage: ''
    }
  },

  computed: {
    cardClass() {
      return {
        'overflow-scroll': true,
        card: true,
        'd-none': this.isHidden
      }
    },
    toggleChatChar() {
      return this.isHidden ? '▲' : '▼'
    }
  },

  methods: {
    connect() {
      socket.connect()
    },

    disconnect() {
      socket.disconnect()
    },

    toggleChat() {
      this.isHidden = !this.isHidden
    },

    sendMessage() {
      if (this.inputMessage && this.room) {
        socket.emit('sendMessage', { message: this.inputMessage }, (ack) => {
          if (Ack[ack] == 'OK') {
            console.log('SENT')
          } else {
            console.log('FAILURE SEND')
          }
        })
        this.inputMessage = ''
      }
    },

    joinRoom() {
      if (this.room) {
        socket.emit('joinRoom', { room: this.room }, (ack) => {
          if (Ack[ack] == 'OK') {
            console.log('JOINED')
          } else {
            console.log('FAILURE')
          }
        })
      }
    }
  },

  mounted() {
    connectToChat(socket, this.chatMessages, this.joinRoom)
  }
}
</script>

<template>
  <div class="w-100" style="border-radius: 15px">
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

    <div :class="cardClass" style="max-height: 500px">
      <div v-for="message in chatMessages" :key="`${message.mame}-${message.surname}`">
        <TextMessageComponent
          :text="message.text"
          :name="message.name"
          :surname="message.surname"
        />
      </div>

      <input type="text" v-model="inputMessage" placeholder="Message" @keyup.enter="sendMessage" />
      <button @click="sendMessage">Send Message</button>
    </div>
  </div>
</template>
