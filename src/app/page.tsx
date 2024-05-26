'use client'

import { getQuestion } from "@/app/utils";
import { Question } from "@/types";
import { MouseEvent, useEffect, useRef, useState } from "react";

export default function Home() {
  const counterRef = useRef<ReturnType<typeof setInterval> | undefined>();
  const [count, setCount] = useState(30);
  const [question, setQuestion] = useState<Question | undefined>();

  useEffect(() => {
    counterRef.current = setInterval(() => {
      console.log('inhere')
      setCount((prev) => prev - 1);
    }, 1000)

    return () => {
      clearInterval(counterRef.current);
    }
  }, [])

  useEffect(() => {
    if (count) {
      return
    }
    clearInterval(counterRef.current);
  }, [count])


  useEffect(() => {
    setQuestion(getQuestion({ characterType: 'hiragana' }))
  }, [])

  const onSubmitAnswer = (event: MouseEvent) => {
    const target = event.target as HTMLButtonElement
    console.log(target.value)
    if (target.value === question?.answer) {
      console.log('correct')
      setQuestion(getQuestion({ characterType: 'hiragana' }))
      clearInterval(counterRef.current);
      setCount(30);
      counterRef.current = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000)
    }
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>{count}</h1>
      </div>
      <p>{question?.character}</p>
      <div className="grid grid-cols-2 gap-4">
        {question?.options.map((option, index) => (
          <button key={index} value={option} className="bg-blue-500 text-white p-4 rounded-md" onMouseDown={onSubmitAnswer}>{option}</button>
        ))}
      </div>
    </main>
  );
}
