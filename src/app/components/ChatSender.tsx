"use client";
import axios from "axios";
import React, { useState } from "react";
import { chatApi } from "../fetch/chatAPI";

export default function ChatSender() {
  const [input, setInput] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

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
    setAnswer(chat.choices[0].message.content);
    console.log("res");
  };
  // const makeRequest = async () => {
  //   const res = await chatApi(input);
  //   console.log(res);
  // };

  return (
    <div>
      <div>
        <input
          type="text"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button onClick={makeRequest}>Send</button>
      </div>
      <p>{answer}</p>
    </div>
  );
}
