import { PaymentDatabase } from "../database/PaymentDatabase";
import { Buyer } from "../models/Buyer";
import {
  IPaymentInputDTO,
  IPaymentInputDTODB,
  Payment,
  PAYMENT_TYPE,
} from "../models/Payment";
import { Authenticator, ITokenPayload } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class PaymentBusiness {
  constructor(
    protected PaymentDatabase: PaymentDatabase,
    protected Authenticator: Authenticator,
    protected IdGenerator: IdGenerator
  ) {}

  public createPayment = async (input: IPaymentInputDTO) => {
    const amount = input.amount;
    const type = input.type;
    const card = input.card;

    const id: string = this.IdGenerator.generate();

    if (!amount || !type) {
      throw new Error("Invalid Parameters");
    }
    if (!card && type !== PAYMENT_TYPE.BOLETO) {
      throw new Error("Invalid Card");
    }

    if (card && type !== PAYMENT_TYPE.CREDIT_CARD) {
      throw new Error(
        "Shouldn't put Card info if payment type isn't credit card"
      );
    }

    if (type !== PAYMENT_TYPE.BOLETO && type !== PAYMENT_TYPE.CREDIT_CARD) {
      throw new Error("Invalid Payment Type");
    }

    const buyerId = "92842f39-e0da-4346-a5b5-689e86e3f33e";
    const buyer = await this.PaymentDatabase.getBuyerById(buyerId);

    const payment = new Payment(amount, type, card.cardNumber);

    const paymentInputDB: IPaymentInputDTODB = {
      id: buyer.buyer_id,
      payment: {
        amount: payment.getAmount(),
        type: payment.getType(),
        card,
      },
    };

    await this.PaymentDatabase.createPaymentDB(paymentInputDB);

    const response = {
      message: "Pagamento cadastrado com sucesso",
    };

    return response;
  };
}
