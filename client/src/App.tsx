import { BrowserRouter, Route, Routes } from "react-router";
import VirtualCard from "./pages/cards/Card";
import CardListing from "./pages/cards/CardsListing";
import CardNew from "./pages/cards/CardNew";
import CardEdit from "./pages/cards/CardEdit";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";
import AuthProvider from "./context/AuthContext";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="dashboard" element={<CardListing />} />
            <Route path="dashboard/cards" element={<CardListing />} />
            <Route path="dashboard/cards/new" element={<CardNew />} />
            <Route path="dashboard/cards/:id/edit" element={<CardEdit />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="dashboard/cards/:id" element={<VirtualCard />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
