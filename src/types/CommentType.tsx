export type CommentType = {
  id: string;
  text?: string;
  createdBy: string;
  createdImage?: string;
  createdDate: Date;
  likes: number;
  dislikes: number;
  hate: number;
  love: number;
  comments: CommentType[];
};
