import { IConfig } from 'umi-types';
const proxyTarget = 'http://120.77.255.134';

// ref: https://umijs.org/config/
const config: IConfig =  {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: false,
      dynamicImport: { webpackChunkName: true },
      title: 'Antd4',
      dll: false,

      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
  proxy: {
      '/mall/api/': {
        target: proxyTarget,
        changeOrigin: true,
      }
    }

};

export default config;
