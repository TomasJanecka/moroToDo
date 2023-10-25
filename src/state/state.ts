import {atom} from "recoil";
import {IUser} from "../@types/api";

export const userState = atom<IUser>({
  key: 'user',
  default: {
    todos: [],
  }
});