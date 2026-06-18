export interface SocialFeedItem {
  id: string;
  avatar: string;
  name: string;
  content: string;
  time: string;
  space: 'life' | 'office';
  images?: string[];
  likes: number;
  liked: boolean;
  comments: { name: string; content: string }[];
}

export const mockLifeFeed: SocialFeedItem[] = [
  {
    id: 'f1',
    avatar: 'XC',
    name: '小陈',
    content: '周末去了趟川西，风景太美了！分享几张照片给大家～',
    time: '10分钟前',
    space: 'life',
    images: ['https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Beautiful+western+Sichuan+mountain+landscape+with+blue+sky+and+green+valley,+photography+style&image_size=square_hd'],
    likes: 12,
    liked: false,
    comments: [
      { name: '小林', content: '好漂亮！下次一起去' },
      { name: '阿远', content: '这是新都桥那边吗？' },
    ],
  },
  {
    id: 'f2',
    avatar: 'AY',
    name: '阿远',
    content: '发现了一家超棒的咖啡店，手冲绝了！推荐给喜欢咖啡的朋友们',
    time: '30分钟前',
    space: 'life',
    images: ['https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Cozy+minimalist+coffee+shop+interior+with+pour+over+coffee,+warm+lighting,+aesthetic&image_size=square_hd'],
    likes: 8,
    liked: true,
    comments: [
      { name: '你', content: '地址发我！' },
    ],
  },
  {
    id: 'f3',
    avatar: 'XL',
    name: '小林',
    content: '刚看完《星际迷航》，特效太震撼了。强烈推荐给科幻迷！最近还有什么好看的科幻片吗？',
    time: '1小时前',
    space: 'life',
    images: [],
    likes: 15,
    liked: false,
    comments: [
      { name: '小陈', content: '《沙丘3》好像要上了' },
      { name: '你', content: '这周末一起去看？' },
      { name: '阿远', content: '我也想看！' },
    ],
  },
  {
    id: 'f4',
    avatar: 'LY',
    name: '周末露营小队',
    content: '本周六露营活动安排：\n集合时间：上午9:00\n集合地点：待定（大家投票）\n装备：小林带帐篷，阿远买饮料\n路线：阿远分享的路线B\n\n还有谁要带什么？在群里说一下～',
    time: '2小时前',
    space: 'life',
    images: [],
    likes: 6,
    liked: false,
    comments: [
      { name: '小陈', content: '我带了餐垫和零食' },
      { name: '小林', content: '帐篷已就绪！' },
    ],
  },
  {
    id: 'f5',
    avatar: 'XC',
    name: '小陈',
    content: '分享一下最近读的《三体》读书笔记，黑暗森林法则真的太震撼了。"给岁月以文明，而不是给文明以岁月。"',
    time: '昨天',
    space: 'life',
    images: [],
    likes: 20,
    liked: true,
    comments: [
      { name: '阿远', content: '读到第二部了，停不下来' },
      { name: '小林', content: '我也刚看完，周五讨论！' },
    ],
  },
];

export const mockOfficeFeed: SocialFeedItem[] = [
  {
    id: 'o1',
    avatar: 'SJ',
    name: '设计小队',
    content: '报价单确认进度更新：三个方案已发给客户，今天18:00前需要确认最终版本。大家看看方案B和方案C哪个更合适？',
    time: '10分钟前',
    space: 'office',
    images: [],
    likes: 4,
    liked: false,
    comments: [
      { name: '李娜', content: '我倾向于方案B，性价比最高' },
      { name: '王磊', content: '方案C视觉上更好，客户可能会喜欢' },
    ],
  },
  {
    id: 'o2',
    avatar: 'GW',
    name: '官网改版群',
    content: '首页视觉调整方案已更新，王磊明天下午前完成修改。大家有什么建议可以在群里提。',
    time: '1小时前',
    space: 'office',
    images: [],
    likes: 3,
    liked: false,
    comments: [
      { name: '小张', content: '技术方案我这边可以同步开始' },
    ],
  },
  {
    id: 'o3',
    avatar: 'LN',
    name: '李娜',
    content: '上传了报价单.pdf 到共享文件，包含三个方案的详细对比。大家有空看一下，下午开会讨论。',
    time: '2小时前',
    space: 'office',
    images: [],
    likes: 5,
    liked: true,
    comments: [
      { name: '你', content: '收到，我看一下' },
      { name: '王磊', content: '方案B的报价需要调整一下' },
    ],
  },
  {
    id: 'o4',
    avatar: 'WL',
    name: '王磊',
    content: '首页改版设计稿初版完成了，大家看看效果。有什么修改意见今天内反馈给我～',
    time: '昨天',
    space: 'office',
    images: ['https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Modern+clean+website+homepage+design+mockup+with+blue+and+purple+accent+colors,+professional+UI+design&image_size=square_hd'],
    likes: 8,
    liked: false,
    comments: [
      { name: '李娜', content: '整体风格很赞！' },
      { name: '小张', content: '移动端适配需要再看一下' },
    ],
  },
];