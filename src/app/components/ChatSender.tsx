"use client";
import axios from "axios";
import React, { useState } from "react";
import { chatApi } from "../fetch/chatAPI";

export default function ChatSender() {
  const [input, setInput] = useState<string>("");
  const [answer, setAnswer] = useState<string[]>([]);

  const makeRequest = async () => {
    const res = await fetch("/api/message", {
      method: "POST",
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: input,
          },
        ],
      }),
    });

    const chat = await res.json();
    console.log(chat.choices[0].message.content);
    const chatData = chat.choices[0].message.content;
    setAnswer([...answer, chatData]);
    console.log("res");
  };
  // const makeRequest = async () => {
  //   const res = await chatApi(input);
  //   console.log(res);
  // };

  console.log(answer);

  return (
    <div>
      <div>
        {answer.map((item, key) => (
          <p key={key}>{item}</p>
        ))}
      </div>
      <div>
        <input
          type="text"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button onClick={makeRequest}>Send</button>
      </div>
    </div>
  );
}
