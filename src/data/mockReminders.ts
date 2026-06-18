export interface Reminder {
  id: string;
  title: string;
  time: string;
  space: 'life' | 'office';
  importance: 'normal' | 'important' | 'private';
  status: 'today' | 'week' | 'pending' | 'done';
  source?: string;
}

export const mockReminders: Reminder[] = [
  {
    id: 'r1',
    title: '18:00 前确认报价单',
    time: '今天 18:00',
    space: 'office',
    importance: 'important',
    status: 'today',
    source: '设计小队群聊',
  },
  {
    id: 'r2',
    title: '20:00 和小林确认电影时间',
    time: '今天 20:00',
    space: 'life',
    importance: 'important',
    status: 'today',
    source: '小林',
  },
  {
    id: 'r3',
    title: '给露营群发路线',
    time: '今天',
    space: 'life',
    importance: 'normal',
    status: 'today',
    source: '周末露营小队',
  },
  {
    id: 'r4',
    title: '周五上午同步讨论',
    time: '周五上午',
    space: 'office',
    importance: 'important',
    status: 'week',
    source: '设计小队群聊',
  },
  {
    id: 'r5',
    title: '周六露营活动',
    time: '周六',
    space: 'life',
    importance: 'normal',
    status: 'week',
    source: '周末露营小队',
  },
  {
    id: 'r6',
    title: '读书小组讨论《三体》',
    time: '周五',
    space: 'life',
    importance: 'normal',
    status: 'week',
    source: '读书小组',
  },
  {
    id: 'r7',
    title: '露营集合地点',
    time: '待定',
    space: 'life',
    importance: 'normal',
    status: 'pending',
    source: '周末露营小队',
  },
  {
    id: 'r8',
    title: '报价单最终版本',
    time: '待定',
    space: 'office',
    importance: 'important',
    status: 'pending',
    source: '设计小队群聊',
  },
  {
    id: 'r9',
    title: '周五同步具体时间',
    time: '待定',
    space: 'office',
    importance: 'normal',
    status: 'pending',
    source: '设计小队群聊',
  },
  {
    id: 'r10',
    title: '发送活动海报',
    time: '已完成',
    space: 'life',
    importance: 'normal',
    status: 'done',
    source: '读书小组',
  },
  {
    id: 'r11',
    title: '收藏小林推荐的电影',
    time: '已完成',
    space: 'life',
    importance: 'normal',
    status: 'done',
  },
  {
    id: 'r12',
    title: '确认露营餐垫',
    time: '待定',
    space: 'life',
    importance: 'normal',
    status: 'pending',
    source: '周末露营小队',
  },
];