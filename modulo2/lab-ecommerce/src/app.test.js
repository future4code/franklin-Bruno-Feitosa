import React from "react";
import { getByText, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

describe("Home Page tests", () => {
  test("Indicador de quantidade de produtos começa em 3", () => {
    const { getByText } = render(<App />);
    const quantity = getByText(/quantidade/i);
    expect(quantity).toHaveTextContent("Quantidade de produtos: 3");
  });

  test("Sem valor mínimo, há quatro produtos, e isso é indicado corretamente", () => {
    const { getByLabelText, getAllByText, getByText } = render(<App />);
    const filtroMinimo = getByLabelText(/filtro mínimo/i);
    userEvent.clear(filtroMinimo);

    const indicador = getByText(/Quantidade de Produtos/i);
    const quantity = getAllByText(/Produto/);

    expect(indicador).toHaveTextContent("Quantidade de produtos: 4");
    expect(quantity.length).toBe(4);
  });

  test("Filtro de busca por nome funciona, e encontra produto com 'legal' no nome", () => {
    const { getAllByText, getByLabelText } = render(<App />);

    const buscaNome = getByLabelText("Busca por nome:");
    userEvent.type(buscaNome, "legal");
    const produtos = getAllByText(/Produto/);
    expect(produtos.length).toBe(1);
  });

  test("Ordenação decrescente garante produto de preço maior na frente.", () => {
    const { getAllByText, getByLabelText, getByText } = render(<App />);
    const selectOrdenacao = getByLabelText(/Ordenação:/);
    userEvent.selectOptions(selectOrdenacao, getByText(/Decrescente/));

    const [primeiro, segundo] = getAllByText(/R\$/);

    const primeiroValor = Number(
      primeiro.textContent.split(" ")[1].split(",")[0]
    );
    const segundoValor = Number(
      segundo.textContent.split(" ")[1].split(",")[0]
    );
    expect(primeiroValor).toBeGreaterThan(segundoValor);
  });

  test.skip("Filtro de busca por nome funciona, e encontra produto com 'legal' no nome", () => {
    const { getAllByText, getByLabelText } = render(<App />);
    const filtroNome = getByLabelText("Busca por nome:");
    userEvent.type(filtroNome, "legal");
    const produtos = getAllByText(/Produto /);
    expect(produtos).toHaveLength(1);
  });

  test.skip("Ordenação decrescente garante produto de preço maior na frente.", () => {
    const { getAllByText, getByLabelText, getByText } = render(<App />);
    const ordenacaoSelect = getByLabelText(/Ordenação:/);
    userEvent.selectOptions(ordenacaoSelect, getByText(/Decrescente/));
    const [primeiro, segundo] = getAllByText(/R\$/);
    const precoPrimeiro = Number(
      primeiro.textContent.split(" ")[1].split(",")[0]
    );
    const precoSegundo = Number(
      segundo.textContent.split(" ")[1].split(",")[0]
    );
    expect(precoPrimeiro).toBeGreaterThan(precoSegundo);
  });
});
