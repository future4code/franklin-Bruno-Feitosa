import { Character } from "./validateCharacter";

export const decreaseCharacterDefense = (
  character: Character,
  newDefense: number,
  validate: (character: Character) => boolean
): void => {
  if (!validate(character)) {
    throw new Error("Invalid Character");
  }

  if (newDefense > character.defense) {
    throw new Error("New defense should not be higher than character defense");
  }

  character.defense = newDefense;
};
