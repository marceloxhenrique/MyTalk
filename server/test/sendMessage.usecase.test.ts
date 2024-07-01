import SaveMessage from "../src/application/message/SaveMessage.usecase";
import MessageInMemory from "../src/infra/db/Message.inmemory";

describe("Test for send messages use case", () => {
  it("Should Send a message", async () => {
    const sendMessageInMemory = new MessageInMemory();
    const saveMessage = new SaveMessage(sendMessageInMemory);

    const message = {
      senderId: "3727f5de-303b-4bc9-81e0-111c0e97a84",
      receiverId: "e1c3f628-4ea5-4df6-a5ff-f7eb15fe4e88",
      content: "Hello world!",
    };

    await expect(saveMessage.execute(message)).resolves.not.toThrow();
  });
});
