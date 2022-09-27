export interface User {
  name: string;
  balance: number;
}

export const performPurchase = (
  user: User,
  value: number
): User | undefined => {
  const userName: string = user.name;
  const userBalance: number = user.balance;

  if (userBalance < value) return undefined;

  const newUser: User = { ...user, balance: userBalance - value };

  return newUser;
};
