import React, { useMemo } from 'react';
import { useRequest } from '@umijs/hooks';
import { Basic } from '@/types';
import { PaginatedFormatReturn, PaginatedParams } from '@umijs/hooks/es/useFormTable';
import { TablePaginationConfig, TableProps } from 'antd/es/table';
import _ from 'lodash';
import BaseTable from '@/components/BaseTable/index';

interface ITableProps<R, P> extends TableProps<R> {
  fetchData: (p: P) => Promise<Basic.BaseResponse<R[]>>;
}

function AsyncTable<R extends object = any, P extends object = any>(props: ITableProps<R, P>) {
  const { fetchData, ...tableProps } = props;
  const defaultPagination = useMemo<TablePaginationConfig>(
    () => ({
      total: 0,
      defaultPageSize: 10,
      defaultCurrent: 10,
      showQuickJumper: true,
      showSizeChanger: true,
    }),
    [],
  );
  const initialPagination = _.mergeWith(defaultPagination, tableProps.pagination);
  const service = async ({ current, pageSize }: PaginatedParams[0], other: P) => {
    const { data, success, total } = await fetchData({
      ...other,
      page: current - 1,
      size: pageSize,
    });
    if (success) {
      return Promise.resolve<PaginatedFormatReturn<R>>({
        total: total ?? 0,
        list: data,
      });
    }
    return Promise.reject<Error>({
      name: '出错了',
      message: '出错了',
    });
  };
  const { tableProps: serviceTableProps, pagination } = useRequest<any, R>(service, {
    paginated: true,
    defaultPageSize: initialPagination.defaultPageSize,
  });
  const {
    current,
    pageSize,
    total,
    totalPage,
    changeCurrent,
    changePageSize,
    onChange,
  } = pagination;
  return (
    <BaseTable<R>
      {...tableProps}
      {...serviceTableProps}
      pagination={{
        ...initialPagination,
        current,
        pageSize: pageSize ?? 0,
        total,
      }}
    />
  );
}

export default AsyncTable;
