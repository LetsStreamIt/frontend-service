import { MessageContent } from '../../../components/session/model/message'
import { Message } from '../../../components/session/model/message'

export interface ChatController {
  connectToChat(recvMessageCallback: (message: Message<MessageContent>) => void): Promise<void>
  sendMessage(message: string): Promise<void>
  disconnectToChat(): Promise<void>
}
