import React, { useCallback } from 'react';
import { Table } from 'antd';
import { ColumnsType, TableProps } from 'antd/es/table';

interface ITableProps<T> extends TableProps<T> {}

function BaseTable<T extends object = any>(props: ITableProps<T>) {
  const { columns, ...reset } = props;
  const getColumns = useCallback<{ (): ColumnsType<T> }>(() => {
    return (
      columns?.map(item => ({
        align: 'center',
        ...item,
      })) ?? []
    );
  }, [columns]);
  return <Table<T> columns={getColumns()} {...reset} />;
}
export default BaseTable;
