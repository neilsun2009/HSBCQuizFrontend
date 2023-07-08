import { PageContainer } from '@ant-design/pro-components';
import { Alert, Card, Col, Row, Statistic, Tabs, message } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import {
  getCommentLengthStats,
  getCommentRatingStats,
  getCommentSentimentStats,
} from '@/services/ant-design-pro/analysis';
import { Pie } from '@ant-design/plots';
import { MessageOutlined } from '@ant-design/icons';
import CommentListCollapse from '@/components/CommentListTabs';

const CommentAnalysis: React.FC = () => {
  const [commentLengthStats, setCommentLengthStats] = useState<API.CommonStat[]>([]);
  const [commentRatingStats, setCommentRatingStats] = useState<API.CommentRatingStat[]>([]);
  const [commentSentimentStats, setCommentSentimentStats] = useState<API.CommonStat[]>([]);

  const handleGetCommentLengthStats = async () => {
    try {
      const result = await getCommentLengthStats();
      setCommentLengthStats(result);
    } catch (error) {
      message.error('Get comment length stats failed, please try again');
    }
  };

  const handleGetCommentRatingStats = async () => {
    try {
      const result = await getCommentRatingStats();
      setCommentRatingStats(result);
    } catch (error) {
      message.error('Get comment rating stats failed, please try again');
    }
  };

  const handleGetCommentSentimentStats = async () => {
    try {
      const result = await getCommentSentimentStats();
      setCommentSentimentStats(result);
    } catch (error) {
      message.error('Get comment sentiment stats failed, please try again');
    }
  };

  useEffect(() => {
    handleGetCommentLengthStats();
    handleGetCommentRatingStats();
    handleGetCommentSentimentStats();
  }, []);

  const lengthTabItems = commentLengthStats.map((stat) => {
    return {
      key: stat.category,
      label: stat.category,
      children: <CommentListCollapse comments={stat.samples} />,
    };
  });

  const sentimentTabItems = commentSentimentStats.map((stat) => {
    return {
      key: stat.category,
      label: stat.category,
      children: <CommentListCollapse comments={stat.samples} />,
    };
  });

  const ratingTabItems = commentRatingStats.map((stat) => {
    return {
      key: stat.rating + '',
      label: `rating ${stat.rating}`,
      children: <CommentListCollapse comments={stat.samples} />,
    };
  });

  return (
    <PageContainer>
      <Card title="Comment Length Stats" className={styles.card}>
        <Pie
          data={commentLengthStats}
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
        <Tabs
          defaultActiveKey="1"
          tabBarExtraContent={{ left: <div>Sample comments&nbsp;&nbsp;&nbsp;</div> }}
          items={lengthTabItems}
        />
        <br />
        <Alert
          message="Analysis"
          description={
            <p>
              We randomly sample 10 comments from each comment length category.
              <br />
              200+ comments are simply speechless, they use marks to express feelings. The majority
              of comments (nearly half) has 10~100 words, with another 30+% use less than 10 words.
              This is consistant with most product reviews we see online: seldom will they be long
              and descriptive.
            </p>
          }
          type="info"
          icon={<MessageOutlined />}
          showIcon
        />
      </Card>
      <Card title="Comment Customer Rating Stats" className={styles.card}>
        <Pie
          data={commentRatingStats.map((r) => ({ ...r, rating: `rating ${r.rating}` }))}
          angleField="count"
          colorField="rating"
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
        <Tabs
          defaultActiveKey="1"
          tabBarExtraContent={{ left: <div>Sample comments&nbsp;&nbsp;&nbsp;</div> }}
          items={ratingTabItems}
        />
        <br />
        <Alert
          message="Analysis"
          description={
            <p>
              We randomly sample 10 comments from each rating category.
              <br />
              Now we have a proof that indeed most people are generous when it comes to review. More
              than half of the comments are of 5 stars.
            </p>
          }
          type="info"
          icon={<MessageOutlined />}
          showIcon
        />
      </Card>
      <Card title="Comment Sentiment Stats" className={styles.card}>
        <Pie
          data={commentSentimentStats}
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
        <Tabs
          defaultActiveKey="1"
          tabBarExtraContent={{ left: <div>Sample comments&nbsp;&nbsp;&nbsp;</div> }}
          items={sentimentTabItems}
        />
        <br />
        <Alert
          message="Analysis"
          description={
            <p>
              We randomly sample 10 comments from each sentiment category.
              <br />
              Based on subjectively reviewing on the sentiment results, we used -0.1 and 0.1 as the
              thresholds for neg-neutral and neutral-pos respectively.
              <br />
              The sentiment analysis result is consistant with the customer ratings in number. But
              we may find some wrongly inferred sentiments from sample comments. This requires a
              better sentiment analysis model.
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
export default CommentAnalysis;
