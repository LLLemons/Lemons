import React from 'react';
import { Button, Card, Input } from 'antd';
import { httpGet } from '@/utils/RequestUtil/request';
import AsyncFormTable from '@/components/BaseTable/AsyncFormTable';

const columns = [
  {
    dataIndex: 'partnerName',
    title: '合作商名称',
  },
  {
    dataIndex: 'vin',
    title: '车架号',
  },
  {
    dataIndex: 'vehicleBrandName',
    title: '品牌',
  },
  {
    dataIndex: 'vehicleModelName',
    title: '车型',
  },
  {
    dataIndex: 'vehicleSeriesName',
    title: '车系',
  },
];

export default function() {
  return (
    <AsyncFormTable
      tableConfig={{
        rowKey: 'id',
        bordered: true,
        size: 'small',
        columns,
      }}
      formConfig={{
        formList: [
          {
            key: 'vin',
            formItemProps: {
              name: 'vin',
              label: '车架号',
              children: <Input />,
            },
          },
          {
            key: 'vin1',
            formItemProps: {
              name: 'vin1',
              label: '车架号1',
              children: <Input />,
            },
          },
          {
            key: 'vin2',
            formItemProps: {
              name: 'vin2',
              label: '车架号2',
              children: <Input />,
            },
          },
          {
            key: 'vin3',
            formItemProps: {
              name: 'vin3',
              label: '车架号3',
              children: <Input />,
            },
          },
          {
            key: 'vin4',
            formItemProps: {
              name: 'vin4',
              label: '车架号4',
              children: <Input />,
            },
          },
          {
            key: 'vin5',
            formItemProps: {
              name: 'vin45',
              label: '车架号45',
              children: <Input />,
            },
          },
          // {
          //   key: 'vin46',
          //   formItemProps: {
          //     name: 'vin46',
          //     label: '车架号46',
          //     children: <Input />,
          //   },
          // },
          // {
          //   key: 'vin74',
          //   formItemProps: {
          //     name: 'vin47',
          //     label: '车架号47',
          //     children: <Input />,
          //   },
          // },
        ],
      }}
      fetchData={p => httpGet('/mall/api/car/base/infos/params', p)}
      expandContext={<Button type={'primary'}>111</Button>}
    />
  );
}
