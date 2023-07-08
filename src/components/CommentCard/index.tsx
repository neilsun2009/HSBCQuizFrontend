import {
  FrownOutlined,
  MehOutlined,
  MessageOutlined,
  SmileOutlined,
  StarOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Card, List, Popover, Rate, Space, Tooltip, Typography } from 'antd';
import React from 'react';
import ProductCard from '../ProductCard';

const { Paragraph } = Typography;

interface Props {
  comment: API.CommentSample;
  showProduct?: boolean;
}

const CommentCard: React.FC<Props> = (props) => {
  const { comment, showProduct = true } = props;

  const sentimentIcon =
    comment.sentiment > 0.1 ? (
      <SmileOutlined />
    ) : comment.sentiment < -0.1 ? (
      <FrownOutlined />
    ) : (
      <MehOutlined />
    );

  return (
    <List
      size="large"
      itemLayout="vertical"
      dataSource={[comment]}
      renderItem={(item) => (
        <List.Item
          key={item.summary}
          actions={[]}
          //   extra={}
        >
          <List.Item.Meta
            avatar={
              <Popover
                content={
                  <p>
                    {`> 0.1: positive`}
                    <br />
                    {`-0.1 ~ 0.1: neutral`}
                    <br />
                    {`< -0.1: negative`}
                  </p>
                }
                title={`Sentiment score: ${item.sentiment.toFixed(2)}`}
              >
                <Avatar size={64} icon={sentimentIcon} />
              </Popover>
            }
            title={`"${item.summary}" by ${item.customer.name}`}
            description={
              <Space align="center">
                <Popover content={`Customer rating: ${item.rating}`}>
                  <div>
                    <Rate disabled defaultValue={item.rating} />
                  </div>
                </Popover>
              </Space>
            }
          />
          <br />
          {showProduct && (
            <>
              <Card size="small">
                <ProductCard product={comment.product} />
              </Card>
              <br />
            </>
          )}
          <Card>
            <Paragraph ellipsis={{ rows: 10, expandable: true, symbol: 'more' }}>
              {item.review}
            </Paragraph>
          </Card>
        </List.Item>
      )}
    ></List>
  );
};

export default CommentCard;
