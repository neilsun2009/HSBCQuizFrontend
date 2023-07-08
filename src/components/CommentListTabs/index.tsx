import { Tabs } from 'antd';
import React from 'react';
import CommentCard from '../CommentCard';

interface Props {
  comments: API.CommentSample[];
}

const CommentListTabs: React.FC<Props> = (props) => {
  const { comments } = props;

  return (
    <Tabs
      tabPosition="left"
      items={comments.map((comment, idx) => {
        return {
          label: `Sample #${idx + 1}`,
          key: `${idx}`,
          children: (
            <div>
              <CommentCard comment={comment} />
            </div>
          ),
        };
      })}
    />
  );
};

export default CommentListTabs;
