export interface IUser {
  username: string;
  email: string;
  password: string;
  designation: string;
  aboutMe: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User implements IUser {
  username: string;
  email: string;
  password: string;
  designation: string;
  aboutMe: string;
  createdAt: Date;
  updatedAt: Date;

  constructor() {}
}
