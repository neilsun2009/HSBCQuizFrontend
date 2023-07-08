// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

// overview
/** get overview */
export async function getOverview(options?: { [key: string]: any }) {
  return request<API.Overview>('/api/analysis/overview', {
    method: 'GET',
    ...(options || {}),
  });
}

// keyword analysis
/** get top 500 */
export async function getKeywordTop500(options?: { [key: string]: any }) {
  return request<API.Keyword[]>('/api/analysis/keywords/top500', {
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

/** get occurrence */
export async function getKeywordOccurenceStats(options?: { [key: string]: any }) {
  return request<API.KeywordOccurrenceStat[]>('/api/analysis/keywords/occurrences', {
    method: 'GET',
    ...(options || {}),
  });
}

// comment analysis
/** get comment length */
export async function getCommentLengthStats(options?: { [key: string]: any }) {
  return request<API.CommonStat[]>('/api/analysis/comments/lengths', {
    method: 'GET',
    ...(options || {}),
  });
}

/** get comment sentiiment  */
export async function getCommentSentimentStats(options?: { [key: string]: any }) {
  return request<API.CommonStat[]>('/api/analysis/comments/sentiments', {
    method: 'GET',
    ...(options || {}),
  });
}

/** get comment rating  */
export async function getCommentRatingStats(options?: { [key: string]: any }) {
  return request<API.CommentRatingStat[]>('/api/analysis/comments/ratings', {
    method: 'GET',
    ...(options || {}),
  });
}

// customer cluster
/** get customer cluster points  */
export async function getCustomerClusterPoints(options?: { [key: string]: any }) {
  return request<API.CustomerClusterPoint[]>('/api/analysis/customers/cluster_points', {
    method: 'GET',
    ...(options || {}),
  });
}

/** get customer clusters  */
export async function getCustomerClusterStats(options?: { [key: string]: any }) {
  return request<API.CustomerClusterStat[]>('/api/analysis/customers/clusters', {
    method: 'GET',
    ...(options || {}),
  });
}

// product cluster
/** get product comment counts  */
export async function getProductCommentCountStats(options?: { [key: string]: any }) {
  return request<API.ProductCommentCountStat[]>('/api/analysis/products/comment_counts', {
    method: 'GET',
    ...(options || {}),
  });
}

/** get best products  */
export async function getBestProducts(options?: { [key: string]: any }) {
  return request<API.BestWorstProductStat[]>('/api/analysis/products/bests', {
    method: 'GET',
    ...(options || {}),
  });
}

/** get worst products  */
export async function getWorstProducts(options?: { [key: string]: any }) {
  return request<API.BestWorstProductStat[]>('/api/analysis/products/worsts', {
    method: 'GET',
    ...(options || {}),
  });
}
