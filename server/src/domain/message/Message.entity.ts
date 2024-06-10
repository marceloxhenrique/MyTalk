import crypto from "crypto";

export default class Message {
  private id: string;
  constructor(private senderId: string, private receiverId: string, private content: string) {
    this.id = crypto.randomUUID();
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
    };
    return message;
  }
}
