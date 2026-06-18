export interface SharedRecord {
  id: string;
  title: string;
  summary: string;
  confirmed: string[];
  pending: string[];
  sourceChat: string;
  date: string;
  category: 'recent' | 'recommended';
}

export const mockRecords: SharedRecord[] = [
  {
    id: 'rec1',
    title: '周五同步讨论记录',
    summary: '本次主要确认了首页修改方向、报价单确认时间和下一次同步安排。',
    confirmed: ['首页视觉需要调整', '报价单今天18:00前确认'],
    pending: ['周五同步的具体时间', '是否需要补充方案截图'],
    sourceChat: '设计小队',
    date: '2026-06-17',
    category: 'recent',
  },
  {
    id: 'rec2',
    title: '报价单确认记录',
    summary: '李娜需要在今天18:00前确认报价单，客户正在等待反馈。',
    confirmed: ['报价单文件已发送', '今天18:00前确认'],
    pending: ['最终报价版本', '是否需要补充说明'],
    sourceChat: '设计小队',
    date: '2026-06-18',
    category: 'recent',
  },
  {
    id: 'rec3',
    title: '活动分工清单',
    summary: '露营活动各成员分工已确认，包括装备、物资和路线安排。',
    confirmed: ['小林带帐篷', '阿远买饮料', '你确认路线'],
    pending: ['集合地点', '集合时间'],
    sourceChat: '周末露营小队',
    date: '2026-06-17',
    category: 'recent',
  },
  {
    id: 'rec4',
    title: '本周群聊回顾',
    summary: '本周设计小队主要讨论了报价单确认和首页改版两项工作。',
    confirmed: ['首页视觉调整方向', '报价单发送给客户'],
    pending: ['周五同步时间', '方案截图补充'],
    sourceChat: '设计小队',
    date: '2026-06-16',
    category: 'recent',
  },
  {
    id: 'rec5',
    title: '露营群待确认事项',
    summary: '露营群有3条待确认事项，包括集合地点、餐垫和时间。',
    confirmed: [],
    pending: ['集合地点', '是否需要餐垫', '集合时间'],
    sourceChat: '周末露营小队',
    date: '2026-06-18',
    category: 'recommended',
  },
  {
    id: 'rec6',
    title: '设计群讨论记录',
    summary: '设计群可以生成一份讨论记录，包含近期确认的修改和待定事项。',
    confirmed: [],
    pending: ['周五同步时间', '方案截图补充'],
    sourceChat: '设计小队',
    date: '2026-06-18',
    category: 'recommended',
  },
];