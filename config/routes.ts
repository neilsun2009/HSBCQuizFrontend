export default [
  {
    path: '/add',
    name: 'New Comment',
    icon: 'plus-circle',
    component: './AddComment',
  },
  {
    name: 'Keywords Analysis',
    icon: 'font-colors',
    path: '/keywords-analysis',
    component: './KeywordAnalysis',
  },
  {
    name: 'Consumer Clustering',
    icon: 'team',
    path: '/consumer-clustering',
    component: './KeywordAnalysis',
  },
  {
    name: 'Comments Analysis',
    icon: 'comment',
    path: '/comments-analysis',
    component: './KeywordAnalysis',
  },
  {
    name: 'Products Analysis',
    icon: 'shopping',
    path: '/products-analysis',
    component: './KeywordAnalysis',
  },
  {
    path: '/',
    redirect: '/add',
  },
  {
    component: './404',
  },
];
