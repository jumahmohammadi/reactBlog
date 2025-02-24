import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Comment from "./Comment";
import Sidebar from "./Sidebar";
import CommentForm from "./CommentForm";

export default function Single() {
  const params = useParams();
  const post_id = params.post_id;
  const base_url = import.meta.env.VITE_API_BASE_URL;

  const [post, setPost] = useState({});

  useEffect(() => {
    axios
      .get(base_url + "post/" + post_id)
      .then((result) => {
        setPost(result.data.post);
      })
      .catch((error) => console.log(error));
  }, [post_id]);

  return (
    <div>
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-4 gap-3">
          <div className="col-span-3">
            <h1 className="text-5xl font-bold">{post.title}</h1>
            <div className="mt-6 flex items-center text-gray-400 gap-x-4">
              <div className="flex items-center gap-1">
                <img
                  src={post.author?.image_url}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
                {post.author?.name} {post.author?.last_name}
              </div>
              <div>
                <Link to={`/category/${post.category?.name}`}>
                  {" "}
                  {post.category?.name}
                </Link>
              </div>
              <div>{post.date}</div>
            </div>
            <div className="post-image mt-5">
              <img
                src={post.image_url}
                alt=""
                className="max-w-full rounded-2xl"
              />
            </div>
            <div
              className="my-5 text-gray-400"
              dangerouslySetInnerHTML={{ __html: post.detail }}
            ></div>
            <hr />
            <div className="post-tags mt-1.5 text-gray-400 space-x-3">
              {post.tags?.map((tag) => (
                <span key={tag.id}>#{tag.name}</span>
              ))}
            </div>

            {/* comment section */}
            <div className="comment-area  mx-auto my-6">
              <div className="comment-list">
                {post.comments?.map((comment) => (
                  <Comment
                    comment={comment}
                    key={comment.id}
                    post_id={post.id}
                  />
                ))}
              </div>
              <div className="mt-4">
                <h1 className="text-3xl font-bold mb-5">Leave a Comment</h1>
                <CommentForm post_id={post_id} />
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
