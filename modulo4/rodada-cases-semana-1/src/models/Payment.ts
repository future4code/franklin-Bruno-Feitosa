import { ICardInputDTO } from "./Card";

export enum PAYMENT_TYPE {
  CREDIT_CARD = "CREDIT_CARD",
  BOLETO = "BOLETO",
}
export enum PAYMENT_STATUS {
  APROVADO = "APROVADO",
  PENDENTE = "PENDENTE",
}

export class Payment {
  constructor(
    private amount: number,
    private type: PAYMENT_TYPE,
    private status: PAYMENT_STATUS,
    private card_number: string | undefined,
    private payment_date: Date
  ) {}

  // Getters

  public getAmount = () => {
    return this.amount;
  };

  public getType = () => {
    return this.type;
  };

  public getPaymentStatus = () => {
    return this.status;
  };

  public getCardNumber = () => {
    return this.card_number;
  };

  public getPaymentDate = () => {
    return this.payment_date;
  };

  public setAmount = (amount: number) => {
    this.amount = amount;
  };

  public setType = (type: PAYMENT_TYPE) => {
    this.type = type;
  };

  public setPaymentStatus = (status: PAYMENT_STATUS) => {
    this.status = status;
  };

  public setCardNumber = (cardNumber: string) => {
    this.card_number = cardNumber;
  };

  public setPaymentDate = (paymentDate: Date) => {
    this.payment_date = paymentDate;
  };
}

export interface IPaymentInputDTO {
  amount: number;
  type: PAYMENT_TYPE;
  cardNumber: string | undefined;
}

export interface IPaymentInputDTODB {
  payment_id: string;
  buyer_id: string;
  payment: Payment;
}
export interface IPaymentStatusInputDTO {
  paymentId: string;
  token: string;
}
export interface IPaymentStatusOutputDTODB {
  paymentId: string;
  buyerId: string;
  amount: number;
  type: PAYMENT_TYPE;
  status: PAYMENT_STATUS;
  paymentDate: string;
}
