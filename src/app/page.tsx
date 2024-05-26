"use client";

import { getQuestion } from "@/app/utils";
import Counter from "@/components/Counter";
import { Question } from "@/types";
import { MouseEvent, useEffect, useRef, useState } from "react";

const DEFAULT_TIME_LIMIT = 30; //seconds

export default function Home() {
  const counterRef = useRef<ReturnType<typeof setInterval> | undefined>();
  const pointRef = useRef<number>(0);
  const [count, setCount] = useState(DEFAULT_TIME_LIMIT);
  const [question, setQuestion] = useState<Question | undefined>();
  const [answer, setAnswer] = useState<string | undefined>();

  useEffect(() => {
    setQuestion(getQuestion({ characterType: "hiragana" }));

    counterRef.current = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(counterRef.current);
    };
  }, []);

  useEffect(() => {
    if (count) {
      return;
    }
    clearInterval(counterRef.current);
  }, [count]);

  useEffect(() => {
    if (typeof answer !== 'string') {
      return;
    }
    clearInterval(counterRef.current);
  }, [answer, question?.answer]);

  const onSubmitAnswer = (event: MouseEvent) => {
    const target = event.target as HTMLButtonElement;
    if (target.value === question?.answer) {
      pointRef.current += 1;
    }
    setAnswer(target.value);
  };

  const onNextQuestion = () => {
    clearInterval(counterRef.current);
    setCount(DEFAULT_TIME_LIMIT);
    setAnswer(undefined);
    counterRef.current = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    setQuestion(getQuestion({ characterType: "hiragana" }));

  }

  return (
    <main className="flex max-h-screen flex-col items-center justify-between p-24">
      <div>
        <h2>Points: {pointRef.current}</h2>
        <Counter time={count} />
      </div>
      <div className="my-10">
        <h1 className="text-8xl">{question?.character}</h1>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-4">
          {question?.options.map((option, index) => {
            let btnBckgrnd = 'bg-blue-500';
            if (typeof answer === 'string') {
              if (option === question?.answer) {
                btnBckgrnd = 'bg-green-500';
              } else if (option === answer) {
                btnBckgrnd = 'bg-red-500';
              }
            }
            return <button
              key={index}
              disabled={typeof answer === 'string'}
              value={option}
              className={`${btnBckgrnd} text-white p-4 rounded-md`}
              onMouseDown={onSubmitAnswer}
            >
              {option}
            </button>
          })}
        </div>
        {(typeof answer === 'string' || count === 0) && <div><button onMouseDown={onNextQuestion}>Next question</button></div>}
      </div>
    </main>
  );
}
