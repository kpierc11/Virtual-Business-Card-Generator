import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/layout";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import VirtualCard from "./pages/cards/Card";
import VirtualCards from "./pages/cards/CardsListing";
import CardListing from "./pages/cards/CardsListing";
import CardNew from "./pages/cards/CardNew";
import CardEdit from "./pages/cards/CardEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<CardListing />} />
          <Route path="cards" element={<CardListing />} />
          <Route path="cards/new" element={<CardNew />} />
          <Route path="cards/:id/edit" element={<CardEdit />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          {/* <Route path="cards" element={<VirtualCards />} /> */}
        </Route>

        <Route path="cards/:id" element={<VirtualCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
