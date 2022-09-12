import { Client } from "./Client";
import { Customer } from "./Customer";
import { Place } from "./Place";
import { User } from "./User";

// const bruno = new User("001", "bruno@email.com", "Bruno Britto", "12345678");
// console.log(bruno.getId(), bruno.getEmail(), bruno.getName());

const customer1 = new Customer(
  "001",
  "bruno@email.com",
  "Bruno Britto",
  "12345678",
  "123123123"
);

// console.log(customer1.getId());
// console.log(customer1.getEmail());
// console.log(customer1.getName());

console.log(customer1.introduceYourself());

const cliente: Client = {
  name: "Bruno Britto",
  registrationNumber: 123,
  consumedEnergy: 456,
  calculateBill: (): number => {
    return 2;
  },
};

console.log(cliente.name);
console.log(cliente.registrationNumber);
console.log(cliente.consumedEnergy);
console.log(cliente.calculateBill());
