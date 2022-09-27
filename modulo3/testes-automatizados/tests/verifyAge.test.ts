import { verifyAge, User, NACIONALITY, Casino, LOCATION } from "./verifyAge";

describe("Testing verifyAge function", () => {
  test("Testing 1 brazilian allowed", () => {
    const brazilian: User = {
      name: "Bruno",
      age: 26,
      nacionality: NACIONALITY.BRAZILIAN,
    };

    const casino: Casino = {
      name: "BrazilianCasino",
      location: LOCATION.BRAZIL,
    };

    const result = verifyAge(casino, [brazilian]);

    expect(result.brazilians.allowed).toEqual(["Bruno"]);
  });

  test("Testing 1 american allowed", () => {
    const american: User = {
      name: "American Bruno",
      age: 19,
      nacionality: NACIONALITY.AMERICAN,
    };

    const casino: Casino = {
      name: "BrazilianCasino",
      location: LOCATION.BRAZIL,
    };

    const result = verifyAge(casino, [american]);

    expect(result.americans.allowed).toEqual(["American Bruno"]);
  });

  test("No one allowed", () => {
    const brazilian: User = {
      name: "Brazilian Bruno",
      age: 19,
      nacionality: NACIONALITY.BRAZILIAN,
    };
    const american: User = {
      name: "American Bruno",
      age: 19,
      nacionality: NACIONALITY.AMERICAN,
    };

    const casino: Casino = {
      name: "EUACasino",
      location: LOCATION.EUA,
    };

    const result = verifyAge(casino, [
      brazilian,
      brazilian,
      american,
      american,
    ]);

    expect(result.americans.unallowed).toEqual([
      "American Bruno",
      "American Bruno",
    ]);
    expect(result.brazilians.unallowed).toEqual([
      "Brazilian Bruno",
      "Brazilian Bruno",
    ]);
  });

  test("2 american allowed and 2 brazilians unallowed", () => {
    const brazilian: User = {
      name: "Brazilian Bruno",
      age: 19,
      nacionality: NACIONALITY.BRAZILIAN,
    };
    const american: User = {
      name: "American Bruno",
      age: 21,
      nacionality: NACIONALITY.AMERICAN,
    };

    const casino: Casino = {
      name: "EUACasino",
      location: LOCATION.EUA,
    };

    const result = verifyAge(casino, [
      brazilian,
      brazilian,
      american,
      american,
    ]);

    expect(result.americans.allowed).toEqual([
      "American Bruno",
      "American Bruno",
    ]);
    expect(result.brazilians.unallowed).toEqual([
      "Brazilian Bruno",
      "Brazilian Bruno",
    ]);
  });

  test("1 brazilian allowed, testing if array.length > 0 && array.length < 2", () => {
    const brazilian: User = {
      name: "Brazilian Bruno",
      age: 19,
      nacionality: NACIONALITY.BRAZILIAN,
    };

    const casino: Casino = {
      name: "BRCasino",
      location: LOCATION.BRAZIL,
    };

    const result = verifyAge(casino, [brazilian]);

    expect(
      result.brazilians.allowed.length > 0 &&
        result.brazilians.allowed.length < 2
    ).toBe(true);
  });

  test("1 american allowed, testing if array.length === 0", () => {
    const american: User = {
      name: "American Bruno",
      age: 19,
      nacionality: NACIONALITY.AMERICAN,
    };

    const casino: Casino = {
      name: "BRCasino",
      location: LOCATION.BRAZIL,
    };

    const result = verifyAge(casino, [american]);

    expect(result.americans.unallowed.length === 0).toBe(true);
  });

  test("2 american allowed and 2 brazilians unallowed", () => {
    const brazilian: User = {
      name: "Brazilian Bruno",
      age: 19,
      nacionality: NACIONALITY.BRAZILIAN,
    };
    const american: User = {
      name: "American Bruno",
      age: 19,
      nacionality: NACIONALITY.AMERICAN,
    };

    const casino: Casino = {
      name: "EUACasino",
      location: LOCATION.EUA,
    };

    const result = verifyAge(casino, [
      brazilian,
      brazilian,
      american,
      american,
    ]);

    expect(result.americans.unallowed).toContainEqual("American Bruno");
    expect(result.brazilians.unallowed).toContainEqual("Brazilian Bruno");
  });

  test("2 american allowed and 2 brazilians unallowed", () => {
    const brazilian: User = {
      name: "Brazilian Bruno",
      age: 19,
      nacionality: NACIONALITY.BRAZILIAN,
    };
    const american: User = {
      name: "American Bruno",
      age: 21,
      nacionality: NACIONALITY.AMERICAN,
    };

    const casino: Casino = {
      name: "EUACasino",
      location: LOCATION.EUA,
    };

    const result = verifyAge(casino, [
      brazilian,
      brazilian,
      american,
      american,
    ]);

    expect(
      result.americans.allowed.length === 2 &&
        result.americans.unallowed.length < 1
    ).toBe(true);

    expect(result.brazilians.unallowed.length > 1).toBe(true);
  });
});
