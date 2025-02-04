import { Question } from "@/types";
import Alphabet from "./alphabet";

type AlphabetType = "hiragana" | "katakana" | "kanji";

export const getQuestionsSet = (len: number, alphabetType: AlphabetType = "hiragana"): Question[] => {
  const result: Question[] = [];
  for (let i = 0; i < len; i++) {
    result.push(getQuestion({ alphabetType }))
  }

  return result;
}

export const getQuestion = ({
  alphabetType: alphabetType = "hiragana",
}: {
  alphabetType: AlphabetType;
}): Question => {
  if (!Alphabet[alphabetType]) {
    throw new Error("Invalid character type");
  }

  const character = getRandomCharacters({ alphabetType: alphabetType });
  const answer = Alphabet[alphabetType]![character];
  const options = getRandomCharacterPronounces({
    amount: 4,
    excludePronounce: answer,
    characterType: alphabetType,
  });

  return {
    character,
    answer,
    options,
  };
};

const getRandomCharacters = ({
  alphabetType = "hiragana",
}: {
  alphabetType: AlphabetType;
}): string => {
  const characters = Alphabet[alphabetType];
  if (!characters) {
    throw new Error("Invalid character type");
  }
  const charactersArray = Object.keys(characters);
  const randomIndex = Math.floor(Math.random() * charactersArray.length);

  return charactersArray[randomIndex];
};

const getRandomCharacterPronounces = ({
  amount = 4,
  excludePronounce: answerPronounce,
  characterType,
}: {
  amount: number;
  excludePronounce: string;
  characterType: AlphabetType;
}): string[] => {
  // Get 3 random index in an array
  const characters = Alphabet[characterType];
  if (!characters) {
    throw new Error("Invalid character type");
  }

  const pronounces = shuffleArray(Object.values(characters));
  const result = [answerPronounce];
  for (let i = 0; i < pronounces.length; i++) {
    if (pronounces[i] === answerPronounce) {
      continue;
    }
    if (result.length === amount) {
      break;
    }
    result.push(pronounces[i]);
  }
  return shuffleArray(result);
};

const shuffleArray = <T>(array: T[]): T[] => {
  const arr = [...array];
  const n = arr.length;

  // Fisher-Yates Shuffle algorithm
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
