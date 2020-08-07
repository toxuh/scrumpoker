export type UserResponseType = {
  _id: string;
  name: string;
  role: string;
};

export type Task = {
  _id: string;
  createdAt: Date;
  name: string;
  points: number | null;
  active: boolean;
};

export type RoomType = {
  users: UserResponseType[];
  tasks: Task[];
};
