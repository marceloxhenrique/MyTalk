import { FormEvent, useContext, useRef, useState } from "react";
import { socket } from "../Socket";
import { AuthContext } from "../contexts/AuthContext";

export default function UserInput({
  receiverId,
}: {
  receiverId: string | undefined;
}) {
  const user = useContext(AuthContext);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState("");

  const handlesubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.length > 0 && receiverId) {
      socket.emit("privateMessages", {
        senderId: user?.currentUser?.id,
        receiverId: receiverId,
        content: message,
      });
      setMessage("");
    }
    textareaRef.current?.focus();
  };
  return (
    <div className="flex h-[10vh] w-full bg-primaryColorlt p-3 md:p-4">
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          handlesubmit(e);
        }}
        className="flex h-full w-full flex-row gap-3"
      >
        <textarea
          ref={textareaRef}
          value={message}
          name=""
          id=""
          autoFocus
          className="h-full max-h-28 w-full resize-none rounded-md bg-gray-300 p-4 shadow-md shadow-zinc-400"
          placeholder="Message"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button
          type="submit"
          className="rounded-md bg-primaryColor px-4 hover:scale-[102%]"
        >
          <span className="material-symbols-outlined text-white shadow-zinc-400">
            send
          </span>
        </button>
      </form>
    </div>
  );
}
