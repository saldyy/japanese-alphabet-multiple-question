"use client";

import { AlphabetType, getQuestionsSet } from "@/app/utils";
import Counter from "@/components/Counter";
import Question from "@/components/Question";
import TestResult from "@/components/TestResult";
import { Question as QuestionType } from "@/types";
import { useEffect, useState } from "react";

const DEFAULT_TIME_LIMIT = 30; // seconds

function Game(props: { kana: AlphabetType }) {
  const { kana } = props;

  const [count, setCount] = useState(DEFAULT_TIME_LIMIT);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [answer, setAnswer] = useState<string | undefined>();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  const init = () => {
    setQuestions(getQuestionsSet(10, kana));
    setQuestionIndex(0);
    setCount(DEFAULT_TIME_LIMIT);
    setAnswer(undefined);
    setIsRunning(true);
    setPoints(0);
  };

  const onSubmitAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!questions.length) return;

    const target = event.target as HTMLButtonElement;
    if (target.value === questions[questionIndex]?.answer) {
      setPoints((prev) => prev + 1);
    }
    setAnswer(target.value);
    setIsRunning(false);
  };

  const onNextQuestion = () => {
    if (questionIndex < questions.length) {
      setQuestionIndex((prev) => prev + 1);
      setCount(DEFAULT_TIME_LIMIT);
      setAnswer(undefined);
      setIsRunning(true);
    }
  };

  if (questions.length > 0 && questionIndex >= questions.length) {
    return (
      <main className="flex max-h-screen flex-col items-center justify-between p-24">
        <TestResult point={points} onTryGainClicked={init} />
      </main>
    );
  }

  return (
    <div className="flex mt-20 flex-col items-center justify-between">
      <div>
        <h2>Points: {points}</h2>
        <Counter time={count} />
      </div>
      <div className="my-10">
        <h1 className="text-8xl">{questions[questionIndex]?.character}</h1>
      </div>
      <div>
        <Question
          question={questions[questionIndex]}
          onSubmitAnswer={onSubmitAnswer}
          selectedAnswer={answer}
        />
        {(answer !== undefined || count === 0) && (
          <div>
            <button onMouseDown={onNextQuestion}>Next question</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [kana, setKana] = useState<AlphabetType | null>();

  if (kana) {
    return <Game kana={kana} />
  }

  const renderContent = () => {
    if (kana) {
      return <Game kana={kana} />
    }

    return (
      <div className="flex flex-col">
        <button onMouseDown={() => setKana('hiragana')}>Hiragana</button>
        <button onMouseDown={() => setKana('katakana')}>Katakana</button>
      </div>
    )
  }

  return (
    <main className="flex max-h-screen flex-col items-center justify-between p-24">
      {renderContent()}
    </main>
  );
}
