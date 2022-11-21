"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Payment_1 = require("../../src/models/Payment");
const PaymentBusiness_1 = require("../../src/business/PaymentBusiness");
describe("PaymentBusiness", () => {
    const input = {
        amount: 1,
        type: Payment_1.PAYMENT_TYPE.BOLETO,
        cardNumber: undefined,
    };
    const token = "0123456789";
    let Authenticator;
    let PaymentDatabase;
    let IdGenerator;
    beforeEach(() => {
        Authenticator = jest.fn().mockImplementation(() => {
            return {
                getTokenPayload: jest.fn().mockResolvedValue({ id: "MyAwesomeToken" }),
            };
        });
        PaymentDatabase = jest.fn().mockImplementation(() => {
            return {
                getBuyerById: jest.fn().mockResolvedValue({ buyerId: "9876543210" }),
                createPaymentDB: jest.fn().mockResolvedValue({}),
                deletePaymentDB: jest.fn().mockResolvedValue({}),
                getPaymentByPaymentId: jest.fn().mockResolvedValue(undefined),
                getPaymentsByBuyerId: jest.fn().mockResolvedValue([
                    {
                        paymentId: "",
                        paymentValue: 200,
                        paymentType: Payment_1.PAYMENT_TYPE.CREDIT_CARD,
                    },
                ]),
                getCardByCardNumber: jest.fn().mockResolvedValue(undefined),
            };
        });
        IdGenerator = jest.fn().mockImplementation(() => {
            return {
                generate: jest.fn().mockReturnValue({ id: "000" }),
            };
        });
    });
    describe("createPayment", () => {
        test("should return 'Invalid Parameters' (!amount)", (done) => {
            const paymentBusiness = new PaymentBusiness_1.PaymentBusiness(new PaymentDatabase(), new Authenticator(), new IdGenerator());
            paymentBusiness
                .createPayment({ ...input, amount: 0 }, token)
                .catch((error) => {
                expect(error.message).toBe("Invalid Parameters");
                done();
            });
        });
        test("should return 'Invalid Card'", (done) => {
            const paymentBusiness = new PaymentBusiness_1.PaymentBusiness(new PaymentDatabase(), new Authenticator(), new IdGenerator());
            paymentBusiness
                .createPayment({ ...input, type: Payment_1.PAYMENT_TYPE.CREDIT_CARD }, token)
                .catch((error) => {
                expect(error.message).toBe("Invalid Card");
                done();
            });
        });
        test("should return 'Invalid Token' (!token) BOLETO", (done) => {
            const paymentBusiness = new PaymentBusiness_1.PaymentBusiness(new PaymentDatabase(), new Authenticator(), new IdGenerator());
            paymentBusiness.createPayment(input, "").catch((error) => {
                expect(error.message).toBe("Invalid Token");
                done();
            });
        });
        test("should return 'Invalid Token' (!tokenInfo) BOLETO", (done) => {
            Authenticator = jest.fn().mockImplementation(() => {
                return {
                    getTokenPayload: jest.fn().mockResolvedValue(null),
                };
            });
            const paymentBusiness = new PaymentBusiness_1.PaymentBusiness(new PaymentDatabase(), new Authenticator(), new IdGenerator());
            paymentBusiness.createPayment(input, token).catch((error) => {
                expect(Authenticator.mock.calls.length).toBe(1);
                expect(error.message).toBe("Invalid Token");
                done();
            });
        });
        test("should return 'Invalid Token' (!tokenInfo) CREDIT_CARD", (done) => {
            Authenticator = jest.fn().mockImplementation(() => {
                return {
                    getTokenPayload: jest.fn().mockResolvedValue(null),
                };
            });
            const paymentBusiness = new PaymentBusiness_1.PaymentBusiness(new PaymentDatabase(), new Authenticator(), new IdGenerator());
            paymentBusiness
                .createPayment({
                ...input,
                cardNumber: "5555666677778884",
                type: Payment_1.PAYMENT_TYPE.CREDIT_CARD,
            }, token)
                .catch((error) => {
                expect(Authenticator.mock.calls.length).toBe(1);
                expect(error.message).toBe("Invalid Token");
                done();
            });
        });
        test("Should return 'User not found'", (done) => {
            PaymentDatabase = jest.fn().mockImplementation(() => {
                return {
                    getBuyerById: jest.fn().mockResolvedValue(undefined),
                };
            });
            const paymentBusiness = new PaymentBusiness_1.PaymentBusiness(new PaymentDatabase(), new Authenticator(), new IdGenerator());
            paymentBusiness
                .createPayment({
                ...input,
                cardNumber: "5555666677778884",
            }, token)
                .catch((error) => {
                expect(Authenticator.mock.calls.length).toBe(1);
                expect(error.message).toBe("User not found");
                done();
            });
        });
        test("Should return bankslip code", (done) => {
            const paymentBusiness = new PaymentBusiness_1.PaymentBusiness(new PaymentDatabase(), new Authenticator(), new IdGenerator());
            paymentBusiness.createPayment(input, token).then((data) => {
                expect(Authenticator.mock.calls.length).toBe(1);
                expect(data.message).toBe("Código do boleto");
                done();
            });
        });
        test("Should return 'Shouldn't put Card info if payment type isn't credit card'", (done) => {
            const paymentBusiness = new PaymentBusiness_1.PaymentBusiness(new PaymentDatabase(), new Authenticator(), new IdGenerator());
            paymentBusiness
                .createPayment({ ...input, cardNumber: "5555666677778884" }, token)
                .catch((error) => {
                expect(input.type).toBe("BOLETO");
                expect(error.message).toBe("Shouldn't put Card info if payment type isn't credit card");
                done();
            });
        });
        test("Should return 'Invalid Card' for credit card empty cardNumber", (done) => {
            const paymentBusiness = new PaymentBusiness_1.PaymentBusiness(new PaymentDatabase(), new Authenticator(), new IdGenerator());
            paymentBusiness
                .createPayment({ ...input, type: Payment_1.PAYMENT_TYPE.CREDIT_CARD }, token)
                .catch((error) => {
                expect(Authenticator.mock.calls.length).toBe(1);
                expect(error.message).toBe("Invalid Card");
                done();
            });
        });
        test("Should return 'Invalid Token' (!token) CREDIT_CARD", (done) => {
            const paymentBusiness = new PaymentBusiness_1.PaymentBusiness(new PaymentDatabase(), new Authenticator(), new IdGenerator());
            paymentBusiness
                .createPayment({ ...input, cardNumber: "5555666677778884" }, "")
                .catch((error) => {
                expect(error.message).toBe("Invalid Token");
                done();
            });
        });
        test("Should return 'Invalid Card' (!cardNumber)", (done) => {
            const paymentBusiness = new PaymentBusiness_1.PaymentBusiness(new PaymentDatabase(), new Authenticator(), new IdGenerator());
            paymentBusiness
                .createPayment({
                ...input,
                type: Payment_1.PAYMENT_TYPE.CREDIT_CARD,
            }, token)
                .catch((error) => {
                expect(input.cardNumber).toBe(undefined);
                expect(error.message).toBe("Invalid Card");
                done();
            });
        });
        test("Should return 'Invalid Card' (!cardInfo)", (done) => {
            const paymentBusiness = new PaymentBusiness_1.PaymentBusiness(new PaymentDatabase(), new Authenticator(), new IdGenerator());
            paymentBusiness
                .createPayment({
                ...input,
                cardNumber: "5555666677778884",
                type: Payment_1.PAYMENT_TYPE.CREDIT_CARD,
            }, token)
                .catch((error) => {
                expect(PaymentDatabase.mock.calls.length).toBe(1);
                expect(error.message).toBe("Card not found");
                done();
            });
        });
        test("Should return 'Card not found'", (done) => {
            PaymentDatabase = jest.fn().mockImplementation(() => {
                return {
                    getBuyerById: jest.fn().mockResolvedValue({ buyerId: "9876543210" }),
                    getCardByCardNumber: jest
                        .fn()
                        .mockResolvedValue({ buyerId: "987654321" }),
                };
            });
            const paymentBusiness = new PaymentBusiness_1.PaymentBusiness(new PaymentDatabase(), new Authenticator(), new IdGenerator());
            paymentBusiness
                .createPayment({
                ...input,
                cardNumber: "5555666677778884",
                type: Payment_1.PAYMENT_TYPE.CREDIT_CARD,
            }, token)
                .catch((error) => {
                expect(PaymentDatabase.mock.calls.length).toBe(1);
                expect(error.message).toBe("Card not found");
                done();
            });
        });
        test("Should return success", (done) => {
            PaymentDatabase = jest.fn().mockImplementation(() => {
                return {
                    getBuyerById: jest.fn().mockResolvedValue({ buyerId: "9876543210" }),
                    getCardByCardNumber: jest
                        .fn()
                        .mockResolvedValue({ buyerId: "9876543210" }),
                    createPaymentDB: jest.fn().mockResolvedValue({}),
                };
            });
            const paymentBusiness = new PaymentBusiness_1.PaymentBusiness(new PaymentDatabase(), new Authenticator(), new IdGenerator());
            paymentBusiness
                .createPayment({
                ...input,
                cardNumber: "5555666677778884",
                type: Payment_1.PAYMENT_TYPE.CREDIT_CARD,
            }, token)
                .then((response) => {
                expect(PaymentDatabase.mock.calls.length).toBe(1);
                expect(response.message).toBe("Payment was successfully made");
                done();
            });
        });
    });
    describe("allPayments", () => {
        test("should return 'Invalid Token' (!token)", (done) => {
            const paymentBusiness = new PaymentBusiness_1.PaymentBusiness(new PaymentDatabase(), new Authenticator(), new IdGenerator());
            paymentBusiness.allPayments("").catch((error) => {
                expect(error.message).toBe("Invalid Token");
                done();
            });
        });
        test("should return 'Invalid Token'", (done) => {
            Authenticator = jest.fn().mockImplementation(() => {
                return {
                    getTokenPayload: jest.fn().mockResolvedValue(null),
                };
            });
            const paymentBusiness = new PaymentBusiness_1.PaymentBusiness(new PaymentDatabase(), new Authenticator(), new IdGenerator());
            paymentBusiness.allPayments(token).catch((error) => {
                expect(Authenticator.mock.calls.length).toBe(1);
                expect(error.message).toBe("Invalid Token");
                done();
            });
        });
        test("Should return paymentsList", (done) => {
            const paymentBusiness = new PaymentBusiness_1.PaymentBusiness(new PaymentDatabase(), new Authenticator(), new IdGenerator());
            paymentBusiness.allPayments(token).then((data) => {
                expect(Authenticator.mock.calls.length).toBe(1);
                expect(PaymentDatabase.mock.calls.length).toBe(1);
                done();
            });
        });
    });
    describe("singlePaymentStatus", () => {
        test("Should return 'Missing parameter'", (done) => {
            const input = {
                paymentId: "",
                token,
            };
            const paymentBusiness = new PaymentBusiness_1.PaymentBusiness(new PaymentDatabase(), new Authenticator(), new IdGenerator());
            paymentBusiness.singlePaymentStatus(input).catch((error) => {
                expect(error.message).toBe("Missing parameter");
                done();
            });
        });
        test("Should return 'Invalid Token'", (done) => {
            const input = {
                paymentId: "randomPaymentId",
                token: "",
            };
            const paymentBusiness = new PaymentBusiness_1.PaymentBusiness(new PaymentDatabase(), new Authenticator(), new IdGenerator());
            paymentBusiness.singlePaymentStatus(input).catch((error) => {
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
            const input = {
                paymentId: "randomPaymentId",
                token,
            };
            const paymentBusiness = new PaymentBusiness_1.PaymentBusiness(new PaymentDatabase(), new Authenticator(), new IdGenerator());
            paymentBusiness.singlePaymentStatus(input).catch((error) => {
                expect(Authenticator.mock.calls.length).toBe(1);
                expect(error.message).toBe("Invalid Token");
                done();
            });
        });
        test("Should return 'Payment didn't exist'", (done) => {
            const input = {
                paymentId: "randomPaymentId",
                token,
            };
            const paymentBusiness = new PaymentBusiness_1.PaymentBusiness(new PaymentDatabase(), new Authenticator(), new IdGenerator());
            paymentBusiness.singlePaymentStatus(input).catch((error) => {
                expect(Authenticator.mock.calls.length).toBe(1);
                expect(error.message).toBe("Payment didn't exist");
                done();
            });
        });
        test("Should return success", (done) => {
            PaymentDatabase = jest.fn().mockImplementation(() => {
                return {
                    getPaymentByPaymentId: jest.fn().mockResolvedValue({ Payment: {} }),
                };
            });
            const input = {
                paymentId: "randomPaymentId",
                token,
            };
            const paymentBusiness = new PaymentBusiness_1.PaymentBusiness(new PaymentDatabase(), new Authenticator(), new IdGenerator());
            paymentBusiness.singlePaymentStatus(input).then((response) => {
                expect(response.Payment).not.toBe(undefined);
                expect(PaymentDatabase.mock.calls.length).toBe(1);
                done();
            });
        });
    });
    describe("deletePayment", () => {
        test("Should return 'Missing parameter'", (done) => {
            const input = {
                paymentId: "",
                token,
            };
            const paymentBusiness = new PaymentBusiness_1.PaymentBusiness(new PaymentDatabase(), new Authenticator(), new IdGenerator());
            paymentBusiness.deletePayment(input).catch((error) => {
                expect(error.message).toBe("Missing parameter");
                done();
            });
        });
        test("Should return 'Invalid Token'", (done) => {
            const input = {
                paymentId: "randomPaymentId",
                token: "",
            };
            const paymentBusiness = new PaymentBusiness_1.PaymentBusiness(new PaymentDatabase(), new Authenticator(), new IdGenerator());
            paymentBusiness.deletePayment(input).catch((error) => {
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
            const input = {
                paymentId: "randomPaymentId",
                token,
            };
            const paymentBusiness = new PaymentBusiness_1.PaymentBusiness(new PaymentDatabase(), new Authenticator(), new IdGenerator());
            paymentBusiness.deletePayment(input).catch((error) => {
                expect(Authenticator.mock.calls.length).toBe(1);
                expect(error.message).toBe("Invalid Token");
                done();
            });
        });
        test("Should return 'User not found'", (done) => {
            PaymentDatabase = jest.fn().mockImplementation(() => {
                return {
                    getBuyerById: jest.fn().mockResolvedValue(undefined),
                };
            });
            const input = {
                paymentId: "randomPaymentId",
                token,
            };
            const paymentBusiness = new PaymentBusiness_1.PaymentBusiness(new PaymentDatabase(), new Authenticator(), new IdGenerator());
            paymentBusiness.deletePayment(input).catch((error) => {
                expect(Authenticator.mock.calls.length).toBe(1);
                expect(error.message).toBe("User not found");
                done();
            });
        });
        test("Should return 'Payment didn't exist'", (done) => {
            const input = {
                paymentId: "randomPaymentId",
                token,
            };
            const paymentBusiness = new PaymentBusiness_1.PaymentBusiness(new PaymentDatabase(), new Authenticator(), new IdGenerator());
            paymentBusiness.deletePayment(input).catch((error) => {
                expect(Authenticator.mock.calls.length).toBe(1);
                expect(error.message).toBe("Payment didn't exist");
                done();
            });
        });
        test("Should return success", (done) => {
            PaymentDatabase = jest.fn().mockImplementation(() => {
                return {
                    getPaymentByPaymentId: jest.fn().mockResolvedValue({ Payment: {} }),
                    getBuyerById: jest.fn().mockResolvedValue({ buyerId: "9876543210" }),
                    deletePaymentDB: jest.fn().mockResolvedValue({}),
                };
            });
            const input = {
                paymentId: "randomPaymentId",
                token,
            };
            const paymentBusiness = new PaymentBusiness_1.PaymentBusiness(new PaymentDatabase(), new Authenticator(), new IdGenerator());
            paymentBusiness.deletePayment(input).then((response) => {
                expect(response.message).toBe("Payment deleted successfully");
                expect(PaymentDatabase.mock.calls.length).toBe(1);
                done();
            });
        });
    });
    describe("Payment models", () => {
        test("Should return mocked payment data correctly using getters", () => {
            const date = new Date();
            const payment = new Payment_1.Payment(200, Payment_1.PAYMENT_TYPE.CREDIT_CARD, Payment_1.PAYMENT_STATUS.PENDENTE, "5555666677778884", date);
            const result = {
                amount: payment.getAmount(),
                paymentType: payment.getType(),
                paymentStatus: payment.getPaymentStatus(),
                cardNumber: payment.getCardNumber(),
                paymentDate: payment.getPaymentDate(),
            };
            expect(result).toEqual({
                amount: 200,
                paymentType: "CREDIT_CARD",
                paymentStatus: "PENDENTE",
                cardNumber: "5555666677778884",
                paymentDate: date,
            });
        });
        test("Should return mocked payment data correctly using setters", () => {
            const date = new Date();
            const payment = new Payment_1.Payment(200, Payment_1.PAYMENT_TYPE.CREDIT_CARD, Payment_1.PAYMENT_STATUS.PENDENTE, "5555666677778884", new Date());
            payment.setAmount(300);
            payment.setType(Payment_1.PAYMENT_TYPE.BOLETO);
            payment.setPaymentStatus(Payment_1.PAYMENT_STATUS.APROVADO);
            payment.setCardNumber("");
            payment.setPaymentDate(date);
            const result = {
                amount: payment.getAmount(),
                paymentType: payment.getType(),
                paymentStatus: payment.getPaymentStatus(),
                cardNumber: payment.getCardNumber(),
                paymentDate: payment.getPaymentDate(),
            };
            expect(result).toEqual({
                amount: 300,
                paymentType: "BOLETO",
                paymentStatus: "APROVADO",
                cardNumber: "",
                paymentDate: date,
            });
        });
    });
});
//# sourceMappingURL=PaymentBusiness.test.js.map