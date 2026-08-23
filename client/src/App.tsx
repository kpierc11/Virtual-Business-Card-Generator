import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import VirtualCard from "./pages/cards/Card";
import CardListing from "./pages/cards/CardsListing";
import CardNew from "./pages/cards/CardNew";
import CardEdit from "./pages/cards/CardEdit";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<CardListing />} />
          <Route path="cards" element={<CardListing />} />
          <Route path="cards/new" element={<CardNew />} />
          <Route path="cards/:id/edit" element={<CardEdit />} />
        </Route>

        <Route element={<AuthLayout/>}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        <Route path="cards/:id" element={<VirtualCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
