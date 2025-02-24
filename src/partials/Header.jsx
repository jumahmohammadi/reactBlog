import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
export default function Header() {
  const [setting, setSetting] = useState({});
  const [categories, setCategories] = useState([]);
  const base_url = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios
      .get(base_url + "setting")
      .then((result) => setSetting(result.data.setting))
      .catch((error) => console.log(error));

    axios
      .get(base_url + "categories")
      .then((result) => setCategories(result.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <header>
        <div className="bg-purple-50">
          <div className="container mx-auto flex justify-between xs:flex-col lg:flex-row">
            <div className="menu flex ">
              <div className="brand mr-6 py-5">
                <img src={setting.image_url} alt="" />
              </div>
              <ul className="flex">
                <li>
                  <NavLink className="mr-4 py-6 inline-block" to="/">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink className="mr-4 py-6 inline-block" to="/blog">
                    Blog
                  </NavLink>
                </li>
                {categories.map((category) => (
                  <li key={category.id}>
                    {category.show_in_menu ? (
                      <NavLink
                        to={"/category/" + category.name}
                        className="mr-4 py-6 inline-block"
                      >
                        {category.name}
                      </NavLink>
                    ) : (
                      ""
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="social_links">
              <ul className="flex ">
                <li>
                  <a
                    href={setting.facebook_link}
                    className="ml-3 py-6 inline-block"
                  >
                    <span className="fab fa-facebook"></span>{" "}
                  </a>
                </li>
                <li>
                  <a
                    href={setting.twitter_link}
                    className="ml-3 py-6 inline-block"
                  >
                    <span className="fab fa-twitter"></span>
                  </a>
                </li>
                <li>
                  <a
                    href={setting.instagram_link}
                    className="ml-3 py-6 inline-block"
                  >
                    <span className="fab fa-instagram"></span>{" "}
                  </a>
                </li>
                <li>
                  <a
                    href={setting.youtube_link}
                    className="ml-3 py-6 inline-block"
                  >
                    <span className="fab fa-youtube"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
