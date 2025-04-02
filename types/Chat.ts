export interface MessageDTO {
  id: number;
  senderEmail: string;
  senderId: number;
  matchId: number;
  content: string;
  createdAt: string;
}

export interface ChatUser {
  _id: number; // Underscore prefix is required by the Chat component
  name: string;
}

export interface ChatMessage {
  _id: number; // Underscore prefix is required by the Chat component
  text: string;
  createdAt: Date;
  user: ChatUser;
}
