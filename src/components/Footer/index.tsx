// import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} Neil Sun`}
      links={[
        {
          key: 'frontend',
          title: 'Frontend Repo',
          href: 'https://github.com/neilsun2009/HSBCQuizFrontend',
          blankTarget: true,
        },
        {
          key: 'backend',
          title: 'Backend Repo',
          href: 'https://github.com/neilsun2009/HSBCQuizBackend',
          blankTarget: true,
        },
        {
          key: 'daml',
          title: 'DnA & ML Repo',
          href: 'https://github.com/neilsun2009/HSBCQuizDataML',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
