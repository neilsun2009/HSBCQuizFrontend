import { PageContainer } from '@ant-design/pro-components';
import { Alert, Card, Col, Row, Statistic, Tabs, message } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import {
  getKeywordOccurenceStats,
  getKeywordTop500,
  getSelectedKeywords,
} from '@/services/ant-design-pro/analysis';
import { WordCloud, Pie } from '@ant-design/plots';
import { MessageOutlined } from '@ant-design/icons';
import CountUp from 'react-countup';

const formatter = (value: number) => <CountUp end={value} separator="," />;

const KeywordAnalysis: React.FC = () => {
  const [top500Words, setTop500Words] = useState<API.Keyword[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<API.Keyword[]>([]);
  const [occurrenceCounts, setOccurrenceCounts] = useState<{ value: number; type: string }[]>([]);
  const [occurrenceTimes, setOccurrenceTimes] = useState<{ value: number; type: string }[]>([]);

  const handleGetKeywordTop500 = async () => {
    try {
      const result = await getKeywordTop500();
      setTop500Words(result);
    } catch (error) {
      message.error('Get top 500 keywords failed, please try again');
    }
  };

  const handleGetSelectedKeywords = async () => {
    try {
      const result = await getSelectedKeywords();
      setSelectedKeywords(result);
    } catch (error) {
      message.error('Get selected keywords failed, please try again');
    }
  };

  const handleGetWordOccurenceStats = async () => {
    try {
      const result = await getKeywordOccurenceStats();
      const times: { value: number; type: string }[] = [];
      const counts: { value: number; type: string }[] = [];
      result.forEach((stat, idx, arr) => {
        if (idx < arr.length - 1) {
          const typeStr: string = `appears ${stat.threshold} ~ ${arr[idx + 1].threshold - 1} times`;
          counts.push({
            type: typeStr,
            value: stat.numWords - arr[idx + 1].numWords,
          });
          times.push({
            type: typeStr,
            value: stat.totalOccurrence - arr[idx + 1].totalOccurrence,
          });
        } else {
          const typeStr: string = `appears >= ${stat.threshold} times`;
          counts.push({
            type: typeStr,
            value: stat.numWords,
          });
          times.push({
            type: typeStr,
            value: stat.totalOccurrence,
          });
        }
      });
      setOccurrenceCounts(counts);
      setOccurrenceTimes(times);
      console.log(times);
    } catch (error) {
      message.error('Get keyword occurences failed, please try again');
    }
  };

  useEffect(() => {
    handleGetKeywordTop500();
    handleGetSelectedKeywords();
    handleGetWordOccurenceStats();
  }, []);

  const occurrenceTabItems = [
    {
      key: '1',
      label: `How big is the vocabulary for each occurrence category?`,
      children: (
        <Pie
          data={occurrenceCounts}
          angleField="value"
          colorField="type"
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
      ),
    },
    {
      key: '2',
      label: `And how many times do they appear in total?`,
      children: (
        <Pie
          data={occurrenceTimes}
          angleField="value"
          colorField="type"
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
      ),
    },
  ];

  return (
    <PageContainer>
      <Card title="Word Cloud - Top 500 Keywords" className={styles.card}>
        <WordCloud
          data={top500Words}
          wordField="word"
          colorField="word"
          weightField="occurrence"
          // wordStyle={{
          //   fontFamily: 'Verdana',
          //   fontSize: [24, 80],
          // }}
          interactions={[
            {
              type: 'element-active',
            },
          ]}
          state={{
            active: {
              style: {
                opacity: 0.8,
              },
            },
          }}
        />
        <Alert
          message="Analysis"
          description={
            <p>
              As the comments are about movies and TVs, words like &apos;movie&apos;,
              &apos;style&apos;, &apos;show&apos; & &apos;dvd&apos; occurred reasonably much.
              <br />
              Also, we may notice that positive words occured much more then negative words. In the
              next section, we are going to manually select a few words and see their occurences.
            </p>
          }
          type="info"
          icon={<MessageOutlined />}
          showIcon
        />
      </Card>
      <Card title="Selected Keywords" className={styles.card}>
        <Row gutter={8} justify="space-around">
          {selectedKeywords.slice(0, 4).map((keyword) => {
            const { occurrence, word, rank } = keyword;
            return (
              <Col span={5}>
                <Statistic
                  title={`${word} (rank #${rank})`}
                  value={occurrence}
                  formatter={formatter}
                />
              </Col>
            );
          })}
        </Row>
        <br />
        <Row gutter={8} justify="space-around">
          {selectedKeywords.slice(5, 9).map((keyword) => {
            const { occurrence, word, rank } = keyword;
            return (
              <Col span={5}>
                <Statistic
                  title={`${word} (rank #${rank})`}
                  value={occurrence}
                  formatter={formatter}
                />
              </Col>
            );
          })}
        </Row>
        <br />
        <Alert
          message="Analysis"
          description={
            <p>
              Here we manually chose 10 frequently used words, 5 positive + 5 negative, to see if
              positive words occurred more than negative ones.
              <br />
              As the result shows, positive words occurred significantly more than negative ones. We
              may infer that more comments were positive. This could be double checked in sentiment
              analysis.
            </p>
          }
          type="info"
          icon={<MessageOutlined />}
          showIcon
        />
      </Card>
      <Card title="Word Occurrence Stats" className={styles.card}>
        <Tabs defaultActiveKey="1" items={occurrenceTabItems} />
        <Alert
          message="Analysis"
          description={
            <p>
              Here we can see that, a more extreme version of 80/20 rule appeared for keyword
              occurence, where 13% of the vocabulary accounted for more than 99% of total
              occurrence.
              <br />
              We indeed repeat amongst ourselves the frequent words.
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
export default KeywordAnalysis;
