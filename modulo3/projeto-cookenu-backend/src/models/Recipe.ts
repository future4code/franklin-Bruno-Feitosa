export enum USER_ROLES {
  ADMIN = "ADMIN",
  NORMAL = "NORMAL",
}

export class Recipe {
  constructor(
    private title: string,
    private description: string,
    private stepByStep: string
  ) {}

  // Getters

  public getTitle = () => {
    return this.title;
  };

  public getDescription = () => {
    return this.description;
  };

  public getStepByStep = () => {
    return this.stepByStep;
  };

  // public getCreationDate = () => {
  //   return this.creationDate;
  // };

  // public getUserRecipe = () => {
  //   return this.userRecipe;
  // };
}

export interface ICreateRecipeInputDTO {
  title: string;
  description: string;
  step_by_step: string;
}

export interface IRecipesDB {
  id: string;
  title: string;
  description: string;
  step_by_step: string;
  creation_date: string;
  user_id: string;
  user_name: string;
}

export interface GetRecipeOutputDTO {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}
