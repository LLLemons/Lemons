import { AxiosResponse } from 'axios';

export namespace Basic {
  export interface BaseProps<T = any> {
    location?: Location & { query: any };
    activated?: Function;
    deactivated?: Function;
  }
  export interface BaseResponse<T = any> extends AxiosResponse<T> {
    total?: number;
    success?: boolean;
    headers: {
      'X-Total-Count'?: number;
      'x-total-count'?: number;
      totalCount?: number;
      [propName: string]: any;
    };
  }
}
export enum ViewType {
  look = 'look',
  add = 'add',
  edit = 'edit',
}
