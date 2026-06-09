export interface ChatMessage {
  id?: number;
  sender: string;
  receiver: string;
  message: string;
  messageType: string; // TEXT, IMAGE, FILE, BOT
  fileUrl?: string;
  isRead?: boolean;
  timestamp: Date;
  roomId?: string;
}

export interface ChatRoom {
  user: string;
  lastMessage: string;
  unreadCount: number;
}

export interface FileUploadResponse {
  fileName: string;
  fileUrl: string;
}
