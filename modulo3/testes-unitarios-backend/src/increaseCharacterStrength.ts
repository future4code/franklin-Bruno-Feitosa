import { Character } from "./validateCharacter";

export const increaseCharacterStrength = (
  character: Character,
  newStrength: number,
  validate: (character: Character) => boolean
): void => {
  if (!validate(character)) {
    throw new Error("Invalid Character");
  }

  if (newStrength < character.strength) {
    throw new Error("New strength should not be lower than character strength");
  }

  character.strength = newStrength;
};
