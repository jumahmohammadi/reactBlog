import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./partials/Header";
import Footer from "./partials/Footer";

import "./App.css";
import "./css/all.min.css";
import Home from "./components/Home";
import RecentPost from "./components/modules/RecentPost";
import PopularPost from "./components/modules/PopularPost";
import Single from "./components/Single";
import Blog from "./components/Blog";
import Category from "./components/Category";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" Component={Home}>
              <Route index element={<RecentPost />}></Route>
              <Route path="recent-posts" Component={RecentPost} index></Route>
              <Route path="popular-posts" Component={PopularPost}></Route>
            </Route>
            <Route path="/blog" Component={Blog}></Route>
            <Route path="/category/:name" Component={Category}></Route>
            <Route path="/posts/:post_id" Component={Single}></Route>
            <Route path="/*" Component={NotFound}></Route>
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
