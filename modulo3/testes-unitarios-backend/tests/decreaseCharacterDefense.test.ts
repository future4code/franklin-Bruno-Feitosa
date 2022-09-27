import { decreaseCharacterDefense } from "../src/decreaseCharacterDefense";
import { Character } from "../src/validateCharacter";

describe("Testing decreaseCharacterDefense function", () => {
  test("Should decrease character defense", () => {
    const validatorMock = jest.fn(() => {
      return true;
    });

    const character1: Character = {
      name: "Ichigo Kurosaki",
      hp: 1500,
      defense: 400,
      strength: 700,
    };

    decreaseCharacterDefense(character1, 300, validatorMock);

    expect(character1.defense).toBe(300);
  });

  test("Should return error: Invalid Character", () => {
    const validatorMock = jest.fn(() => {
      return false;
    });

    const character1: Character = {
      name: "",
      hp: 1500,
      defense: 400,
      strength: 700,
    };

    try {
      decreaseCharacterDefense(character1, 300, validatorMock);
    } catch (error: any) {
      expect(error.message).toBe("Invalid Character");
    }
  });

  test("Should return error: New defense should not be higher than character defense", () => {
    const validatorMock = jest.fn(() => {
      return true;
    });

    const character1: Character = {
      name: "Ichigo Kurosaki",
      hp: 1500,
      defense: 400,
      strength: 700,
    };

    try {
      decreaseCharacterDefense(character1, 401, validatorMock);
    } catch (error: any) {
      expect(error.message).toBe(
        "New defense should not be higher than character defense"
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
      strength: 700,
    };

    decreaseCharacterDefense(character1, 350, validatorMock);
    expect(character1.defense).toBe(350);
    expect(validatorMock).toBeCalled();
    expect(validatorMock).toBeCalledTimes(1);
    expect(validatorMock).toHaveReturnedTimes(1);
  });
});
