import { increaseCharacterStrength } from "../src/increaseCharacterStrength";
import { Character } from "../src/validateCharacter";

describe("Testing increaseCharacterStrength function", () => {
  test("Should increase character strength", () => {
    const validatorMock = jest.fn(() => {
      return true;
    });

    const character1: Character = {
      name: "Ichigo Kurosaki",
      hp: 1500,
      defense: 400,
      strength: 600,
    };

    increaseCharacterStrength(character1, 800, validatorMock);

    expect(character1.strength).toBe(800);
  });

  test("Should return error: Invalid Character", () => {
    const validatorMock = jest.fn(() => {
      return false;
    });

    const character1: Character = {
      name: "",
      hp: 1500,
      defense: 400,
      strength: 600,
    };

    try {
      increaseCharacterStrength(character1, 800, validatorMock);
    } catch (error: any) {
      expect(error.message).toBe("Invalid Character");
    }
  });

  test("Should return error: New strength should not be lower than character strength", () => {
    const validatorMock = jest.fn(() => {
      return true;
    });

    const character1: Character = {
      name: "Ichigo Kurosaki",
      hp: 1500,
      defense: 400,
      strength: 800,
    };

    try {
      increaseCharacterStrength(character1, 600, validatorMock);
    } catch (error: any) {
      expect(error.message).toBe(
        "New strength should not be lower than character strength"
      );
    }
  });

  test("Should call one time the validate function", () => {
    const validatorMock = jest.fn(() => {
      return true;
    });

    const character1: Character = {
      name: "Ichigo Kurosaki",
      hp: 1500,
      defense: 400,
      strength: 600,
    };

    increaseCharacterStrength(character1, 800, validatorMock);
    expect(character1.strength).toBe(800);
    expect(validatorMock).toBeCalled();
    expect(validatorMock).toBeCalledTimes(1);
    expect(validatorMock).toHaveReturnedTimes(1);
  });
});
