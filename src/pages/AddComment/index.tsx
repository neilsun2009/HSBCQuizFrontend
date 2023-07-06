import { PageContainer } from '@ant-design/pro-components';
import { Alert, Card, Space, AutoComplete, Button, message } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import { getAutoCompletionComment } from '@/services/ant-design-pro/comment';
import { LoadingOutlined } from '@ant-design/icons';

const AddComment: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [value, setValue] = useState<string>();

  const handleGetAutoCompletion = async (comment: string) => {
    try {
      const result = await getAutoCompletionComment({
        comment,
      });
      console.log(result);
      if (!result.isLoading) {
        const completion = result.comment;
        // use space to split result, and display them as different options
        let spaceIdx = comment.length - 1;
        const newOptions = [];
        while (true) {
          spaceIdx = completion.indexOf(' ', spaceIdx);
          if (spaceIdx === -1) {
            break;
          }
          newOptions.push({ value: completion.substring(0, spaceIdx) });
          spaceIdx += 1;
        }
        newOptions.push({ value: completion });
        setOptions(newOptions);
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }
    } catch (error) {
      message.error('Get auto completion failed, please try again');
    }
  };

  const submitComment = () => {
    setValue('');
    setOptions([]);
    message.success('Comment submitted!');
  };

  return (
    <PageContainer>
      <Card>
        <Alert
          message={'Incorprated with LLM-based auto completion!'}
          type="success"
          showIcon
          banner
        />
        <div className={styles.inputCtn}>
          <Space.Compact style={{ width: '100%' }}>
            <AutoComplete
              maxLength={1000}
              style={{ width: '100%' }}
              placeholder="Write your comments..."
              options={options}
              value={value}
              onSearch={handleGetAutoCompletion}
            />
            <Button size="large" type="primary" onClick={submitComment}>
              Submit
            </Button>
          </Space.Compact>
          {isLoading && (
            <Alert
              message="LLM loading...just keep on typing"
              type="info"
              showIcon
              icon={<LoadingOutlined />}
            />
          )}
        </div>
      </Card>
    </PageContainer>
  );
};
export default AddComment;
