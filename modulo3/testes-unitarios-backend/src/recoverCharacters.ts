import { Character } from "./validateCharacter";

export const recoverCharacters = (
  characters: Character[],
  validator: (character: Character) => boolean
): Character[] => {
  const validateEachCharacter = characters.map((character) => {
    return validator(character);
  });

  const checkValidate = validateEachCharacter.every((check) => {
    return check === true;
  });

  if (!checkValidate) {
    throw new Error("Invalid Character");
  }

  if (characters.length < 2) {
    throw new Error("Can only recover if there is minimal two characters");
  }

  const healedCharacters: Character[] = characters.map((character) => {
    if (character.hp !== 1500) character.hp = 1500;
    return character;
  });

  const response = healedCharacters;

  return response;
};
