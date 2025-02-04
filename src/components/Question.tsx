import { MouseEvent } from 'react';
import { Question as QuestionType } from "@/types";

type Props = {
  question: QuestionType;
  selectedAnswer?: string;
  onSubmitAnswer: (event: MouseEvent<HTMLButtonElement>) => void;
}
export default function Question({ question, selectedAnswer, onSubmitAnswer }: Props) {

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {question?.options.map((option, index) => {
          let btnBackground = 'bg-blue-500';
          if (typeof selectedAnswer === 'string') {
            if (option === question?.answer) {
              btnBackground = 'bg-green-500';
            } else if (option === selectedAnswer) {
              btnBackground = 'bg-red-500';
            }
          }
          return <button
            key={index}
            disabled={typeof selectedAnswer === 'string'}
            value={option}
            className={`${btnBackground} text-white p-4 rounded-md`}
            onMouseDown={onSubmitAnswer}
          >
            {option}
          </button>
        })}
      </div>
    </div>
  );
}
