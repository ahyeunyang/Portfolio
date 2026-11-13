import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import UxUiDesign from "./pages/UxUiDesign/UxUiDesign";
import UiPublishing from "./pages/UiPublishing/UiPublishing";
import Frontend from "./pages/Frontend/Frontend";
import EditorialDesign from "./pages/EditorialDesign/EditorialDesign";
import About from "./pages/About/About";
import Career from "./pages/Career/Career";
import Skills from "./pages/Skills/Skills";
const routes = {
  "/ux-ui-design": { component: UxUiDesign, title: "UX/UI 디자인" },
  "/ui-publishing": { component: UiPublishing, title: "UI 퍼블리싱" },
  "/frontend": { component: Frontend, title: "프론트엔드" },
  "/editorial-design": { component: EditorialDesign, title: "편집디자인" },
  "/about": { component: About, title: "자기소개" },
  "/career": { component: Career, title: "경력소개" },
  "/skills": { component: Skills, title: "보유기술" },
};
function PageLayout() {
  const { pathname } = useLocation();
  const route = routes[pathname.replace(/\/$/, "")];
  useEffect(() => {
    document.title = route
      ? route.title + " | 양아연 포트폴리오"
      : "양아연 — Design & Development";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, route]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {Object.entries(routes).map(([path, { component: Page }]) => (
          <Route key={path} path={path} element={<Page />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}
export default function App() {
  return (
    <BrowserRouter>
      <PageLayout />
    </BrowserRouter>
  );
}
