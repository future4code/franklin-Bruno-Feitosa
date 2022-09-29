export class Card {
  constructor(
    private cardHolderName: string,
    private cardNumber: string,
    private cardExpirationDate: string,
    private cardCVV: number
  ) {}

  // Getters

  public getCardHolderName = () => {
    return this.cardHolderName;
  };

  public getCardNumber = () => {
    return this.cardNumber;
  };

  public getCardExpirationDate = () => {
    return this.cardExpirationDate;
  };
  public getCardCVV = () => {
    return this.cardCVV;
  };
}

export interface CardInputDTO {
  cardHolderName: string;
  cardNumber: string;
  cardExpirationDate: string;
  cardCVV: number;
}
