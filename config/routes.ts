export default [
  {
    path: '/add',
    name: 'Add a Comment',
    icon: 'comment',
    component: './AddComment',
  },
  {
    name: '查询表格',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/add',
  },
  {
    component: './404',
  },
];
