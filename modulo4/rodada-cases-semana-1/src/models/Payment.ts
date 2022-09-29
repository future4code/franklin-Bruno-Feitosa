import { Card, CardInputDTO } from "./Card";

export enum PAYMENT_TYPE {
  CREDIT_CARD = "CREDIT_CARD",
  BOLETO = "BOLETO",
}

export class Payment {
  constructor(
    private amount: number,
    private type: PAYMENT_TYPE,
    private payment_card_number: string
  ) {}

  // Getters

  public getAmount = () => {
    return this.amount;
  };

  public getType = () => {
    return this.type;
  };

  public getCardNumber = () => {
    return this.payment_card_number;
  };

  public setAmount = (amount: number) => {
    this.amount = amount;
  };

  public setType = (type: PAYMENT_TYPE) => {
    this.type = type;
  };

  public setCardNumber = (card: string) => {
    this.payment_card_number = card;
  };
}

export interface IPaymentInputDTO {
  amount: number;
  type: PAYMENT_TYPE;
  card: CardInputDTO;
}

export interface IPaymentInputDTODB {
  id: string;
  payment: IPaymentInputDTO;
}
