import crypto from "crypto";

export default class Message {
  constructor(
    private senderId: string,
    private receiverId: string,
    private content: string,
    private id?: string,
    private sentAt?: Date
  ) {
    this.sentAt = sentAt ?? new Date();
    this.id = id ?? crypto.randomUUID();
    if (!this.isContentValid) {
      throw new Error("No messages empty allowd");
    }
  }

  isContentValid(content: string) {
    return content.length > 0;
  }

  getData() {
    const message = {
      senderId: this.senderId,
      receiverId: this.receiverId,
      content: this.content,
      sentAt: this.sentAt,
      id: this.id,
    };
    return message;
  }
}
