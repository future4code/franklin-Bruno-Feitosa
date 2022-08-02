import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import ProductCard from "./components/ProductCard/ProductCard";
import CartScreen from "./screens/CartScreen/CartScreen";

test("Comprar um produto", () => {
  const { getByText } = render(<ProductCard />);

  userEvent.click(getByText(/comprar/i));
  userEvent.click(getByText(/comprar/i));
});

test("Ir para o carrinho", () => {
  const { getByRole } = render(<App />);

  userEvent.click(
    getByRole("button", {
      name: /carrinho/i,
    })
  );
});

// test("Remover item do carrinho", () => {
//   const { getByRole } = render(<ProductItem />);

//   userEvent.click(
//     getByRole("button", {
//       name: /remover/i,
//     })
//   );
// });

test("Verifica se o total do carrinho vazio é 0", () => {
  const { getByText } = render(<App />);

  const totalValue = getByText(/Total/i);
  // console.log(getByText(/Total/i));
  // console.log(total);
  expect(totalValue.textContent).toBe("Total: R$0");
});
