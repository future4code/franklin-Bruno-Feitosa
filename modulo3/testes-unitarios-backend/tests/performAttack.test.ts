import { performAttack } from "../src/performAttack";
import { Character, validateCharacter } from "../src/validateCharacter";

describe("Testing performAttack function", () => {
  test("Successful mock test", () => {
    const result = jest.fn(() => {
      return true;
    });
    expect(result()).toBe(true);
  });

  test("Unsuccessful mock test", () => {
    const result = jest.fn((): boolean => {
      return false;
    });
    expect(result()).toBe(false);
  });

  test("Should perform attack", () => {
    const validatorMock = jest.fn((character: Character): boolean => {
      return true;
    });

    const attacker: Character = {
      name: "Ichigo Kurosaki",
      hp: 1500,
      defense: 400,
      strength: 700,
    };

    const defender: Character = {
      name: "Byakuya Kuchiki",
      hp: 1500,
      defense: 500,
      strength: 650,
    };

    performAttack(attacker, defender, validatorMock);

    expect(defender.hp).toBe(1300);
    expect(validatorMock).toHaveBeenCalled();
    expect(validatorMock).toHaveBeenCalledTimes(2);
    expect(validatorMock).toHaveReturnedTimes(2);
  });

  test("Should return invalid character error", () => {
    expect.assertions(4);
    const validatorMock = jest.fn((character: Character): boolean => {
      return false;
    });

    const attacker: Character = {
      name: "",
      hp: 1500,
      defense: 400,
      strength: 700,
    };

    const defender: Character = {
      name: "Byakuya Kuchiki",
      hp: 1500,
      defense: 500,
      strength: 650,
    };

    try {
      performAttack(attacker, defender, validatorMock);
    } catch (error: any) {
      expect(error.message).toBe("Invalid Character");
      expect(validatorMock).toHaveBeenCalled();
      expect(validatorMock).toHaveBeenCalledTimes(1);
      expect(validatorMock).toHaveReturnedTimes(1);
    }
  });

  test("Shouldn't perform attack (false mock)", () => {
    const validatorMock = jest.fn((character: Character): boolean => {
      return false;
    });

    const attacker: Character = {
      name: "Ichigo Kurosaki",
      hp: 1500,
      defense: 400,
      strength: 700,
    };

    const defender: Character = {
      name: "Byakuya Kuchiki",
      hp: 1500,
      defense: 500,
      strength: 650,
    };
    try {
      performAttack(attacker, defender, validatorMock);
    } catch (error: any) {
      expect(error.message).toBe("Invalid Character");
      expect(validatorMock).toHaveBeenCalled();
      expect(validatorMock).toHaveBeenCalledTimes(1);
      expect(validatorMock).toHaveReturnedTimes(1);
    }
  });

  test("Shouldn't perform attack (def > atk)", () => {
    const validatorMock = jest.fn((character: Character): boolean => {
      return true;
    });

    const attacker: Character = {
      name: "Ichigo Kurosaki",
      hp: 1500,
      defense: 600,
      strength: 400,
    };

    const defender: Character = {
      name: "Byakuya Kuchiki",
      hp: 1500,
      defense: 700,
      strength: 600,
    };

    performAttack(attacker, defender, validatorMock);

    expect(defender.hp).toBe(1500);
    expect(validatorMock).toHaveBeenCalled();
    expect(validatorMock).toHaveBeenCalledTimes(2);
    expect(validatorMock).toHaveReturnedTimes(2);
  });

  test("Characters cannot be undefined", () => {
    const validatorMock = jest.fn((character: Character): boolean => {
      return true;
    });

    const attacker: Character = {
      name: "",
      hp: 0,
      defense: 0,
      strength: 0,
    };

    const defender: Character = {
      name: "",
      hp: 0,
      defense: 0,
      strength: 0,
    };

    performAttack(attacker, defender, validatorMock);

    expect(defender).not.toBe(undefined);
  });
});
