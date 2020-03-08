export interface Paginate {
  page: number;
  pageSize: number;
  total: number;
}

export interface Result<T> {
  success: boolean;
  paginate: Paginate;
  sort?: string;
  dataSource: T[];
  cacheSearch: any;
}

export interface DataAdaptor<T, K> {
  requestAdaptor?: (payload: any) => any;
  responseAdaptor?: (response: K, payload: any) => Promise<Result<T>> | Result<T>;
}

export interface ListFunc<T> {
  (requester: Function, payload: any): Promise<Result<T>>;
}

export const defaultResponseAdaptor = (response: any, payload: any) => {
  const { page = 1, pageSize = 20, sort } = payload;
  const { data: dataSource, headers, status } = response;
  const success = status <= 200 && status < 300 && Array.isArray(dataSource);
  const { total = 0 } = response;
  const paginate = { page: Number(page), pageSize: Number(pageSize), total: Number(total) };
  return {
    success,
    paginate,
    sort,
    dataSource: success ? dataSource : ([] as any[]),
    cacheSearch: { ...payload, page, pageSize, sort },
  };
};
export const defaultRequestAdaptor = (payload: any) => {
  const { page = 1, pageSize = 20, sort } = payload;
  return {
    ...payload,
    size: pageSize,
    page: page - 1,
    sort: sort || 'id,DESC',
  };
};
/**
 *
 * @param {DataAdaptor<T, K>} adaptor T: dataSource item 类型, K: response 类型
 * @return {ListFunc<T>}
 */
export function dataLister<T = any, K = any>(adaptor?: DataAdaptor<T, K>): ListFunc<T> {
  return async (requester, payload) => {
    const query =
      adaptor && adaptor.requestAdaptor
        ? adaptor.requestAdaptor(payload)
        : defaultRequestAdaptor(payload);
    const response = await requester(query);
    if (adaptor && adaptor.responseAdaptor) return await adaptor.responseAdaptor(response, payload);
    return defaultResponseAdaptor(response, payload);
  };
}
