export class Card {
  constructor(
    private cardNumber: string,
    private cardHolderName: string,
    private cardExpirationDate: string,
    private cardCVV: number,
    private cardIssuer: string
  ) {}

  // Getters

  public getCardNumber = () => {
    return this.cardNumber;
  };

  public getCardHolderName = () => {
    return this.cardHolderName;
  };

  public getCardExpirationDate = () => {
    return this.cardExpirationDate;
  };

  public getCardCVV = () => {
    return this.cardCVV;
  };

  public getCardIssuer = () => {
    return this.cardIssuer;
  };
}

export interface ICardInputDTO {
  cardNumber: string;
  cardHolderName: string;
  cardExpirationDate: string;
  cardCVV: number;
}
export interface ICardInputDTODB {
  buyer_id: string;
  card: Card;
}
export interface IGetSingleCardInputDTO {
  token: string;
  cardNumber: string;
}
export interface IDeleteCardInputDTO {
  token: string;
  cardNumber: string;
}
export interface ICardOutputDTODB {
  cardNumber: string;
  cardHolderName: string;
  cardExpirationDate: string;
  cardCVV: number;
  cardIssuer: string;
  buyerId: string;
}
