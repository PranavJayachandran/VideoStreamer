import React, { useEffect, useState } from "react";
import { addComment, getCommenttree } from "../helpers/commenthelper";
import { IComment } from "../interfaces/IComment";
import Comment from "./Comment";
import { IoSend } from "react-icons/io5";
import { getUser } from "../utils/userAuth";

const Comments = ({ video_id }: { video_id: number }) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [replyComment, setReplyComment] = useState<string>("");
  const fetchComments = async () => {
    let p = await getCommenttree(video_id);
    setComments(p);
  };
  const addReply = async () => {
    let id = await addComment(replyComment, 0, video_id);

    let user = await getUser();
    let p: IComment = {
      id: id,
      user_id: user.id,
      video_id: video_id,
      comment_id: 0,
      comment: replyComment,
      username: user.username,
    };
    if (comments != null) setComments((prev) => [...prev, p]);
    setReplyComment("");
  };
  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <div className="mt-6 px-10">
      <h1 className="text-lg font-semibold">Comments</h1>
      <div className="flex w-full gap-4">
        <input
          type="text"
          placeholder="Comment"
          className="p-0 w-40 bg-transparent text-xs border-b"
          value={replyComment}
          onChange={(e) => setReplyComment(e.target.value)}
        />
        <button onClick={addReply}>
          <IoSend />
        </button>
      </div>
      <div>
        {comments?.map((item) => (
          <Comment comment={item} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
