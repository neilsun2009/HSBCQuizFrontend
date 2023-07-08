import { PageContainer } from '@ant-design/pro-components';
import { Alert, Card, Col, Row, Statistic, Tabs, message } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import {
  getBestProducts,
  getCommentLengthStats,
  getCommentRatingStats,
  getCommentSentimentStats,
  getProductCommentCountStats,
  getWorstProducts,
} from '@/services/ant-design-pro/analysis';
import { Pie } from '@ant-design/plots';
import { MessageOutlined } from '@ant-design/icons';
import CommentListCollapse from '@/components/CommentListTabs';
import ProductCard from '@/components/ProductCard';

const ProductAnalysis: React.FC = () => {
  const [productCommentCountStats, setProductCommentCountStats] = useState<
    API.ProductCommentCountStat[]
  >([]);
  const [bestProductStats, setBestProductsStats] = useState<API.BestWorstProductStat[]>([]);
  const [worstProductStats, setWorstProductsStats] = useState<API.BestWorstProductStat[]>([]);

  const handleGetProductCommentCountStats = async () => {
    try {
      const result = await getProductCommentCountStats();
      setProductCommentCountStats(result);
    } catch (error) {
      message.error('Get product comment count stats failed, please try again');
    }
  };

  const handleGetBestProjects = async () => {
    try {
      const result = await getBestProducts();
      setBestProductsStats(result);
    } catch (error) {
      message.error('Get best products failed, please try again');
    }
  };

  const handleGetWorstProjects = async () => {
    try {
      const result = await getWorstProducts();
      setWorstProductsStats(result);
    } catch (error) {
      message.error('Get worst products failed, please try again');
    }
  };

  useEffect(() => {
    handleGetProductCommentCountStats();
    handleGetBestProjects();
    handleGetWorstProjects();
  }, []);

  const bestTabItems = bestProductStats.map((stat, idx) => {
    const product = stat.samples[0].product;
    return {
      key: product.title,
      label: `#${idx + 1}`,
      children: (
        <>
          <Card size="small">
            <ProductCard product={product} />
          </Card>
          <br />
          <CommentListCollapse showProduct={false} comments={stat.samples} />
        </>
      ),
    };
  });

  const worstTabItems = worstProductStats.map((stat, idx) => {
    const product = stat.samples[0].product;
    return {
      key: product.title,
      label: `#${idx + 1}`,
      children: (
        <>
          <Card size="small">
            <ProductCard product={product} />
          </Card>
          <br />
          <CommentListCollapse showProduct={false} comments={stat.samples} />
        </>
      ),
    };
  });

  return (
    <PageContainer>
      <Card title="Product Comment Count Stats" className={styles.card}>
        <Pie
          data={productCommentCountStats}
          angleField="count"
          colorField="category"
          radius={0.75}
          label={{
            type: 'spider',
            labelHeight: 28,
            content: '{name}: {percentage}\ncount: {value}',
          }}
          interactions={[
            {
              type: 'element-selected',
            },
            {
              type: 'element-active',
            },
          ]}
        />
        <br />
        <Alert
          message="Analysis"
          description={
            <p>Another example of 80/20 rule: 65% of products only have less than 10 comments.</p>
          }
          type="info"
          icon={<MessageOutlined />}
          showIcon
        />
      </Card>
      <Card title="Best Products" className={styles.card}>
        <Tabs defaultActiveKey="1" items={bestTabItems} />
        <br />
        <Alert
          message="Analysis"
          description={
            <p>
              For product analysis, first we have to calculate each product&apos;s overall rating,
              which is the average of customer rating and sentiment score. Note that they are not in
              the same scale, so normalization is needed.
              <br />
              The we calculate the average overall rating of all the comments each product has
              received. And then do the sorting.
              <br />
              As for choosing best and worst products, we set a threshold of at least 20 comments,
              which is about 1/4 of all products. This is done to eliminate such products that has
              too few comments and prone to subjective bias.
              <br />
              The selected comments for best and worst products are of the longest, so that we can
              have a better understanding of what makes them good or bad.
              <br />
              The best movie and TV show products on Amazon are of good quality, as a baseline, in
              terms of production, packaging, etc. More importantly, what makes them the BEST, is
              that they reached down to the emotional level of the viewers, and left a trace of
              resonance thereafter for a long time.
              <br />
            </p>
          }
          type="info"
          icon={<MessageOutlined />}
          showIcon
        />
      </Card>
      <Card title="Worst Products" className={styles.card}>
        <Tabs defaultActiveKey="1" items={worstTabItems} />
        <br />
        <Alert
          message="Analysis"
          description={
            <p>
              For choosing best and worst products, we set a threshold of at least 20 comments,
              which is about 1/4 of all products. This is done to eliminate such products that has
              too few comments and prone to subjective bias.
              <br />
              The selected comments for best and worst products are of the longest, so that we can
              have a better understanding of what makes them good or bad.
              <br />
              Opposed to best products, the worst products are first of all, of poor quality, of
              course. They are usually unoriginal, clickbait, of poor production, acting and script.
              All in all, as one customer put it: &quot;Waste of money!&quot;.
              <br />
              P.S. here we may see some duplicated comments, this infers that a dedup should be done
              at preprocessing step.
            </p>
          }
          type="info"
          icon={<MessageOutlined />}
          showIcon
        />
      </Card>
      <br />
      <div className={styles.footer}>
        sentiment analysis powered by{' '}
        <a href="https://spacy.io/universe/project/spacy-textblob" rel="noreferrer" target="_blank">
          textblob on spaCy
        </a>
        <br />
        visualization powered by{' '}
        <a href="https://charts.ant.design/" rel="noreferrer" target="_blank">
          Ant Design Charts
        </a>
      </div>
    </PageContainer>
  );
};
export default ProductAnalysis;
