export class ErrorHandler extends Error {
  constructor(message: string, public errorCode: number) {
    super(message);
  }
}
