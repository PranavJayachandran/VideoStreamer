import React, { useEffect, useState } from "react";
import { IComment } from "../interfaces/IComment";
import * as Accordion from "@radix-ui/react-accordion";
import { IoSend } from "react-icons/io5";
import { addComment } from "../helpers/commenthelper";
import { getUser } from "../utils/userAuth";

const Comment = ({ comment }: { comment: IComment }) => {
  const [commentState, setCommentState] = useState<IComment>(comment);
  const [showReplies, setShowReplies] = useState<Boolean>(false);
  const [replyComment, setReplyComment] = useState<string>("");
  const addReply = async () => {
    let id = await addComment(replyComment, comment.id, comment.video_id);
    let p: IComment[] = [];
    if (commentState.children) p = commentState.children;
    let user = await getUser();
    p.push({
      id: id,
      user_id: user.id,
      video_id: comment.video_id,
      comment_id: comment.id,
      comment: replyComment,
      username: user.username,
    });
    setCommentState((prev) => ({
      ...prev,
      children: p,
    }));
    setReplyComment("");
  };
  return (
    <div className="flex gap-2 mt-4">
      <div className="mt-4 h-10 w-10 bg-red-100 rounded-full"></div>
      <div>
        <div className="text-sm text-gray-300">{commentState.username}</div>
        <div className="text-sm">{commentState.comment}</div>

        <Accordion.Root
          className="AccordionRoot"
          type="multiple"
          onValueChange={(itemName) => {
            if (itemName.includes("Replies")) setShowReplies(true);
            else setShowReplies(false);
          }}
        >
          {commentState.children ? (
            <Accordion.Item value="Replies">
              <Accordion.Header>
                <Accordion.Trigger className="text-xs text-blue-400 hover:underline cursor-pointer">
                  {showReplies === true ? "Hide replies" : "Load Replies"}
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content>
                <div className="pl-10">
                  {commentState.children?.map((item: IComment) => (
                    <Comment comment={item} />
                  ))}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ) : (
            <></>
          )}
          <Accordion.Item value="InputReply">
            <Accordion.Header>
              <Accordion.Trigger className="text-xs text-blue-400 hover:underline cursor-pointer">
                Reply
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
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
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    </div>
  );
};

export default Comment;
