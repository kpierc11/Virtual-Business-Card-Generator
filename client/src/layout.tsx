import { Outlet } from "react-router";
import Header from "./components/Header";

function MainLayout() {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center w-[100%] mt-10 ">
        <Outlet />
      </div>
    </>
  );
}

export default MainLayout;
