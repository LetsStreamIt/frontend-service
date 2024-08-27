import { Socket } from 'socket.io-client'
import { NotificationMessage, TextMessage } from './model/message'
import {
  NotificationMessageDeserializer,
  TextMessageDeserializer
} from './model/presentation/deserialization/messageDeserializer'
import { Notification } from './model/message'

export enum Ack {
  OK,
  FAILURE
}

export function connectToChat(socket: Socket, messages, joinRoom) {
  socket.on('textMessage', (data) => {
    const message: TextMessage = new TextMessageDeserializer().deserialize(JSON.parse(data))
    messages.push({
      text: message.getContent,
      name: message.getSender.value.getX,
      surname: message.getSender.value.getY
    })
  })

  socket.on('chatUpdate', (data) => {
    console.log('chat update', JSON.parse(data))
    JSON.parse(data).forEach((element) => {
      const message: TextMessage = new TextMessageDeserializer().deserialize(element)
      messages.push({
        text: message.getContent,
        name: message.getSender.value.getX,
        surname: message.getSender.value.getY
      })
    })
  })

  socket.on('notificationMessage', (data) => {
    const notificationMessage: NotificationMessage =
      new NotificationMessageDeserializer().deserialize(JSON.parse(data))
    messages.push({
      text:
        notificationMessage.getContent == Notification.JOINROOM
          ? 'Joined the room'
          : 'Left the room',
      name: notificationMessage.getSender.value.getX,
      surname: notificationMessage.getSender.value.getY
    })
  })

  socket.connect()
  socket.emit('userToken', { token: 'token1' }, (success) => {
    console.log('success', success)

    if (Ack[success] == 'OK') {
      console.log('joining room')
      joinRoom()
    } else {
      console.log('already joined in another session')
    }

    // if ( == Ack.OK) {
    //
  })

  window.addEventListener('beforeunload', () => {
    socket.emit('leaveRoom')
  })
}
