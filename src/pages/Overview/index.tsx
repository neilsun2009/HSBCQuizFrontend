import { PageContainer } from '@ant-design/pro-components';
import { Alert, Card, Space, AutoComplete, Button, message, Row, Col, Statistic } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { getAutoCompletionComment } from '@/services/ant-design-pro/comment';
import { LoadingOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import { getOverview } from '@/services/ant-design-pro/analysis';
import CountUp from 'react-countup';

const formatter = (value: number) => <CountUp end={value} separator="," />;

const Overview: React.FC = () => {
  const [overview, setOverview] = useState<API.Overview>();

  const handleGetOverview = async () => {
    try {
      const result = await getOverview();
      setOverview(result);
    } catch (error) {
      message.error('Get overview failed, please try again');
    }
  };

  useEffect(() => {
    handleGetOverview();
  }, []);

  return (
    <PageContainer>
      Welcome to the live demo!
      <br />
      This is a data analysis + machine learning project based on{' '}
      <a href="https://nijianmo.github.io/amazon/index.html" rel="noreferrer" target="_blank">
        Amazon Review Data on Movies & TVs
      </a>
      .
      <br />
      You can click on the buttons on the cards below to see deep-level analysis related to the
      theme.
      <br />
      Or click <Link to="/add-comment">here</Link> to add a new comment (mock), with auto-completion
      powered by Large Language Model!
      <br />
      <br />
      <Row gutter={16}>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic title="Comments" value={overview?.comments} formatter={formatter} />
            <Link to="/comments-analysis">
              <Button size="small">sentiment & more</Button>
            </Link>
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic title="Products" value={overview?.products} formatter={formatter} />
            <Link to="/products-analysis">
              <Button size="small">best & worst</Button>
            </Link>
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic title="Customers" value={overview?.customers} formatter={formatter} />
            <Link to="/customer-clustering">
              <Button size="small">segmentation</Button>
            </Link>
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic title="Keywords" value={overview?.keywords} formatter={formatter} />
            <Link to="/keywords-analysis">
              <Button size="small">word cloud & more</Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};
export default Overview;
