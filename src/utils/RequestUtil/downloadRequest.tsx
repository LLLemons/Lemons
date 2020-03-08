import download from 'downloadjs';
import { message } from 'antd';
import request, { errorProcess } from './request';
import { AxiosRequestConfig } from 'axios';

export async function downloadRequest(url: string, options?: AxiosRequestConfig, title?: string) {
  const loading = message.loading('下载中,请稍后...');
  const { data, headers, success } = await request({
    url,
    responseType: 'blob',
    ...options,
  }).then(errorProcess);
  if (success) {
    let mtitle = title;
    if (!mtitle) {
      mtitle = decodeURIComponent(headers['content-file-original-name']);
      if (!mtitle || mtitle === undefined || mtitle === 'undefined') {
        if (headers['content-disposition']) {
          mtitle = decodeURIComponent(
            headers['content-disposition'].replace('attachment;filename=', ''),
          );
        }
      }
    }
    download(data, mtitle);
    message.success('下载成功');
  }
  loading();
}
