import axios from "axios";
import { useState } from "react";

export default function CommentForm({ post_id }) {
  const base_url = import.meta.env.VITE_API_BASE_URL;

  const [commentForm, setCommentForm] = useState({
    post_id: post_id,
    comment: "",
    email: "",
    website: "",
    name: "",
  });

  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);

  function sendComment(evt) {
    evt.preventDefault();
    setIsDisabled(true);

    axios
      .post(base_url + "save_comment", commentForm)
      .then((result) => {
        if (result.data.validation_error) {
          setErrors(result.data.validation_error);
        } else {
          setCommentForm({
            post_id: post_id,
            comment: "",
            email: "",
            website: "",
            name: "",
          });
          setErrors({});
        }
        setIsDisabled(false);
      })
      .catch((error) => {
        console.log(error);
        setIsDisabled(false);
      });
  }

  return (
    <>
      <form action="" className="grid grid-cols-2 gap-3 ">
        <div className="col-span-2">
          <textarea
            name=""
            id=""
            rows={6}
            placeholder="comment"
            className="block border border-gray-300 w-full p-2 rounded-2xl"
            value={commentForm.comment}
            onChange={(evt) =>
              setCommentForm({ ...commentForm, comment: evt.target.value })
            }
          ></textarea>
          <span className="text-red-400">
            {errors.comment ? errors.comment[0] : ""}
          </span>
        </div>
        <div className="">
          <input
            type="text"
            placeholder="email"
            className="block border border-gray-300 w-full p-2 rounded-2xl"
            value={commentForm.email}
            onChange={(evt) =>
              setCommentForm({ ...commentForm, email: evt.target.value })
            }
          />
          <span className="text-red-400">
            {errors.email ? errors.email[0] : ""}
          </span>
        </div>
        <div className="">
          <input
            type="text"
            placeholder="website"
            className="block border border-gray-300 w-full p-2 rounded-2xl"
            value={commentForm.website}
            onChange={(evt) =>
              setCommentForm({ ...commentForm, website: evt.target.value })
            }
          />
          <span className="text-red-400">
            {errors.website ? errors.website[0] : ""}
          </span>
        </div>
        <div className="col-span-2">
          <input
            type="text"
            placeholder="name"
            className="block border border-gray-300 w-full p-2 rounded-2xl"
            value={commentForm.name}
            onChange={(evt) =>
              setCommentForm({ ...commentForm, name: evt.target.value })
            }
          />
          <span className="text-red-400">
            {errors.name ? errors.name[0] : ""}
          </span>
        </div>
        <div className="col-span-2">
          <button
            onClick={(evt) => sendComment(evt)}
            disabled={isDisabled}
            className="bg-blue-400 text-white py-3 px-6 rounded-4xl"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
