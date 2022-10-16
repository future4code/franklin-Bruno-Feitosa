import { BuyerBusiness } from "../../src/business/BuyerBusiness";
import {
  Buyer,
  IBuyersInfoInputDTO,
  ICreateBuyerInputDTO,
} from "../../src/models/Buyer";

describe("BuyerBusiness", () => {
  const input: ICreateBuyerInputDTO = {
    name: "Bruno",
    email: "bruno@email.com",
    password: "123456",
    cpf: "12345678910",
  };

  const token = "0123456789";

  let Authenticator: any;
  let BuyerDatabase: any;
  let IdGenerator: any;
  let HashManager: any;

  beforeEach(() => {
    Authenticator = jest.fn().mockImplementation(() => {
      return {
        getTokenPayload: jest
          .fn()
          .mockResolvedValue({ id: "MyAwesomeTokenId" }),
        generateToken: jest.fn().mockResolvedValue("MyAwesomeToken"),
      };
    });

    HashManager = jest.fn().mockImplementation(() => {
      return {
        hash: jest.fn().mockResolvedValue("MyHashedKey"),
        compare: jest.fn().mockResolvedValue(true),
      };
    });

    IdGenerator = jest.fn().mockImplementation(() => {
      return {
        generate: jest.fn().mockResolvedValue("MyRandomId"),
      };
    });

    BuyerDatabase = jest.fn().mockImplementation(() => {
      return {
        getBuyerById: jest.fn().mockResolvedValue({ buyerId: "9876543210" }),
        getBuyerByEmail: jest
          .fn()
          .mockResolvedValue({ email: "teste@email.com", cpf: "12345678999" }),
        getAllBuyers: jest
          .fn()
          .mockResolvedValue([{ buyerId: "9876543210", buyerName: "Bruno" }]),
        createBuyerDB: jest.fn().mockResolvedValue({}),
        deleteBuyerDB: jest.fn().mockResolvedValue({}),
        getCardsByBuyerId: jest.fn().mockResolvedValue([
          {
            cardNumber: "5555666677778884",
            cardHolderName: "",
            cardIssuer: "Visa",
          },
        ]),
        getPaymentsByBuyerId: jest.fn().mockResolvedValue([{}]),
        deleteCardDB: jest.fn().mockResolvedValue({}),
        deletePaymentDB: jest.fn().mockResolvedValue({}),
      };
    });

    IdGenerator = jest.fn().mockImplementation(() => {
      return {
        generate: jest.fn().mockReturnValue({ id: "000" }),
      };
    });
  });

  describe("PaymentBusiness", () => {
    describe("createBuyer", () => {
      test("Should return 'Invalid Parameters' (!name)", (done) => {
        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness.createBuyer({ ...input, name: "" }).catch((error) => {
          expect(error.message).toBe("Invalid Parameters");
          done();
        });
      });

      test("Should return 'Invalid Parameters' (!email)", (done) => {
        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness.createBuyer({ ...input, email: "" }).catch((error) => {
          expect(error.message).toBe("Invalid Parameters");
          done();
        });
      });

      test("Should return 'Invalid Parameters' (!password)", (done) => {
        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness.createBuyer({ ...input, password: "" }).catch((error) => {
          expect(error.message).toBe("Invalid Parameters");
          done();
        });
      });

      test("Should return 'Invalid Parameters' (!cpf)", (done) => {
        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness.createBuyer({ ...input, cpf: "" }).catch((error) => {
          expect(error.message).toBe("Invalid Parameters");
          done();
        });
      });

      test("Should return 'Invalid 'name' Parameter'", (done) => {
        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness.createBuyer({ ...input, name: "Lu" }).catch((error) => {
          expect(error.message).toBe("Invalid 'name' Parameter");
          done();
        });
      });

      test("Should return 'Invalid 'email' Parameter'", (done) => {
        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness.createBuyer({ ...input, email: "Lu" }).catch((error) => {
          expect(error.message).toBe("Invalid 'email' Parameter");
          done();
        });
      });

      test("Should return 'Invalid 'email' Parameter'", (done) => {
        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness
          .createBuyer({ ...input, email: "bruno.email" })
          .catch((error) => {
            expect(error.message).toBe("Invalid 'email' Parameter");
            done();
          });
      });

      test("Should return 'Invalid 'password' Parameter'", (done) => {
        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness
          .createBuyer({ ...input, password: "12345" })
          .catch((error) => {
            expect(error.message).toBe("Invalid 'password' Parameter");
            done();
          });
      });

      test("Should return 'Invalid 'cpf' Parameter'", (done) => {
        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness
          .createBuyer({ ...input, cpf: "1234567891" })
          .catch((error) => {
            expect(error.message).toBe("Invalid 'cpf' Parameter");
            done();
          });
      });

      test("Should return 'User already exists'", (done) => {
        BuyerDatabase = jest.fn().mockImplementation(() => {
          return {
            getBuyerByEmail: jest.fn().mockResolvedValue(undefined),
          };
        });

        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness.createBuyer(input).catch((error) => {
          expect(error.message).toBe("User already exists");
          done();
        });
      });

      test("Should return 'Cpf already registered'", (done) => {
        BuyerDatabase = jest.fn().mockImplementation(() => {
          return {
            getBuyerByEmail: jest.fn().mockResolvedValue({
              email: "teste@email.com",
              cpf: "12345678910",
            }),
          };
        });

        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness.createBuyer(input).catch((error) => {
          expect(error.message).toBe("Cpf already registered");
          done();
        });
      });

      test("Should return success", (done) => {
        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness.createBuyer(input).then((response) => {
          expect(response.message).toBe("User registered successfully");
          expect(response.accessToken).toBe("MyAwesomeToken");
          done();
        });
      });
    });

    describe("login", () => {
      test("Should return 'Invalid Parameters' (!email)", (done) => {
        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness.login({ ...input, email: "" }).catch((error) => {
          expect(error.message).toBe("Invalid Parameters");
          done();
        });
      });

      test("Should return 'Invalid Parameters' (!password)", (done) => {
        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness.login({ ...input, password: "" }).catch((error) => {
          expect(error.message).toBe("Invalid Parameters");
          done();
        });
      });

      test("Should return 'Invalid 'email' Parameter'", (done) => {
        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness.login({ ...input, email: "Lu" }).catch((error) => {
          expect(error.message).toBe("Invalid 'email' Parameter");
          done();
        });
      });

      test("Should return 'Invalid 'email' Parameter'", (done) => {
        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness
          .login({ ...input, email: "bruno.email" })
          .catch((error) => {
            expect(error.message).toBe("Invalid 'email' Parameter");
            done();
          });
      });

      test("Should return 'Invalid 'password' Parameter'", (done) => {
        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness.login({ ...input, password: "12345" }).catch((error) => {
          expect(error.message).toBe("Invalid 'password' Parameter");
          done();
        });
      });

      test("Should return 'User not found'", (done) => {
        BuyerDatabase = jest.fn().mockImplementation(() => {
          return {
            getBuyerByEmail: jest.fn().mockResolvedValue(undefined),
          };
        });

        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness.login(input).catch((error) => {
          expect(error.message).toBe("User not found");
          done();
        });
      });

      test("Should return 'Invalid Password'", (done) => {
        HashManager = jest.fn().mockImplementation(() => {
          return {
            compare: jest.fn().mockResolvedValue(false),
          };
        });

        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness.login(input).catch((error) => {
          expect(error.message).toBe("Invalid Password");
          done();
        });
      });

      test("Should return success", (done) => {
        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness.login(input).then((response) => {
          expect(response.message).toBe("Successfully logged in");
          expect(response.accessToken).toBe("MyAwesomeToken");
          done();
        });
      });
    });

    describe("buyerInfo", () => {
      test("Should return 'Invalid Token' (!token)", (done) => {
        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness.buyerInfo("").catch((error) => {
          expect(error.message).toBe("Invalid Token");
          done();
        });
      });

      test("Should return 'Invalid Token' (!tokenInfo)", (done) => {
        Authenticator = jest.fn().mockImplementation(() => {
          return {
            getTokenPayload: jest.fn().mockResolvedValue(null),
          };
        });

        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness.buyerInfo(token).catch((error) => {
          expect(error.message).toBe("Invalid Token");
          done();
        });
      });

      test("Should return 'User not found'", (done) => {
        BuyerDatabase = jest.fn().mockImplementation(() => {
          return {
            getAllBuyers: jest.fn().mockResolvedValue(undefined),
          };
        });

        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness.buyerInfo(token).catch((error) => {
          expect(error.message).toBe("User not found");
          done();
        });
      });

      test("Should return success", (done) => {
        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness.buyerInfo(token).then((response) => {
          expect(response.Buyers).not.toBe(undefined);
          done();
        });
      });
    });

    describe("buyerInfoById", () => {
      const input: IBuyersInfoInputDTO = {
        buyerId: "9876543210",
        token,
      };

      test("Should return 'Invalid Parameter'", (done) => {
        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness
          .buyerInfoById({ ...input, buyerId: "" })
          .catch((error) => {
            expect(error.message).toBe("Invalid Parameter");
            done();
          });
      });

      test("Should return 'Invalid Token' (!token)", (done) => {
        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness.buyerInfoById({ ...input, token: "" }).catch((error) => {
          expect(error.message).toBe("Invalid Token");
          done();
        });
      });

      test("Should return 'Invalid Token' (!tokenInfo)", (done) => {
        Authenticator = jest.fn().mockImplementation(() => {
          return {
            getTokenPayload: jest.fn().mockResolvedValue(null),
          };
        });

        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness.buyerInfoById(input).catch((error) => {
          expect(error.message).toBe("Invalid Token");
          done();
        });
      });

      test("Should return 'User not found'", (done) => {
        BuyerDatabase = jest.fn().mockImplementation(() => {
          return {
            getBuyerById: jest.fn().mockResolvedValue(undefined),
          };
        });

        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness.buyerInfoById(input).catch((error) => {
          expect(error.message).toBe("User not found");
          done();
        });
      });

      test("Should return success", (done) => {
        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness.buyerInfoById(input).then((response) => {
          expect(response.BuyerInfo).not.toBe(undefined);
          expect(response.BuyerInfo).toEqual({
            buyerId: "9876543210",
          });
          done();
        });
      });
    });

    describe("deleteBuyer", () => {
      const input: IBuyersInfoInputDTO = {
        buyerId: "9876543210",
        token,
      };

      test("Should return 'Invalid Parameter'", (done) => {
        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness.deleteBuyer({ ...input, buyerId: "" }).catch((error) => {
          expect(error.message).toBe("Invalid Parameter");
          done();
        });
      });

      test("Should return 'Invalid Token' (!token)", (done) => {
        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness.deleteBuyer({ ...input, token: "" }).catch((error) => {
          expect(error.message).toBe("Invalid Token");
          done();
        });
      });

      test("Should return 'Invalid Token' (!tokenInfo)", (done) => {
        Authenticator = jest.fn().mockImplementation(() => {
          return {
            getTokenPayload: jest.fn().mockResolvedValue(null),
          };
        });

        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness.deleteBuyer(input).catch((error) => {
          expect(error.message).toBe("Invalid Token");
          done();
        });
      });

      test("Should return 'You can't delete your own account'", (done) => {
        Authenticator = jest.fn().mockImplementation(() => {
          return {
            getTokenPayload: jest.fn().mockResolvedValue({ id: "9876543210" }),
          };
        });

        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness.deleteBuyer(input).catch((error) => {
          expect(error.message).toBe("You can't delete your own account");
          done();
        });
      });

      test("Should return 'User not found'", (done) => {
        BuyerDatabase = jest.fn().mockImplementation(() => {
          return {
            getBuyerById: jest.fn().mockResolvedValue(undefined),
            getPaymentsByBuyerId: jest.fn().mockResolvedValue([{}]),
            getCardsByBuyerId: jest.fn().mockResolvedValue([{}]),
            deleteCardDB: jest.fn().mockResolvedValue({}),
            deletePaymentDB: jest.fn().mockResolvedValue({}),
          };
        });

        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness.deleteBuyer(input).catch((error) => {
          expect(error.message).toBe("User not found");
          done();
        });
      });

      test("Should return success", (done) => {
        const buyerBusiness = new BuyerBusiness(
          new BuyerDatabase(),
          new HashManager(),
          new Authenticator(),
          new IdGenerator()
        );

        buyerBusiness.deleteBuyer(input).then((response) => {
          expect(response.message).toBe("User deleted successfully");
          done();
        });
      });
    });

    describe("Buyer model", () => {
      test("Should return mocked payment data correctly using getters", () => {
        const buyer = new Buyer(
          "Bruno",
          "bruno@email.com",
          "123456",
          "12345678910"
        );

        const result = {
          buyerName: buyer.getName(),
          buyerEmail: buyer.getEmail(),
          buyerPassword: buyer.getPassword(),
          buyerCpf: buyer.getCpf(),
        };

        expect(result).toEqual({
          buyerName: "Bruno",
          buyerEmail: "bruno@email.com",
          buyerPassword: "123456",
          buyerCpf: "12345678910",
        });
      });
    });
  });
});
