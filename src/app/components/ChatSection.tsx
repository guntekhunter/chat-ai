import { prisma } from "@/db";

//@ts-ignore
export default async function ChatSection() {
  const chat = await prisma.chat.findMany();
  return (
    <div>
      {chat.map((item, key) => (
        <div key={key}>{item.chat}</div>
      ))}
    </div>
  );
}
