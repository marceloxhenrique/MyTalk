export default class Contact {
  constructor(
    private contactId: string,
    private email: string,
    private userId: string,
    private contactName?: string,
    private id?: string
  ) {
    if (!this.isValidEmail(email)) {
      throw new Error("Invalid Email format");
    }
    if (!this.isUserIdValid(userId)) {
      throw new Error("User Id Invalid");
    }

    this.id = id ?? crypto.randomUUID();
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
      contactId: this.contactId,
      email: this.email,
      contactName: this.contactName,
      userId: this.userId,
    };
    return contactData;
  }
}
