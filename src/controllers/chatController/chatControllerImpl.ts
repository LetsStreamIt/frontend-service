// import { io } from "socket.io-client";
// import { ChatController } from "./chatController";

// export class ChatControllerImpl
//   implements ChatController
// {

//     socket;
//     sessionId;

//     constructor(url: string) {
//         this.socket = io(url, {
//             withCredentials: true,
//             extraHeaders: {
//               "my-custom-header": "abcd"
//             }
//           });
//     }

//     /**
//      * Join a Chat by specifying the session Id.
//      * @param sessionId
//      */
//     async joinChat(sessionId: number) {
//         this.sessionId = sessionId;
//         this.socket.join(sessionId);
//     }

//     /**
//      * Disconnect to the previously joined session.
//      */
//     // disconnectChat(): Promise<ChatResponse>;

//     /**
//      * Send message to the Chat
//      */
//     sendMessage() {
//         this.socket.to(this)
//     } // Promise<ChatResponse>;

//   }
