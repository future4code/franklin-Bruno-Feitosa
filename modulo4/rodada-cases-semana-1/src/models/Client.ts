export class Client {
  constructor(private id: string) {}

  // Getters

  public getId = () => {
    return this.id;
  };
}

export interface ClientDTO {
  id: string;
}
