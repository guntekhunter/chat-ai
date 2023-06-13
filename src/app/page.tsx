// import { prisma } from "@/db";
// import { chatApi } from "./fetch/chatAPI";
import ChatSection from "./components/ChatSection";
import InputCompnent from "./components/InputCompnent";

// async function sendMessage(data: FormData) {
//   "use server";

//   const chat = data.get("chat")?.valueOf();

//   if (typeof chat !== "string" || chat.length === 0) {
//     throw new Error("Invalid input");
//   }
//   const res = await chatApi(chat);
//   console.log(res);

//   await prisma.chat.create({ data: { chat: res } });
// }

export default async function Home() {
  return (
    <div>
      <InputCompnent />
      <ChatSection />
    </div>
  );
}
