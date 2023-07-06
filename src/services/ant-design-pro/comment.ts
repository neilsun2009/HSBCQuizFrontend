// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** get auto completion comment */
export async function getAutoCompletionComment(
  params: API.Comment,
  options?: { [key: string]: any },
) {
  return request<API.AutoCompletionComment>('/api/comments/auto_completion', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
