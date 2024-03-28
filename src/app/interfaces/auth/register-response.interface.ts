import { User } from "./user-response.interface";

export interface UserRegisterResponse {
  user:  User;
  token: string;
}


