import { recoverCharacters } from "../src/recoverCharacters";
import { Character } from "../src/validateCharacter";

describe("Testing recoverCharacter function", () => {
  test("Should return error if only one character was passed", () => {
    const validatorMock = jest.fn(() => {
      return true;
    });

    const character1: Character = {
      name: "Ichigo Kurosaki",
      hp: 1500,
      defense: 600,
      strength: 400,
    };

    const characters: Character[] = [character1];

    try {
      recoverCharacters(characters, validatorMock);
    } catch (error: any) {
      expect(error.message).toBe(
        "Can only recover if there is minimal two characters"
      );
    }
  });

  test("Should return both character with 1500 hp", () => {
    const validatorMock = jest.fn(() => {
      return true;
    });

    const character1: Character = {
      name: "Ichigo Kurosaki",
      hp: 1300,
      defense: 600,
      strength: 400,
    };

    const character2: Character = {
      name: "Byakuya Kuchiki",
      hp: 1300,
      defense: 700,
      strength: 600,
    };

    const characters: Character[] = [character1, character2];

    recoverCharacters(characters, validatorMock);

    expect(character1.hp === 1500 && character2.hp).toBe(1500);
  });

  test("Should return error with invalid character", () => {
    const validatorMock = jest.fn(() => {
      return false;
    });

    const character1: Character = {
      name: "",
      hp: 1300,
      defense: 600,
      strength: 400,
    };

    const character2: Character = {
      name: "Byakuya Kuchiki",
      hp: 1300,
      defense: 700,
      strength: 600,
    };

    const characters: Character[] = [character1, character2];

    try {
      recoverCharacters(characters, validatorMock);
    } catch (error: any) {
      expect(error.message).toBe("Invalid Character");
    }
  });

  test("Should return an array with both characters full hp", () => {
    const validatorMock = jest.fn(() => {
      return true;
    });

    const character1: Character = {
      name: "Ichigo Kurosaki",
      hp: 1300,
      defense: 600,
      strength: 400,
    };

    const character2: Character = {
      name: "Byakuya Kuchiki",
      hp: 1300,
      defense: 700,
      strength: 600,
    };

    const characters: Character[] = [character1, character2];

    const response: Character[] = recoverCharacters(characters, validatorMock);

    expect(response).toEqual([
      {
        name: "Ichigo Kurosaki",
        hp: 1500,
        defense: 600,
        strength: 400,
      },
      { name: "Byakuya Kuchiki", hp: 1500, defense: 700, strength: 600 },
    ]);
  });

  test("Should call two time the validate function", () => {
    const validatorMock = jest.fn(() => {
      return true;
    });

    const character1: Character = {
      name: "Ichigo Kurosaki",
      hp: 1300,
      defense: 600,
      strength: 400,
    };

    const character2: Character = {
      name: "Byakuya Kuchiki",
      hp: 1300,
      defense: 700,
      strength: 600,
    };

    const characters: Character[] = [character1, character2];

    recoverCharacters(characters, validatorMock);
    expect(character1.hp && character2.hp).toBe(1500);
    expect(validatorMock).toBeCalled();
    expect(validatorMock).toBeCalledTimes(2);
    expect(validatorMock).toHaveReturnedTimes(2);
  });
});
