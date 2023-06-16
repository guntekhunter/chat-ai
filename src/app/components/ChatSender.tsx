/* eslint-disable react/no-unescaped-entities */
"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ChatSender() {
  const [input, setInput] = useState<string>("");
  const [answer, setAnswer] = useState<{ chat: any; type: string }[]>([]);
  const [questions, setQuestions] = useState<{ chat: any; type: string }[]>([]);
  const [arrayChat, setArrayChat] = useState<{ chat: any; type: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const scrollRef = useRef(null);

  const makeRequest = async () => {
    setQuestions([...questions, { chat: input, type: "questions" }]);
    setInput("");
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
    <div className="w-full h-[100vh] relative bg-[#EFEAE2]">
      <div className="md:px-[3rem] px-[1rem] py-[.5rem] shadow-md bg-[#F0F2F5] flex space-x-3 sticky top-0">
        <Image src="./sona.svg" width={30} height={30} alt="" />
        <div>
          <p className="mt-[.2rem]">So'na</p>
          <p
            className={`${
              isLoading ? "" : "hidden"
            } text-[.7rem] animate-pulse`}
          >
            Typing....
          </p>
        </div>
      </div>
      <div
        className={`flex flex-col-reverse w-full md:px-[3rem] px-[1rem] pt-[1rem] md:pb-[4rem] pb-[2rem] bg-[#EFEAE2] overflow-hidden h-[85vh] overflow-y-scroll scrollbar-thin scrollbar-track-[#FFFFFF] scrollbar-thumb-[#9BCDD2]`}
      >
        <div className="w-full ">
          <div className="w-full h-full">
            <div className="w-full py-[1rem]">
              <div className="flex items-start justify-start">
                <div className="md:w-[30rem] w-[17rem]">
                  <p className="flex items-start justify-start shadow-md bg-white px-[2rem] py-[1rem] rounded-md ">
                    Halo nama saya So'na tanyakan apapun dan saya pasti akan
                    menjawabkannya. Tapi kalo nda bisa kujawab, ya maumi diapa
                    ges
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
                  <div className="md:w-[30rem] w-[17rem]">
                    <div
                      className={`rounded-md ${
                        item.type === "questions"
                          ? "flex items-end justify-end"
                          : "flex items-start justify-start"
                      }`}
                    >
                      <p
                        className={`rounded-md ${
                          item.type === "questions"
                            ? "flex items-end justify-end shadow-md bg-[#D9FDD3] px-[2rem] py-[1rem]"
                            : "flex items-start justify-start shadow-md bg-white px-[2rem] py-[1rem]"
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
      </div>
      <div className="w-full absolute bottom-0">
        <div className="bg-[#F0F2F5]">
          <div className="w-full p-[1rem] flex justify-between space-x-[1rem] ">
            <textarea
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  makeRequest();
                }
              }}
              placeholder="Ketik Pesan"
              value={input}
              rows={1}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              className="w-full p-[.5rem] px-[1rem] h-[2.5rem] resize-none disabled:opacity-50 block border-0 focus:ring-0 sm:leading-6 rounded-md focus:outline-none focus:border-none scrollbar-thin scrollbar-track-[#FFFFFF] scrollbar-thumb-[#9BCDD2]"
            />
            <button
              onClick={makeRequest}
              className="bg-[#9BCDD2] px-[1rem] py-[.5rem] rounded-md text-white shadow-md"
            >
              <Image src="./send.svg" width={30} height={30} alt="" />
            </button>
          </div>
          <div className="w-full flex justify-around text-[.8rem] pb-[1rem]">
            <div className="w-80%">
              <p>
                Developed by{" "}
                <Link
                  href="https://portfolio-neon-three-38.vercel.app/"
                  className="font-bold"
                >
                  Guntek
                </Link>{" "}
                , powered by{" "}
                <Link href="https://openai.com/" className="font-bold">
                  OpenAI
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
