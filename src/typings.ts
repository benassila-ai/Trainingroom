export type User = {
  fullname: string;
  email: string;
  password: string;
  role: string;
  id?: number;
};

export type LoginUser = Omit<User, "fullname" | "role" | "id">;

export type Member = User & { courses: number[] };