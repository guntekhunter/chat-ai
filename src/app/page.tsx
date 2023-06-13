import { chatApi } from "./fetch/chatAPI";

async function sendMessage(data: FormData) {
  "use server";

  const chat = data.get("chat")?.valueOf();

  if (typeof chat !== "string" || chat.length === 0) {
    throw new Error("Invalid input");
  }
  const res = await chatApi(chat);
  console.log(res);
}

export default async function Home() {
  return (
    <div>
      <form action={sendMessage}>
        <input type="text" name="chat" />
        <button>send</button>
      </form>
    </div>
  );
}
