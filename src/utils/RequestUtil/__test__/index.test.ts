import { dataLister } from '../';

test('test adaptor', async () => {
  const result = { header: { total: 10 }, data: { page: 1, pageSize: 20, data: ['1', '2'] } };
  const lister = dataLister<string, typeof result>({
    responseAdaptor: (response, payload) => ({
      success: true,
      paginate: {
        page: response.data.page,
        pageSize: response.data.pageSize,
        total: response.header.total,
      },
      dataSource: response.data.data,
      cacheSearch: payload,
    }),
  });
  const service = () => ({
    header: { total: 10 },
    data: { page: 1, pageSize: 20, data: ['1', '2'] },
  });
  const r = await lister(service, { test: 'oh~ test search' });
  expect(r).toHaveProperty('dataSource');
  expect(r).toHaveProperty('paginate');
  expect(r).toHaveProperty('cacheSearch');
});
