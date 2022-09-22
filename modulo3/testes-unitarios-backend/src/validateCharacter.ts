export interface Character {
  name: string;
  hp: number;
  defense: number;
  strength: number;
}

export const validateCharacter = (character: Character): boolean => {
  if (
    !character.name ||
    character.name.length === 0 ||
    !character.hp ||
    !character.defense ||
    !character.strength
  ) {
    return false;
  }

  if (character.hp <= 0 || character.defense <= 0 || character.strength <= 0) {
    return false;
  }

  return true;
};
