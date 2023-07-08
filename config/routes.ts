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
    name: 'Keywords Analysis',
    icon: 'font-colors',
    path: '/keywords-analysis',
    component: './KeywordAnalysis',
  },
  {
    name: 'Comments Analysis',
    icon: 'comment',
    path: '/comments-analysis',
    component: './CommentAnalysis',
  },
  {
    name: 'Customer Clustering',
    icon: 'team',
    path: '/customer-clustering',
    component: './CustomerClustering',
  },
  {
    name: 'Products Analysis',
    icon: 'shopping',
    path: '/products-analysis',
    component: './ProductAnalysis',
  },
  {
    path: '/',
    redirect: '/overview',
  },
  {
    component: './404',
  },
];
