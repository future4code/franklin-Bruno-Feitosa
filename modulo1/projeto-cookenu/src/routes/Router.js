import { Routes, Route } from "react-router-dom";
import AddRecipesPage from "../pages/AddRecipesPage/AddRecipesPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RecipeDetailPage from "../pages/RecipeDetailPage/RecipeDetailPage";
import RecipesListPage from "../pages/RecipesListPage/RecipesListPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const Router = (props) => {
  const { setRightButtonText } = props;
  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage setRightButtonText={setRightButtonText} />}
      ></Route>
      <Route
        path="/cadastro"
        element={<SignUpPage setRightButtonText={setRightButtonText} />}
      ></Route>
      <Route path="/" element={<RecipesListPage />}></Route>
      <Route
        exact
        path="/adicionar-receita"
        element={<AddRecipesPage />}
      ></Route>
      <Route path="/detalhe/:id" element={<RecipeDetailPage />}></Route>
      <Route path="*" element={<ErrorPage />}></Route>
    </Routes>
  );
};

export default Router;
