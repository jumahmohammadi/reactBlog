import axios from "axios";
import { useState } from "react";

export default function Comment({ comment, post_id }) {
  const [hidenReply, setHidenReply] = useState(true);
  const [reply, setReply] = useState({
    post_id: post_id,
    parent_id: comment.id,
    name: "",
    email: "",
    comment: "",
  });
  const date = new Date(comment.created_at);

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const comment_date = year + "/" + month + "/" + day;
  const base_url = import.meta.env.VITE_API_BASE_URL;
  function sendReply(evt) {
    evt.preventDefault();

    axios
      .post(base_url + "save_comment", reply)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      {!comment.parent_id && (
        <div
          className="bg-amber-100 mb-2 rounded-2xl py-3 px-6"
          key={comment.id}
        >
          <h1 className="text-2xl">{comment.name}</h1>
          <span className="text-sm">{comment_date}</span>
          <p className="mt-3">{comment.comment}</p>
          <div className="ml-8 mt-4">
            <button
              type="button"
              onClick={() => setHidenReply(!hidenReply)}
              className="bg-amber-500 rounded-2xl py-2 px-6 mb-4"
            >
              Reply
            </button>
            <div className={hidenReply ? "hidden" : ""}>
              <form action="" className="grid grid-cols-2 gap-4 ">
                <input
                  type="text"
                  placeholder="name"
                  className="border border-gray-600 p-2 rounded-xl"
                  value={reply.name}
                  onChange={(evt) =>
                    setReply({ ...reply, name: evt.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="email"
                  className="border border-gray-600 p-2 rounded-xl"
                  value={reply.email}
                  onChange={(evt) =>
                    setReply({ ...reply, email: evt.target.value })
                  }
                />
                <textarea
                  name=""
                  id=""
                  className="col-span-2 border border-gray-600 p-2 rounded-xl"
                  placeholder="comment"
                  value={reply.comment}
                  onChange={(evt) =>
                    setReply({ ...reply, comment: evt.target.value })
                  }
                ></textarea>
                <button
                  className="bg-blue-300 py-2 px-4 rounded-2xl"
                  onClick={(evt) => sendReply(evt)}
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
