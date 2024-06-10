export default class Contact {
  private id: string;
  constructor(private email: string, private userId: string, private userName?: string) {
    if (!this.isValidEmail(email)) {
      throw new Error("Invalid Email format");
    }
    if (!this.isUserIdValid(userId)) {
      throw new Error("User Id Invalid");
    }

    this.id = crypto.randomUUID();
  }
  private isValidEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  private isUserIdValid(userId: string) {
    return userId.length > 1;
  }

  getData() {
    const contactData = {
      id: this.id,
      email: this.email,
      userId: this.userId,
      userName: this.userName,
    };
    return contactData;
  }
}
