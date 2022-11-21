import creditCardType from "credit-card-type";
import { types as CardType } from "credit-card-type";

export class LuhnCheckAlgorithm {
  public luhnCheckAlgorithm = (cardNumber: string) => {
    let oddTotal: number = 0;
    let evenTotal: number = 0;

    const checkSixteenDigits = () => {
      for (let i = 15; i >= 0; i--) {
        if (i % 2 !== 0) {
          oddTotal += Number(cardNumber[i]);
        }
        if (i % 2 === 0) {
          if (Number(cardNumber[i]) * 2 >= 10) {
            let doubleNumber = String(Number(cardNumber[i]) * 2);
            evenTotal += Number(doubleNumber[0]) + Number(doubleNumber[1]);
          } else {
            evenTotal += Number(cardNumber[i]) * 2;
          }
        }
      }

      const totalSum: number = oddTotal + evenTotal;

      const response: boolean = totalSum % 10 === 0;

      return response;
    };

    const checkFifteenDigits = () => {
      for (let i = 14; i >= 0; i--) {
        if ((i + 1) % 2 !== 0) {
          oddTotal += Number(cardNumber[i]);
        }
        if ((i + 1) % 2 === 0) {
          if (Number(cardNumber[i]) * 2 >= 10) {
            let doubleNumber = String(Number(cardNumber[i]) * 2);
            evenTotal += Number(doubleNumber[0]) + Number(doubleNumber[1]);
          } else {
            evenTotal += Number(cardNumber[i]) * 2;
          }
        }
      }

      const totalSum: number = oddTotal + evenTotal;

      const response: boolean = totalSum % 10 === 0;

      return response;
    };

    const checkValidCard =
      cardNumber.length === 16 ? checkSixteenDigits() : checkFifteenDigits();

    const checkCardIssuer = creditCardType(cardNumber);

    const response = {
      checkValidCard,
      creditCardIssuer: checkCardIssuer[0].niceType,
    };

    return response;
  };
}
