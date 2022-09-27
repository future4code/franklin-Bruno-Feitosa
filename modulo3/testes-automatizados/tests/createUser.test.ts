import {
  connection,
  User,
  createUser,
  deleteUserById,
  getUserByEmail,
} from "./createUser";

describe("Testing createUser function", () => {
  afterAll(async () => {
    await deleteUserById(10);
    await connection.destroy();
  });

  test("Creating user test", async () => {
    const user: User = {
      id: 10,
      name: "Bruno Teste",
      nickname: "Apollyon Teste",
      email: "bruno@teste.com",
    };

    await createUser(user);

    const userFromDb = await getUserByEmail(user.email);

    expect(userFromDb).toEqual({
      id: 10,
      name: "Bruno Teste",
      nickname: "Apollyon Teste",
      email: "bruno@teste.com",
    });
  });

  test("Creating user test with duplicate data error in DB", async () => {
    try {
      const user: User = {
        id: 10,
        name: "Bruno Teste",
        nickname: "Apollyon Teste",
        email: "bruno@teste.com",
      };

      await createUser(user);
    } catch (error) {
      if (error instanceof Error) {
        // console.log(error.message);
        expect(error).not.toBe(undefined);
      }
    }
  });
});
