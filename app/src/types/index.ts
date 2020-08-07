export type UserResponseType = {
  _id: string;
  name: string;
  role: string;
};

export type Task = {
  _id: string;
  name: string;
  points: number | null;
  meta: {};
};

export type RoomType = {
  users: UserResponseType[];
  tasks: Task[];
};
