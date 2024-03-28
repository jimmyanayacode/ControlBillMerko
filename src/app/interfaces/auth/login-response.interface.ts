import { User } from "./user-response.interface";

export interface LoginUserResponse {
  user:  User;
  token: string;
}


