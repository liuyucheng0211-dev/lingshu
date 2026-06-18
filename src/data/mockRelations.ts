export interface FriendMemory {
  id: string;
  name: string;
  avatar: string;
  space: 'life' | 'office';
  interests: string[];
  recentTopics: string[];
  importantDates: string[];
  communicationStyle: string[];
  collaborationMemory: string[];
  suggestions: string[];
  role?: string;
  expertise?: string[];
  workStyle?: string[];
}

export interface GroupMemory {
  id: string;
  name: string;
  space: 'life' | 'office';
  members: string[];
  recentTopics: string[];
  confirmed: string[];
  pending: string[];
  suggestions: string[];
}

export const mockFriends: FriendMemory[] = [
  {
    id: 'xiaolin',
    name: '小林',
    avatar: 'XL',
    space: 'life',
    interests: ['科幻电影', '咖啡', '短途旅行'],
    recentTopics: ['想看新上映的科幻片', '周末电影安排'],
    importantDates: ['生日 9月12日'],
    communicationStyle: ['喜欢直接确认时间', '不太喜欢太正式的语气'],
    collaborationMemory: ['上次负责整理露营装备', '常帮忙确认活动细节'],
    suggestions: ['可以用轻松语气提醒她确认周五时间'],
  },
  {
    id: 'xiaochen',
    name: '小陈',
    avatar: 'XC',
    space: 'life',
    interests: ['摄影', '户外运动', '美食'],
    recentTopics: ['分享了旅行照片', '周六露营活动'],
    importantDates: [],
    communicationStyle: ['喜欢分享', '回复比较快'],
    collaborationMemory: ['经常发起活动', '擅长组织协调'],
    suggestions: ['可以问问她对露营集合地点的想法'],
  },
  {
    id: 'ayuan',
    name: '阿远',
    avatar: 'AY',
    space: 'life',
    interests: ['徒步', '音乐', '咖啡'],
    recentTopics: ['露营路线建议', '新开的咖啡店'],
    importantDates: [],
    communicationStyle: ['喜欢给建议', '话不多但很靠谱'],
    collaborationMemory: ['负责路线规划', '经常帮忙购买物资'],
    suggestions: ['可以让他确认一下饮料清单'],
  },
  {
    id: 'lina',
    name: '李娜',
    avatar: 'LN',
    space: 'office',
    role: '客户经理',
    interests: [],
    expertise: ['报价管理', '客户沟通', '项目协调'],
    recentTopics: ['报价单确认', '客户需求反馈', '周五同步时间'],
    importantDates: [],
    communicationStyle: ['喜欢明确时间节点', '注重效率和准确性'],
    collaborationMemory: ['负责报价单确认和客户对接', '经常发起同步讨论'],
    workStyle: ['上午处理邮件', '喜欢提前预约会议时间'],
    suggestions: ['可以在今天 18:00 前提醒她确认报价单'],
  },
  {
    id: 'wanglei',
    name: '王磊',
    avatar: 'WL',
    space: 'office',
    role: '设计师',
    interests: [],
    expertise: ['视觉设计', '首页改版', '品牌设计'],
    recentTopics: ['首页视觉调整', '明天下午前完成修改'],
    importantDates: [],
    communicationStyle: ['喜欢看到具体参考', '反馈很直接'],
    collaborationMemory: ['负责首页图和视觉调整', '经常需要明确的修改方向'],
    workStyle: ['下午效率最高', '喜欢看图说话'],
    suggestions: ['可以给他发一些首页修改的参考图'],
  },
  {
    id: 'xiaozhang',
    name: '小张',
    avatar: 'XZ',
    space: 'office',
    role: '开发工程师',
    interests: [],
    expertise: ['前端开发', '技术方案', '代码审查'],
    recentTopics: ['方案截图补充', '首页改版技术方案'],
    importantDates: [],
    communicationStyle: ['喜欢技术细节', '需要明确的开发需求'],
    collaborationMemory: ['负责前端实现', '经常需要和设计对齐方案'],
    workStyle: ['习惯异步沟通', '喜欢文档先行'],
    suggestions: ['可以把方案截图整理好发给他评估'],
  },
];

export const mockGroups: GroupMemory[] = [
  {
    id: 'group1',
    name: '周末露营小队',
    space: 'life',
    members: ['小陈', '小林', '阿远', '你'],
    recentTopics: ['露营', '路线', '装备', '集合时间'],
    confirmed: ['周六露营', '小林带帐篷', '阿远买饮料'],
    pending: ['集合地点', '集合时间', '是否需要餐垫'],
    suggestions: ['可以现在发一条轻松提醒，确认集合地点'],
  },
  {
    id: 'group2',
    name: '读书小组',
    space: 'life',
    members: ['小陈', '阿远', '你', '小周'],
    recentTopics: ['《三体》讨论', '本周阅读进度'],
    confirmed: ['本周讨论《三体》'],
    pending: ['周五具体讨论时间', '讨论章节范围'],
    suggestions: ['可以发一条提醒确认讨论时间'],
  },
  {
    id: 'group3',
    name: '设计小队',
    space: 'office',
    members: ['李娜', '王磊', '你', '小张'],
    recentTopics: ['报价单确认', '首页视觉调整', '周五同步'],
    confirmed: ['首页视觉需要调整', '报价单今天18:00前确认'],
    pending: ['周五同步具体时间', '是否需要补充方案截图'],
    suggestions: ['可以生成一条确认周五时间的消息'],
  },
  {
    id: 'group4',
    name: '官网改版群',
    space: 'office',
    members: ['王磊', '小张', '你', '产品经理小李'],
    recentTopics: ['首页改版', '技术方案评审', '上线时间'],
    confirmed: ['首页视觉方案已定', '技术方案本周评审'],
    pending: ['上线时间', '是否需要 A/B 测试'],
    suggestions: ['可以整理一份改版进度同步给群成员'],
  },
];