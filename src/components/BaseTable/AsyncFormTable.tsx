import React, { useMemo } from 'react';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import { useFormTable } from '@umijs/hooks';
import { PaginatedParams } from '@umijs/hooks/es/useFormTable';
import { TablePaginationConfig, TableProps } from 'antd/es/table';
import { Basic } from '@/types';
import { PaginatedFormatReturn } from '@umijs/use-request/lib/types';
import BaseTable from '@/components/BaseTable/index';
import _ from 'lodash';
import { FormInstance, FormItemProps } from 'antd/es/form';

declare type RenderChildren = (form: FormInstance) => React.ReactElement | null;

interface FTFormItemProps extends FormItemProps {
  dom: React.ReactNode;
}

interface FormTableProps<T, F, P> {
  tableConfig: TableProps<T>;
  formConfig: {
    items: {
      dom: React.ReactElement | RenderChildren | React.ReactElement[] | null;
      props: FormItemProps;
    };
    form?: FormInstance;
  };
  fetchData: (params: P) => Promise<Basic.BaseResponse<T[]>>;
}

function AsyncFormTable<T extends object = any, F extends object = any, P extends object = any>(
  props: FormTableProps<T, F, P>,
) {
  const { fetchData, tableConfig } = props;
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
  const initialPagination = _.mergeWith(defaultPagination, tableConfig.pagination);
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
      <Card style={{ marginBottom: '16px' }}>
        <Form form={form}>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item label="name" name="name">
                <Input placeholder="name" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="email" name="email">
                <Input placeholder="email" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="phone" name="phone">
                <Input placeholder="phone" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="primary" onClick={submit}>
                Search
              </Button>
              <Button onClick={reset} style={{ marginLeft: 16 }}>
                Reset
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Card>
      <BaseTable
        {...tableConfig}
        {...tableProps}
        pagination={{
          ...initialPagination,
          current,
          pageSize: pageSize ?? 0,
          total,
        }}
      />
    </>
  );
}
export default AsyncFormTable;
