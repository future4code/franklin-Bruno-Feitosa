import { performPurchase, User } from "./performPurchase";

describe("Testing performPurchase function", () => {
  test("Testing balance greater than value", () => {
    const user: User = {
      name: "teste1",
      balance: 10,
    };

    const result = performPurchase(user, 5);

    expect(result).toEqual({ name: "teste1", balance: 5 });
  });

  test("Testing balance equals value", () => {
    const user: User = {
      name: "teste1",
      balance: 10,
    };

    const result = performPurchase(user, 10);

    expect(result).toEqual({ name: "teste1", balance: 0 });
  });

  test("Testing balance less than value", () => {
    const user: User = {
      name: "teste1",
      balance: 5,
    };

    const result = performPurchase(user, 10);

    expect(result).not.toBeDefined();
  });
});
