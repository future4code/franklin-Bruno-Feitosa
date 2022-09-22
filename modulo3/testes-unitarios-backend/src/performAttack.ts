import { Character } from "./validateCharacter";

export const performAttack = (
  attacker: Character,
  defender: Character,
  validator: (character: Character) => boolean
): Character[] => {
  if (!validator(attacker) || !validator(defender)) {
    throw new Error("Invalid Character");
  }

  if (attacker.strength > defender.defense) {
    defender.hp -= attacker.strength - defender.defense;
  }

  return [attacker, defender];
};
