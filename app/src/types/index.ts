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
  jiraId?: string;
  jiraKey?: string;
  jiraLink?: string;
};

export type VoteType = {
  userId: string;
  points?: number;
};

export type JiraEpicType = {
  id: string;
  key: string;
  name: string;
};

export type ReduxActionType = {
  type: string;
  payload?: string | {} | [] | number;
};

export type AppStateType = {
  loading: boolean;
  currentUser: UserType | boolean;
  usersList: UserType[];
  storiesList: StoryType[];
  userVote: boolean | string;
  votesList: VoteType[];
  votingEnded: boolean;
  summary: number;
};

export type JiraStateType = {
  epicsList: JiraEpicType[];
};

export type GlobalStateType = {
  app: AppStateType;
  jira: JiraStateType;
};
