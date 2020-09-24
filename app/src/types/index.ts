export type UserType = {
  _id: string;
  name: string;
  role: string;
};

export type StoryType = {
  _id: string;
  createdAt: Date;
  name: string;
  description: string;
  points: number | null;
  isActive: boolean;
  isDeleted: boolean;
};

export type VoteType = {
  userId: string;
  points?: number;
};

export type ReduxActionType = {
  type: string;
  payload?: string | {} | [] | number;
};

export type AppStateType = {
  loading: boolean;
  authenticated: boolean;
  usersList: UserType[];
  storiesList: StoryType[];
  userVote: boolean | string;
};

export type GlobalStateType = {
  app: AppStateType;
};
