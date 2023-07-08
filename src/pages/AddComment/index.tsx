import { PageContainer } from '@ant-design/pro-components';
import { Alert, Card, Space, AutoComplete, Button, message } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { getAutoCompletionComment } from '@/services/ant-design-pro/comment';
import { LoadingOutlined } from '@ant-design/icons';

const AddComment: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [value, setValue] = useState<string>();

  const handleGetAutoCompletion = async (comment: string) => {
    try {
      if (comment === '') {
        setOptions([]);
        setIsLoading(false);
        return;
      }
      // setOptions([]);
      // setIsLoading(true);
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
        setOptions([]);
      }
    } catch (error) {
      message.error('Get auto completion failed, please try again');
    }
  };

  const submitComment = () => {
    setValue('');
    setOptions([]);
    message.success('Comment mock submitted!');
  };

  return (
    <PageContainer>
      <Card>
        <Alert
          message={
            'Incorprated with LLM-based auto completion! Smart detect your next input based on Amazon comments!'
          }
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
              onChange={(v) => {
                setValue(v);
              }}
              onSearch={handleGetAutoCompletion}
            />
            <Button size="large" type="primary" onClick={submitComment}>
              Submit
            </Button>
          </Space.Compact>
          {isLoading && (
            <Alert
              message="LLM loading... Just keep on typing!"
              type="info"
              showIcon
              icon={<LoadingOutlined />}
            />
          )}
        </div>
        <div className={styles.footer}>
          built with{' '}
          <a href="https://github.com/microsoft/LoRA" rel="noreferrer" target="_blank">
            LoRA
          </a>{' '}
          on{' '}
          <a href="https://huggingface.co/distilgpt2" rel="noreferrer" target="_blank">
            distilgpt2
          </a>
          <br />
          hosted on{' '}
          <a
            href="https://huggingface.co/docs/api-inference/index"
            rel="noreferrer"
            target="_blank"
          >
            🤗Hugging Face Inference API
          </a>
        </div>
      </Card>
    </PageContainer>
  );
};
export default AddComment;
