import React, { CSSProperties, useCallback } from 'react';
import { Table } from 'antd';
import { ColumnsType, TableProps } from 'antd/es/table';

interface ITableProps<T> extends TableProps<T> {
  expandContext?: React.ReactNode;
  expandContextStyle?: CSSProperties;
}

function BaseTable<T extends object = any>(props: ITableProps<T>) {
  const { columns, expandContext, expandContextStyle, ...reset } = props;
  const defaultContextStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '10px',
  };
  const getColumns = useCallback<{ (): ColumnsType<T> }>(() => {
    return (
      columns?.map(item => ({
        align: 'center',
        ...item,
      })) ?? []
    );
  }, [columns]);
  return (
    <>
      <div style={{ ...defaultContextStyle, ...expandContextStyle }}>{expandContext}</div>
      <Table<T> columns={getColumns()} {...reset} />
    </>
  );
}
export default BaseTable;
