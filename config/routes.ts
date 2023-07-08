export default [
  {
    path: '/overview',
    name: 'Overview',
    icon: 'home',
    component: './Overview',
  },
  {
    path: '/add-comment',
    name: 'New Comment',
    icon: 'plus-circle',
    component: './AddComment',
  },
  {
    name: 'Comments Analysis',
    icon: 'comment',
    path: '/comments-analysis',
    component: './CommentAnalysis',
  },
  {
    name: 'Products Analysis',
    icon: 'shopping',
    path: '/products-analysis',
    component: './KeywordAnalysis',
  },
  {
    name: 'Customer Clustering',
    icon: 'team',
    path: '/customer-clustering',
    component: './KeywordAnalysis',
  },
  {
    name: 'Keywords Analysis',
    icon: 'font-colors',
    path: '/keywords-analysis',
    component: './KeywordAnalysis',
  },
  {
    path: '/',
    redirect: '/overview',
  },
  {
    component: './404',
  },
];
