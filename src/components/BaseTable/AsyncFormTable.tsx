import React, { CSSProperties, useMemo } from 'react';
import { Button, Card, Form } from 'antd';
import { useFormTable } from '@umijs/hooks';
import { PaginatedParams } from '@umijs/hooks/es/useFormTable';
import { TablePaginationConfig, TableProps } from 'antd/es/table';
import { Basic } from '@/types';
import { PaginatedFormatReturn } from '@umijs/use-request/lib/types';
import BaseTable from '@/components/BaseTable/index';
import _ from 'lodash';
import { FormItemProps } from 'antd/es/form';
import FormWidthRow from '@/components/BaseForm/FormWidthRow';
import { RowProps } from 'antd/es/row';
import { ColProps } from 'antd/es/col';

interface FormTableProps<T, F, P> {
  tableConfig: TableProps<T>;
  formConfig: {
    formList: {
      key: string | number;
      formItemProps: FormItemProps;
      colProps?: ColProps;
    }[];
    rowProps?: RowProps;
    colProps?: ColProps;
    formCardStyle?: CSSProperties;
  };
  fetchData: (params: P) => Promise<Basic.BaseResponse<T[]>>;
  expandContext?: React.ReactNode;
}

function AsyncFormTable<T extends object = any, F extends object = any, P extends object = any>(
  props: FormTableProps<T, F, P>,
) {
  const { fetchData, tableConfig, formConfig, expandContext } = props;
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
  const defaultLayout: {
    rowProps: RowProps;
    colProps: ColProps;
  } = {
    rowProps: {
      gutter: 24,
    },
    colProps: {
      xs: 24,
      sm: 12,
      md: 8,
      lg: 6,
      xl: 6,
      xxl: 6,
    },
  };
  const initialPagination = _.mergeWith(defaultPagination, tableConfig.pagination);
  const initialFormLayout = {
    rowProps: props.formConfig.rowProps || defaultLayout.rowProps,
    colProps: props.formConfig.colProps || defaultLayout.colProps,
  };
  const [form] = Form.useForm();

  const getTableData = async (
    { current, pageSize }: PaginatedParams[0],
    formData: P,
  ): Promise<PaginatedFormatReturn<T> | Error> => {
    const { data, success, total } = await fetchData({
      page: current - 1,
      size: pageSize,
      ...formData,
    });
    if (success) {
      return Promise.resolve<PaginatedFormatReturn<T>>({
        total: total ?? 0,
        list: data,
      });
    }
    return Promise.resolve<PaginatedFormatReturn<T>>({
      total: 0,
      list: [],
    });
  };
  const { tableProps, search, pagination } = useFormTable<any, T>(getTableData, {
    defaultPageSize: initialPagination.defaultPageSize,
    form,
  });
  const { submit, reset } = search;
  const { current, pageSize, total } = pagination;
  return (
    <>
      <Card
        style={{ marginBottom: '16px', overflow: 'hidden' }}
        bodyStyle={{ paddingBottom: '0px' }}
      >
        <Form form={form} wrapperCol={{ span: 16 }} labelCol={{ span: 8 }} labelAlign={'right'}>
          <FormWidthRow
            form={form}
            formList={formConfig.formList}
            key={'formRow'}
            {...initialFormLayout}
            fixedRightCol={
              <Form.Item
                style={{ display: 'flex', justifyContent: 'flex-end' }}
                wrapperCol={{ span: 24 }}
              >
                <Button type="primary" onClick={submit}>
                  搜索
                </Button>
                <Button onClick={reset} style={{ marginLeft: 16 }}>
                  重置
                </Button>
              </Form.Item>
            }
          />
        </Form>
      </Card>
      <Card size={'small'}>
        <BaseTable
          {...tableConfig}
          {...tableProps}
          pagination={{
            ...initialPagination,
            current,
            pageSize: pageSize ?? 0,
            total,
          }}
          expandContext={expandContext}
        />
      </Card>
    </>
  );
}
export default AsyncFormTable;
