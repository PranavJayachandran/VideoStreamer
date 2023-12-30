export interface IComment {
  id: number;
  user_id: number;
  video_id: number;
  comment_id: number;
  comment: string;
  username: string;
  children?: IComment[] | null;
}
