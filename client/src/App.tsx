import { BrowserRouter, Route, Routes } from "react-router";
import VirtualCard from "./pages/cards/Card";
import CardListing from "./pages/cards/CardsListing";
import CardNew from "./pages/cards/CardNew";
import CardEdit from "./pages/cards/CardEdit";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import AuthProvider from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="dashboard" element={<CardListing />} />
            <Route path="dashboard/cards" element={<CardListing />} />
            <Route path="dashboard/cards/new" element={<CardNew />} />W
            <Route path="dashboard/cards/:id/edit" element={<CardEdit />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>

          <Route path="cards/:id" element={<VirtualCard />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
