import { PageContainer } from '@ant-design/pro-components';
import { Alert, Card, Col, Row, Statistic, Tabs, message } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import {
  getCommentLengthStats,
  getKeywordOccurenceStats,
  getKeywordTop500,
  getSelectedKeywords,
} from '@/services/ant-design-pro/analysis';
import { WordCloud, Pie } from '@ant-design/plots';
import { MessageOutlined } from '@ant-design/icons';
import CountUp from 'react-countup';
import CommentListCollapse from '@/components/CommentListTabs';

const formatter = (value: number) => <CountUp end={value} separator="," />;

const CommentAnalysis: React.FC = () => {
  const [commentLengthStats, setCommentLengthStats] = useState<API.CommonStat[]>([]);

  const handleGetCommentLengthStats = async () => {
    try {
      const result = await getCommentLengthStats();
      setCommentLengthStats(result);
    } catch (error) {
      message.error('Get comment length stats failed, please try again');
    }
  };

  useEffect(() => {
    handleGetCommentLengthStats();
  }, []);

  const lengthTabItems = commentLengthStats.map((stat) => {
    return {
      key: stat.category,
      label: stat.category,
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
            content: '{name}\n{percentage}',
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
          tabBarExtraContent={{ left: <div>Sample comments:&nbsp;</div> }}
          items={lengthTabItems}
        />
        <br />
        <Alert
          message="Analysis"
          description={
            <p>
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
      <div className={styles.footer}>
        visualization powered by{' '}
        <a href="https://charts.ant.design/" rel="noreferrer" target="_blank">
          Ant Design Charts
        </a>
      </div>
    </PageContainer>
  );
};
export default CommentAnalysis;
