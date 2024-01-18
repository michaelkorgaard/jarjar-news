import { CommentType } from "./CommentType";

export type NewsType = {
  id: string;
  image: string;
  title?: string;
  text?: string;
  createdBy: string;
  createdImage?: string;
  createdDate: Date;
  comments?: CommentType[];
};
