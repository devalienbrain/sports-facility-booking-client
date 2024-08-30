export type TRole = "user" | "admin";

export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: TRole;
  address: string;
  isDeleted: boolean;
};
