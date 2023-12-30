import { IComment } from "../interfaces/IComment";
import { getCookie } from "../utils/cookie";
const buildTree = (comments: IComment[], parentId: number): IComment[] => {
  const node: Record<number, IComment> = {};

  comments
    .filter((comment) => comment.comment_id === parentId)
    .forEach((comment) => {
      const children = buildTree(comments, comment.id);
      if (children.length) {
        comment.children = children;
      }
      node[comment.id] = comment;
    });

  return Object.values(node);
};

export const getCommenttree = async (video_id: number) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  let data = [];
  try {
    let response = await fetch(
      `http://localhost:3001/comment?video_id=${video_id}`,
      requestOptions
    );
    let result = await response.json();
    data = result;
  } catch (error) {
    console.log(error);
  }
  console.log(data);
  const tree: IComment[] = buildTree(data, 0);

  return tree;
};

export const addComment = async (
  comment: string,
  comment_id: number,
  video_id: number
) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${getCookie("cookie")}`);

  var requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    body: JSON.stringify({
      comment,
      video_id,
      comment_id,
    }),
  };
  let response = await fetch(
    "http://localhost:3001/comment/add",
    requestOptions
  );
  let result = await response.json();
  return result.id;
};
