import { Character, validateCharacter } from "../src/validateCharacter";

describe("Testing validateCharacter function", () => {
  test("Should return false for empty name", () => {
    const character: Character = {
      name: "",
      hp: 1500,
      defense: 20,
      strength: 20,
    };

    const verifyResult = validateCharacter(character);

    expect(verifyResult).toBe(false);
  });

  test("Should return false for hp 0", () => {
    const character: Character = {
      name: "Kirito",
      hp: 0,
      defense: 350,
      strength: 500,
    };

    const verifyResult = validateCharacter(character);

    expect(verifyResult).toBe(false);
  });

  test("Should return false for strength 0", () => {
    const character: Character = {
      name: "Kirito",
      hp: 1500,
      defense: 350,
      strength: 0,
    };

    const verifyResult = validateCharacter(character);

    expect(verifyResult).toBe(false);
  });

  test("Should return false for defense 0", () => {
    const character: Character = {
      name: "Kirito",
      hp: 1500,
      defense: 0,
      strength: 500,
    };

    const verifyResult = validateCharacter(character);

    expect(verifyResult).toBe(false);
  });

  test("Should return false for life, defense or strength with negative values", () => {
    const character: Character = {
      name: "Kirito",
      hp: 1500,
      defense: -50,
      strength: 500,
    };

    const verifyResult = validateCharacter(character);

    expect(verifyResult).toBe(false);
  });

  test("Should return true for valid infos", () => {
    const character: Character = {
      name: "Kirito",
      hp: 1500,
      defense: 400,
      strength: 700,
    };

    const verifyResult = validateCharacter(character);

    expect(verifyResult).toBe(true);
  });
});
