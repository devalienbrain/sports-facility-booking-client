export type TRole = "user" | "admin";

export type TUser = {
  _id: string;
  name: string;
  photoUrl: string;
  email: string;
  password: string;
  phone: string;
  role: TRole;
  address: string;
  isDeleted: boolean;
};
export type TUsersResponse = {
  data: TUser[];
};
