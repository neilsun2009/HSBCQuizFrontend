import { Tabs } from 'antd';
import React from 'react';
import CommentCard from '../CommentCard';

interface Props {
  comments: API.CommentSample[];
  showProduct?: boolean;
}

const CommentListTabs: React.FC<Props> = (props) => {
  const { comments, showProduct = true } = props;

  return (
    <Tabs
      tabPosition="left"
      items={comments.map((comment, idx) => {
        return {
          label: `Sample #${idx + 1}`,
          key: `${idx}`,
          children: (
            <div>
              <CommentCard comment={comment} showProduct={showProduct} />
            </div>
          ),
        };
      })}
    />
  );
};

export default CommentListTabs;
