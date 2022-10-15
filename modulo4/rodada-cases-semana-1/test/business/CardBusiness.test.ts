import { CardBusiness } from "../../src/business/CardBusiness";
import {
  Card,
  ICardInputDTO,
  IGetSingleCardInputDTO,
} from "../../src/models/Card";

describe("CardBusiness", () => {
  const input: ICardInputDTO = {
    cardNumber: "5555666677778884",
    cardHolderName: "Bruno",
    cardExpirationDate: "05/32",
    cardCVV: 333,
  };

  const token = "0123456789";

  let Authenticator: any;
  let CardDatabase: any;
  let IdGenerator: any;
  let HashManager: any;
  let LuhnCheckAlgorithm: any;

  beforeEach(() => {
    Authenticator = jest.fn().mockImplementation(() => {
      return {
        getTokenPayload: jest.fn().mockResolvedValue({ id: "MyAwesomeToken" }),
      };
    });

    HashManager = jest.fn().mockImplementation(() => {
      return {
        hash: jest.fn().mockResolvedValue("MyHashedKey"),
        compare: jest.fn().mockResolvedValue(true),
      };
    });

    CardDatabase = jest.fn().mockImplementation(() => {
      return {
        getBuyerById: jest.fn().mockResolvedValue({ buyerId: "9876543210" }),
        createCardDB: jest.fn().mockResolvedValue({}),
        deleteCardDB: jest.fn().mockResolvedValue({}),
        getCardByBuyerIdCardNumber: jest.fn().mockResolvedValue(undefined),
        getCardByCardNumber: jest.fn().mockResolvedValue(undefined),
        getCardsByBuyerId: jest.fn().mockResolvedValue([
          {
            cardNumber: "5555666677778884",
            cardHolderName: "",
            cardIssuer: "Visa",
          },
        ]),
        getPaymentByCardNumber: jest.fn().mockResolvedValue({}),
        deletePaymentDB: jest.fn().mockResolvedValue({}),
      };
    });

    LuhnCheckAlgorithm = jest.fn().mockImplementation(() => {
      return {
        luhnCheckAlgorithm: jest.fn().mockResolvedValue({
          checkValidCard: true,
          creditCardIssuer: "randomCardIssuer",
        }),
      };
    });

    IdGenerator = jest.fn().mockImplementation(() => {
      return {
        generate: jest.fn().mockReturnValue({ id: "000" }),
      };
    });
  });

  describe("registerCard", () => {
    test("should return 'Missing parameters' to cardNumber empty", (done) => {
      const cardBusiness = new CardBusiness(
        new CardDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator(),
        new LuhnCheckAlgorithm()
      );

      cardBusiness
        .registerCard({ ...input, cardNumber: "" }, token)
        .catch((error) => {
          expect(error.message).toBe("Missing parameters");
          done();
        });
    });

    test("should return 'Missing parameters' to cardHolderName empty", (done) => {
      const cardBusiness = new CardBusiness(
        new CardDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator(),
        new LuhnCheckAlgorithm()
      );

      cardBusiness
        .registerCard({ ...input, cardHolderName: "" }, token)
        .catch((error) => {
          expect(error.message).toBe("Missing parameters");
          done();
        });
    });

    test("should return 'Missing parameters' to cardExpirationDate empty", (done) => {
      const cardBusiness = new CardBusiness(
        new CardDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator(),
        new LuhnCheckAlgorithm()
      );

      cardBusiness
        .registerCard({ ...input, cardExpirationDate: "" }, token)
        .catch((error) => {
          expect(error.message).toBe("Missing parameters");
          done();
        });
    });

    test("should return 'Missing parameters' to cardCVV empty", (done) => {
      const cardBusiness = new CardBusiness(
        new CardDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator(),
        new LuhnCheckAlgorithm()
      );

      cardBusiness
        .registerCard({ ...input, cardCVV: 0 }, token)
        .catch((error) => {
          expect(error.message).toBe("Missing parameters");
          done();
        });
    });

    test("should return 'Invalid CVV'", (done) => {
      const cardBusiness = new CardBusiness(
        new CardDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator(),
        new LuhnCheckAlgorithm()
      );

      cardBusiness
        .registerCard({ ...input, cardCVV: 12 }, token)
        .catch((error) => {
          expect(error.message).toBe("Invalid CVV");
          done();
        });
    });

    test("should return 'Bad request'", (done) => {
      const cardBusiness = new CardBusiness(
        new CardDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator(),
        new LuhnCheckAlgorithm()
      );

      cardBusiness.registerCard(input, "").catch((error) => {
        expect(error.message).toBe("Bad request");
        done();
      });
    });

    test("Should return 'Invalid Token'", (done) => {
      Authenticator = jest.fn().mockImplementation(() => {
        return {
          getTokenPayload: jest.fn().mockResolvedValue(null),
        };
      });

      const cardBusiness = new CardBusiness(
        new CardDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator(),
        new LuhnCheckAlgorithm()
      );

      cardBusiness.registerCard(input, token).catch((error) => {
        expect(error.message).toBe("Invalid Token");
        expect(Authenticator.mock.calls.length).toBe(1);
        done();
      });
    });

    test("Should return 'Invalid Card'", (done) => {
      LuhnCheckAlgorithm = jest.fn().mockImplementation(() => {
        return {
          luhnCheckAlgorithm: jest
            .fn()
            .mockResolvedValue({ checkValidCard: false, creditCardIssuer: "" }),
        };
      });

      const cardBusiness = new CardBusiness(
        new CardDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator(),
        new LuhnCheckAlgorithm()
      );

      cardBusiness.registerCard(input, token).catch((error) => {
        expect(error.message).toBe("Invalid Card");
        expect(LuhnCheckAlgorithm.mock.calls.length).toBe(1);
        done();
      });
    });

    test("Should return 'User not found'", (done) => {
      CardDatabase = jest.fn().mockImplementation(() => {
        return {
          getBuyerById: jest.fn().mockResolvedValue(undefined),
        };
      });

      const cardBusiness = new CardBusiness(
        new CardDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator(),
        new LuhnCheckAlgorithm()
      );

      cardBusiness.registerCard(input, token).catch((error) => {
        expect(error.message).toBe("User not found");
        expect(CardDatabase.mock.calls.length).toBe(1);
        done();
      });
    });

    test("Should return 'Card already registered'", (done) => {
      CardDatabase = jest.fn().mockImplementation(() => {
        return {
          getBuyerById: jest.fn().mockResolvedValue({
            buyerId: "9876543210",
          }),
          getCardByBuyerIdCardNumber: jest.fn().mockResolvedValue({
            cardNumber: "5555666677778884",
            cardHolderName: "Bruno",
            cardExpirationDate: "05/32",
            cardCVV: 333,
            cardIssuer: "Mastercard",
            buyerId: "9876543210",
          }),
        };
      });

      const cardBusiness = new CardBusiness(
        new CardDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator(),
        new LuhnCheckAlgorithm()
      );

      cardBusiness.registerCard(input, token).catch((error) => {
        expect(error.message).toBe("Card already registered");
        expect(CardDatabase.mock.calls.length).toBe(1);
        done();
      });
    });

    test("Should return 'Card already registered by another user'", (done) => {
      CardDatabase = jest.fn().mockImplementation(() => {
        return {
          getCardByCardNumber: jest
            .fn()
            .mockResolvedValue({ cardNumber: "5555666677778884" }),
          getBuyerById: jest.fn().mockResolvedValue({
            buyerId: "9876543210",
          }),
          getCardByBuyerIdCardNumber: jest.fn().mockResolvedValue(undefined),
        };
      });

      const cardBusiness = new CardBusiness(
        new CardDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator(),
        new LuhnCheckAlgorithm()
      );

      cardBusiness.registerCard(input, token).catch((error) => {
        expect(error.message).toBe("Card already registered by another user");
        expect(CardDatabase.mock.calls.length).toBe(1);
        done();
      });
    });

    test("Should return success", (done) => {
      const cardBusiness = new CardBusiness(
        new CardDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator(),
        new LuhnCheckAlgorithm()
      );

      cardBusiness.registerCard(input, token).then((response) => {
        expect(response.message).toBe("Card registered successfully");
        expect(CardDatabase.mock.calls.length).toBe(1);
        done();
      });
    });
  });

  describe("allCards", () => {
    test("should return 'Bad request'", (done) => {
      const cardBusiness = new CardBusiness(
        new CardDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator(),
        new LuhnCheckAlgorithm()
      );

      cardBusiness.allCards("").catch((error) => {
        expect(error.message).toBe("Bad request");
        done();
      });
    });

    test("Should return 'Invalid Token'", (done) => {
      Authenticator = jest.fn().mockImplementation(() => {
        return {
          getTokenPayload: jest.fn().mockResolvedValue(null),
        };
      });

      const cardBusiness = new CardBusiness(
        new CardDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator(),
        new LuhnCheckAlgorithm()
      );

      cardBusiness.allCards(token).catch((error) => {
        expect(error.message).toBe("Invalid Token");
        expect(Authenticator.mock.calls.length).toBe(1);
        done();
      });
    });

    test("Should return an non empty array", (done) => {
      const cardBusiness = new CardBusiness(
        new CardDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator(),
        new LuhnCheckAlgorithm()
      );

      cardBusiness.allCards(token).then((response) => {
        expect(response.cardsList).toEqual([
          {
            cardNumber: "5555666677778884",
            cardHolderName: "",
            cardIssuer: "Visa",
          },
        ]);
        expect(response.cardsList.length).not.toBe(0);
        expect(CardDatabase.mock.calls.length).toBe(1);
        done();
      });
    });
  });

  describe("singleCard", () => {
    test("should return 'Bad request'", (done) => {
      const input: IGetSingleCardInputDTO = {
        token: "",
        cardNumber: "5555666677778884",
      };

      const cardBusiness = new CardBusiness(
        new CardDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator(),
        new LuhnCheckAlgorithm()
      );

      cardBusiness.getSingleCard(input).catch((error) => {
        expect(error.message).toBe("Bad request");
        done();
      });
    });

    test("should return 'Missing parameter'", (done) => {
      const input: IGetSingleCardInputDTO = {
        token,
        cardNumber: "",
      };

      const cardBusiness = new CardBusiness(
        new CardDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator(),
        new LuhnCheckAlgorithm()
      );

      cardBusiness.getSingleCard(input).catch((error) => {
        expect(error.message).toBe("Missing parameter");
        done();
      });
    });

    test("Should return 'Invalid Token'", (done) => {
      Authenticator = jest.fn().mockImplementation(() => {
        return {
          getTokenPayload: jest.fn().mockResolvedValue(null),
        };
      });

      const input: IGetSingleCardInputDTO = {
        token,
        cardNumber: "5555666677778884",
      };

      const cardBusiness = new CardBusiness(
        new CardDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator(),
        new LuhnCheckAlgorithm()
      );

      cardBusiness.getSingleCard(input).catch((error) => {
        expect(error.message).toBe("Invalid Token");
        expect(Authenticator.mock.calls.length).toBe(1);
        done();
      });
    });

    test("Should return 'Card not found'", (done) => {
      const input: IGetSingleCardInputDTO = {
        token,
        cardNumber: "5555666677778884",
      };

      const cardBusiness = new CardBusiness(
        new CardDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator(),
        new LuhnCheckAlgorithm()
      );

      cardBusiness.getSingleCard(input).catch((error) => {
        expect(error.message).toBe("Card not found");
        expect(Authenticator.mock.calls.length).toBe(1);
        done();
      });
    });

    test("Should return success", (done) => {
      CardDatabase = jest.fn().mockImplementation(() => {
        return {
          getCardByBuyerIdCardNumber: jest.fn().mockResolvedValue({}),
        };
      });

      const input: IGetSingleCardInputDTO = {
        token,
        cardNumber: "5555666677778884",
      };

      const cardBusiness = new CardBusiness(
        new CardDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator(),
        new LuhnCheckAlgorithm()
      );

      cardBusiness.getSingleCard(input).then((response) => {
        expect(response.CardInfo).toEqual({});
        expect(response.CardInfo).not.toBe(false);
        done();
      });
    });
  });

  describe("deleteCard", () => {
    test("should return 'Bad request'", (done) => {
      const input: IGetSingleCardInputDTO = {
        token: "",
        cardNumber: "5555666677778884",
      };

      const cardBusiness = new CardBusiness(
        new CardDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator(),
        new LuhnCheckAlgorithm()
      );

      cardBusiness.deleteCard(input).catch((error) => {
        expect(error.message).toBe("Bad request");
        done();
      });
    });

    test("should return 'Missing parameter'", (done) => {
      const input: IGetSingleCardInputDTO = {
        token,
        cardNumber: "",
      };

      const cardBusiness = new CardBusiness(
        new CardDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator(),
        new LuhnCheckAlgorithm()
      );

      cardBusiness.deleteCard(input).catch((error) => {
        expect(error.message).toBe("Missing parameter");
        done();
      });
    });

    test("Should return 'Invalid Token'", (done) => {
      Authenticator = jest.fn().mockImplementation(() => {
        return {
          getTokenPayload: jest.fn().mockResolvedValue(null),
        };
      });

      const input: IGetSingleCardInputDTO = {
        token,
        cardNumber: "5555666677778884",
      };

      const cardBusiness = new CardBusiness(
        new CardDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator(),
        new LuhnCheckAlgorithm()
      );

      cardBusiness.deleteCard(input).catch((error) => {
        expect(error.message).toBe("Invalid Token");
        expect(Authenticator.mock.calls.length).toBe(1);
        done();
      });
    });

    test("Should return 'Card not found'", (done) => {
      const input: IGetSingleCardInputDTO = {
        token,
        cardNumber: "5555666677778884",
      };

      const cardBusiness = new CardBusiness(
        new CardDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator(),
        new LuhnCheckAlgorithm()
      );

      cardBusiness.deleteCard(input).catch((error) => {
        expect(error.message).toBe("Card not found");
        expect(Authenticator.mock.calls.length).toBe(1);
        done();
      });
    });

    test("Should return 'Card deleted successfully'", (done) => {
      CardDatabase = jest.fn().mockImplementation(() => {
        return {
          getCardByBuyerIdCardNumber: jest.fn().mockResolvedValue({}),
          deleteCardDB: jest.fn().mockResolvedValue({}),
          getPaymentByCardNumber: jest.fn().mockResolvedValue({}),
          deletePaymentDB: jest.fn().mockResolvedValue({}),
        };
      });

      const input: IGetSingleCardInputDTO = {
        token,
        cardNumber: "5555666677778884",
      };

      const cardBusiness = new CardBusiness(
        new CardDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator(),
        new LuhnCheckAlgorithm()
      );

      cardBusiness.deleteCard(input).then((response) => {
        expect(response.message).toBe("Card deleted successfully");
        done();
      });
    });
  });

  describe("Card model", () => {
    test("Should return mocked payment data correctly using getters", () => {
      const card = new Card(
        "5555666677778884",
        "Bruno",
        "05/32",
        333,
        "Mastercard"
      );

      const result = {
        cardNumber: card.getCardNumber(),
        cardHolderName: card.getCardHolderName(),
        cardExpirationDate: card.getCardExpirationDate(),
        cardCVV: card.getCardCVV(),
        cardIssuer: card.getCardIssuer(),
      };

      expect(result).toEqual({
        cardNumber: "5555666677778884",
        cardHolderName: "Bruno",
        cardExpirationDate: "05/32",
        cardCVV: 333,
        cardIssuer: "Mastercard",
      });
    });
  });
});
