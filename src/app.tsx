import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { Html5Outlined, LinkOutlined, RobotOutlined, CloudServerOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from 'umi';
import { Link } from 'umi';
import defaultSettings from '../config/defaultSettings';

const isDev = process.env.NODE_ENV === 'development';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  loading?: boolean;
}> {
  return {
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {},
    footerRender: () => <Footer />,
    onPageChange: () => {},
    links: [
      <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
        <LinkOutlined />
        <span>OpenAPI Doc</span>
      </Link>,
      <a
        key="frontend"
        rel="noreferrer"
        href="https://github.com/neilsun2009/HSBCQuizFrontend"
        target="_blank"
      >
        <Html5Outlined />
        <span>Frontend Repo</span>
      </a>,
      <a
        key="backend"
        rel="noreferrer"
        href="https://github.com/neilsun2009/HSBCQuizBackend"
        target="_blank"
      >
        <CloudServerOutlined />
        <span>Backend Repo</span>
      </a>,
      <a
        key="DnA+ML"
        rel="noreferrer"
        href="https://github.com/neilsun2009/HSBCQuizDataML"
        target="_blank"
      >
        <RobotOutlined />
        <span>DnA + ML Repo</span>
      </a>,
    ],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态

    ...initialState?.settings,
  };
};
