import { IClient } from './IClient.interface';
import { IProject } from './IProject.interface';

export interface IReturn {
  data: IClient | IProject | any;
  message: string;
  authentication: string | null;
}
