export interface IUser {
  todos: IToDo[];
}

export interface IToDo {
  uuid: string;
  name: string;
  isDone: boolean;
}