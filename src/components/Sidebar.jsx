import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [posts, setPosts] = useState([]);
  const base_url = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    axios
      .get(base_url + "recent_posts/5")
      .then((result) => setPosts(result.data.posts))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold bg-amber-50 p-2">Recent Posts</h1>
      <div>
        {posts.map((post) => (
          <div
            className="grid grid-cols-3 gap-3 items-center mt-4"
            key={post.id}
          >
            <div className="">
              <img src={post.image_url} alt="" className="rounded" />
            </div>
            <div className="col-span-2">
              <div>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </div>
              <span className="text-sm ">{post.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
