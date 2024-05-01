import { User } from "./user-response.interface";

export interface CheckTokenInterface {
  user:  User;
  token: string;
}

