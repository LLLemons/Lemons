import React from 'react';
import { Card } from 'antd';
import { httpGet } from '@/utils/RequestUtil/request';
import AsyncTable from '@/components/BaseTable/AsyncTable';
import AsyncFormTable from '@/components/BaseTable/AsyncFormTable';

const columns = [
  {
    dataIndex: 'partnerName',
    title: '合作商名称',
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
    <Card size={'small'}>
      <AsyncFormTable
        tableConfig={{
          rowKey: 'id',
          bordered: true,
          size: 'small',
          columns,
        }}
        fetchData={p => httpGet('/mall/api/car/base/infos/params', p)}
      />
    </Card>
  );
}
