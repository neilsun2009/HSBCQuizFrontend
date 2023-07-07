// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

// keyword analysis
/** get top 100 */
export async function getKeywordTop100(options?: { [key: string]: any }) {
  return request<API.Keyword[]>('/api/analysis/keywords/top100', {
    method: 'GET',
    ...(options || {}),
  });
}

/** get selected keywods */
export async function getSelectedKeywords(options?: { [key: string]: any }) {
  return request<API.Keyword[]>('/api/analysis/keywords/selected_words', {
    method: 'GET',
    ...(options || {}),
  });
}

/** get occurence */
export async function getKeywordOccurenceStats(options?: { [key: string]: any }) {
  return request<API.KeywordOccurrenceStat[]>('/api/analysis/keywords/occurrence', {
    method: 'GET',
    ...(options || {}),
  });
}
