import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ArticlesPage from "./pages/ArticlesPage";
import ArticlePage from "./pages/ArticlePage";
import { CategoriesIndexPage } from "./pages/CategoriesPage";
import CategoryPage from "./pages/CategoriesPage";
import AboutPage from "./pages/AboutPage";
import SearchPage from "./pages/SearchPage";
import PrivacyPage from "./pages/PrivacyPage";
import FeedbackPage from "./pages/FeedbackPage";
import ManonaTrilogyPage from "./pages/ManonaTrilogyPage";
import SitemapPage from "./pages/SitemapPage";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "articles", Component: ArticlesPage },
      { path: "articles/:slug", Component: ArticlePage },
      { path: "categories", Component: CategoriesIndexPage },
      { path: "categories/:slug", Component: CategoryPage },
      { path: "about", Component: AboutPage },
      { path: "search", Component: SearchPage },
      { path: "privacy", Component: PrivacyPage },
      { path: "feedback", Component: FeedbackPage },
      { path: "manona-trilogy", Component: ManonaTrilogyPage },
      { path: "manona-trilogy/:slug", Component: ArticlePage },
      { path: "sitemap", Component: SitemapPage },
      { path: "*", Component: NotFound },
    ],
  },
], {
  basename: import.meta.env.BASE_URL,
});
