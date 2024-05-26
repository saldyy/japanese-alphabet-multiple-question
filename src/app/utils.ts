import { Question } from "@/types";
import Alphabet from "./alphabet";

type CharacterType = "hiragana" | "katakana" | "kanji";

export const getQuestion = ({
  characterType = "hiragana",
}: {
  characterType: CharacterType;
}): Question => {
  if (!Alphabet[characterType]) {
    throw new Error("Invalid character type");
  }

  const character = getRandomCharacters({ characterType });
  const answer = Alphabet[characterType]![character];
  const options = getRandomCharacterPronounces({
    amount: 4,
    excludePronounce: answer,
    characterType,
  });

  return {
    character,
    answer,
    options,
  };
};

const getRandomCharacters = ({
  characterType = "hiragana",
}: {
  characterType: CharacterType;
}): string => {
  const characters = Alphabet[characterType];
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
  characterType: CharacterType;
}): string[] => {
  // Get 3 random index in an array
  const characters = Alphabet[characterType];
  if (!characters) {
    throw new Error("Invalid character type");
  }

  const pronounces = shuffleArray(Object.values(characters));
  const result = [answerPronounce];
  for (let i = 0; i < amount - 1; i++) {
    if (pronounces[i] === answerPronounce) {
      continue;
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
