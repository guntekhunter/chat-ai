import React from "react";
import { chatApi } from "../fetch/chatAPI";
import { prisma } from "@/db";

async function sendMessage(data: FormData) {
  "use server";

  const chat = data.get("chat")?.valueOf();

  if (typeof chat !== "string" || chat.length === 0) {
    throw new Error("Invalid input");
  }
  const res = await chatApi(chat);
  console.log(res);

  await prisma.chat.create({ data: { chat: res } });
}

export default function InputCompnent() {
  return (
    <form action={sendMessage}>
      <input type="text" name="chat" />
      <button>send</button>
    </form>
  );
}
