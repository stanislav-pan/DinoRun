export type Owner = {
  userId: number | null;
  firstName: string;
  secondName: string;
  displayName: string;
  login: string;
  email: string;
  phone: string;
  avatarUrl: string;
};

export type TopicRequest = {
  name: string;
  description: string;
};
export type CreateTopicResponse = {
  data: {
    id: number;
    name: string;
    description: string;
  };
};

export type CommentRequest = {
  topicId: number;
  text: string;
  parentId?: number;
};
export type AddCommentResponse = {
  data: {
    id: number;
    text: string;
    createdAt: string;
  };
};

export type ReactionOfCommentRequest = {
  commentId: number;
  emojiId: string;
};
export type ReactionOfComments = {
  id: string;
  emojiId: string;
  reactionUsers: {
    userName: string;
  }[];
}[];
export type ReactionOfCommentResponse = {
  data: ReactionOfComments;
};

export type CommentOwner = {
  id: number;
  displayName: string;
  avatarUrl: string;
};

export type TopicType = {
  id: number;
  name: string;
  description: string;
  user: CommentOwner;
  commentsCount: number;
};

export type CommonCommentType = {
  id: number;
  text: string;
  createdAt: string;
  userId: number;
  reactions: ReactionOfComments;
};
export type CommentsType = CommonCommentType & {
  children: CommonCommentType[];
};

export type ForumsType = {
  id: number;
  name: string;
  description: string;
  user: CommentOwner;
  commentsCount: number;
};

export type ForumResponse = {
  data: ForumsType[];
};
