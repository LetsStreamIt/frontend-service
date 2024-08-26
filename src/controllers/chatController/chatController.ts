export interface ChatController {
  /**
   * Join a Chat by specifying the session Id.
   * @param sessionId
   */
  joinChat(sessionId: number): void //Promise<ChatResponse>;

  /**
   * Disconnect to the previously joined session.
   */
  // disconnectChat(): Promise<ChatResponse>;

  /**
   * Send message to the Chat
   */
  sendMessage(): void //Promise<ChatResponse>;
}
