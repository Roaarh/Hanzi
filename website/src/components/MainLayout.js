// src/layouts/MainLayout.jsx
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}
