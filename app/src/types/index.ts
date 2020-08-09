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
