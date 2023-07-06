// import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} Neil Sun`}
      links={[
        {
          key: 'Ant Design Pro',
          title: 'Ant Design Pro',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        // {
        //   key: 'github',
        //   title: <GithubOutlined />,
        //   href: 'https://github.com/ant-design/ant-design-pro',
        //   blankTarget: true,
        // },
        {
          key: 'Azure',
          title: 'Azure',
          href: 'https://azure.microsoft.com/',
          blankTarget: true,
        },
        {
          key: 'Hugging Face',
          title: '🤗Hugging Face',
          href: 'https://huggingface.co/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
