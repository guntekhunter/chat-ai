/* eslint-disable react/no-unescaped-entities */
"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { chatApi } from "../fetch/chatAPI";
import Image from "next/image";

export default function ChatSender() {
  const [input, setInput] = useState<string>("");
  const [answer, setAnswer] = useState<{ chat: any; type: string }[]>([]);
  const [questions, setQuestions] = useState<{ chat: any; type: string }[]>([]);
  const [arrayChat, setArrayChat] = useState<{ chat: any; type: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const scrollRef = useRef(null);

  const makeRequest = async () => {
    setQuestions([...questions, { chat: input, type: "questions" }]);
    setIsLoading(true);
    try {
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
      const chatData = chat.choices[0].message.content;
      setAnswer([...answer, { chat: chatData, type: "answer" }]);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  console.log(isLoading);

  useEffect(() => {
    const combinedArray = [];

    const maxLength = Math.max(questions.length, answer.length);

    for (let i = 0; i < maxLength; i++) {
      if (i < questions.length) {
        combinedArray.push(questions[i]);
      }
      if (i < answer.length) {
        combinedArray.push(answer[i]);
      }
    }

    setArrayChat(combinedArray);
  }, [answer, questions]);

  return (
    <div className="w-full h-[100vh] relative bg-white">
      <div className="md:px-[3rem] px-[1rem] py-[1rem] shadow-md bg-white flex space-x-3">
        <Image src="./sona.svg" width={30} height={30} alt="" />
        <div>
          <p className="mt-[.2rem]">So'na</p>
          <p className={`${isLoading ? "" : "hidden"}`}>Typing....</p>
        </div>
      </div>
      <div className="w-full md:px-[3rem] px-[1rem] overflow-hidden h-[78vh] overflow-y-scroll scrollbar-thin scrollbar-track-[#FFFFFF] scrollbar-thumb-[#9BCDD2]">
        <div className="w-full flex items-end justify-start">
          <div className="w-full">
            <div className="w-full py-[1rem]">
              <div className="flex items-start justify-start">
                <div className="w-[30rem]">
                  <p className="flex items-start justify-start bg-[#FFEEBB] px-[2rem] py-[1rem] rounded-md">
                    Halo nama saya So'na tanyakan apapun dan saya pasti akan
                    menjawabkannya. Tapi kalo nda bisa kujawab, maumi diapa ges
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full space-y-[1rem]">
              {arrayChat.map((item, key) => (
                <div
                  key={key}
                  className={`${
                    item.type === "questions"
                      ? "flex items-end justify-end w-full"
                      : "flex items-start justify-start w-full"
                  } `}
                >
                  <div className="w-[30rem]">
                    <div
                      className={`rounded-md ${
                        item.type === "questions"
                          ? "flex items-end justify-end"
                          : "flex items-start justify-start bg-[#FFEEBB]"
                      }`}
                    >
                      <p
                        className={`rounded-md ${
                          item.type === "questions"
                            ? "flex items-end justify-end bg-[#9BCDD2] px-[2rem] py-[1rem]"
                            : "flex items-start justify-start bg-[#FFEEBB] px-[2rem] py-[1rem]"
                        }`}
                      >
                        {item.chat}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <div ref={scrollRef} /> */}
      </div>
      <div className="w-full absolute bottom-0">
        <div className="w-full p-[1rem] flex justify-between space-x-[1rem]">
          <input
            type="text"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            className="w-[90%] rounded-md px-5 shadow-md "
          />
          <button
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                makeRequest();
              }
            }}
            onClick={makeRequest}
            className="bg-[#9BCDD2] px-[2rem] py-[.5rem] rounded-md text-white shadow-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
    // <div className="w-full bg-yellow-200 h-[100vh] relative">
    //   <div className="relative h-full bg-gray-200">
    // <div className="">
    //   {arrayChat.map((item, key) => (
    //     <div
    //       key={key}
    //       className={`${item.type === "questions" ? "bg-blue-200" : ""}`}
    //     >
    //       {item.chat}
    //     </div>
    //   ))}
    // </div>
    //   </div>
    // <div className="w-full">
    //   <div className="w-full p-[1rem] flex justify-between">
    //     <input
    //       type="text"
    //       onChange={(e) => {
    //         setInput(e.target.value);
    //       }}
    //       className="w-[90%]"
    //     />
    //     <button
    //       onKeyDown={(event) => {
    //         if (event.key === "Enter") {
    //           makeRequest();
    //         }
    //       }}
    //       onClick={makeRequest}
    //       className="bg-yellow-200 px-[2rem] py-[.5rem]"
    //     >
    //       Send
    //     </button>
    //   </div>
    // </div>
    // </div>
  );
}
