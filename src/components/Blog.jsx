import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Blog() {
  const base_url = import.meta.env.VITE_API_BASE_URL;

  const [posts, setPosts] = useState([]);
  const [searchParam, setSearchparam] = useSearchParams({ qry: "" });

  useEffect(() => {
    axios
      .get(base_url + "all_posts?qry=" + searchParam.get("qry"))
      .then((result) => setPosts(result.data.posts))
      .catch((error) => console.log(error));
  }, [searchParam]);
  return (
    <div className="container mx-auto py-20">
      <div className=" mx-auto grid grid-cols-4 gap-3">
        <div className="col-span-3">
          <div className="mb-10">
            <input
              type="text"
              value={searchParam.get("qry")}
              onChange={(evt) => setSearchparam({ qry: evt.target.value })}
              className="block border border-gray-300 border-2 p-3 w-1/1 rounded-3xl"
              placeholder="search posts"
            />
          </div>
          <div className="posts">
            {posts.length == 0 ? (
              <h1 className="text-5xl text-center">No Posts Found</h1>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="grid grid-cols-3 gap-2 mb-3 items-center "
                >
                  <div className="">
                    <img src={post.image_url} alt="" className="w-1/1" />
                  </div>
                  <div className="col-span-2">
                    <h1>
                      <Link to={`/posts/${post.id}`}>{post.title}</Link>
                    </h1>
                    <span className="text-sm text-gray-400">{post.date}</span>
                    <p>
                      <Link to={`/category/${post.category.name}`}>
                        {post.category.name}
                      </Link>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="col-span-1">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
