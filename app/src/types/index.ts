export type UserResponseType = {
  _id: string;
  name: string;
  role: string;
};

export type Story = {
  _id: string;
  createdAt: Date;
  name: string;
  description: string;
  points: number | null;
  isActive: boolean;
  isDeleted: boolean;
};

export type RoomType = {
  users: UserResponseType[];
  tasks: Story[];
};
