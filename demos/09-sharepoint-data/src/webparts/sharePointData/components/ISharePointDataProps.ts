/*
export interface ISharePointDataProps {
  description: string;
}
*/

import { ISPList } from '../ISPList';

export interface ISharePointDataProps {
  description: string;
  lists: ISPList[];
}
