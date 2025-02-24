import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Category() {
  const params = useParams();
  const name = params.name;
  const base_url = import.meta.env.VITE_API_BASE_URL;

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(base_url + "posts_by_category/" + name + "/30")
      .then((result) => {
        setPosts(result.data.posts);
      })
      .catch((error) => console.log(error));
  }, [name]);

  return (
    <>
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-4 gap-3 mx-auto">
          <div className="col-span-3">
            {posts.length == 0 ? (
              <h1 className="text-5xl text-center">No Posts Found</h1>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="grid grid-cols-3 gap-2 mb-4 items-center "
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
          <div className="col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}
