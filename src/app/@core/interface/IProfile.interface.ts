export interface IUserStats {
  clients: number;
  projects: number;
  tasks: number;
}

export class UserStats implements IUserStats {
  clients: number;
  projects: number;
  tasks: number;

  constructor() {}
}
