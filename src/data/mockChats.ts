export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isAI?: boolean;
}

export interface Chat {
  id: string;
  name: string;
  type: 'private' | 'group';
  space: 'life' | 'office';
  avatar?: string;
  lastMessage?: string;
  lastTime?: string;
}

export const mockChats: Chat[] = [
  { id: 'chat1', name: '小林', type: 'private', space: 'life', lastMessage: '周末要不要一起去看电影？', lastTime: '10:32' },
  { id: 'chat2', name: '周末露营小队', type: 'group', space: 'life', lastMessage: '阿远：我负责买饮料', lastTime: '昨天' },
  { id: 'chat3', name: '读书小组', type: 'group', space: 'life', lastMessage: '本周讨论《三体》', lastTime: '周一' },
  { id: 'chat4', name: '设计小队', type: 'group', space: 'office', lastMessage: '李娜：报价单今天确认', lastTime: '09:15' },
  { id: 'chat5', name: '官网改版群', type: 'group', space: 'office', lastMessage: '王磊：首页图明天下午前', lastTime: '昨天' },
  { id: 'chat6', name: '阿远', type: 'private', space: 'life', lastMessage: '发来了新的路线建议', lastTime: '昨天' },
  { id: 'chat7', name: '小陈', type: 'private', space: 'life', lastMessage: '分享了旅行照片', lastTime: '前天' },
  { id: 'chat8', name: '李娜', type: 'private', space: 'office', lastMessage: '报价单方案B和C你觉得哪个更好？', lastTime: '09:05' },
  { id: 'chat9', name: '王磊', type: 'private', space: 'office', lastMessage: '首页图改了，你看看效果', lastTime: '昨天' },
  { id: 'chat10', name: '小张', type: 'private', space: 'office', lastMessage: '技术方案我发你了，帮忙评审一下', lastTime: '周一' },
];

export const mockPrivateMessages: Record<string, ChatMessage[]> = {
  chat1: [
    { id: 'm1', senderId: 'xiaolin', senderName: '小林', content: '周末要不要一起去看电影？', timestamp: '10:30' },
    { id: 'm2', senderId: 'me', senderName: '你', content: '可以啊，有什么推荐？', timestamp: '10:31' },
    { id: 'm3', senderId: 'xiaolin', senderName: '小林', content: '我想看那个科幻片，新上映的《星际迷航》', timestamp: '10:32' },
    { id: 'm4', senderId: 'me', senderName: '你', content: '好啊，我也想看这部。周五晚上？', timestamp: '10:33' },
    { id: 'm5', senderId: 'xiaolin', senderName: '小林', content: '周五我不行，周六晚上吧', timestamp: '10:34' },
    { id: 'm6', senderId: 'me', senderName: '你', content: '行，那周六晚上7点？', timestamp: '10:35' },
    { id: 'm7', senderId: 'xiaolin', senderName: '小林', content: '好的，到时候见！', timestamp: '10:36' },
    { id: 'm8', senderId: 'ai', senderName: 'AI 小助手', content: '我记得小林之前也喜欢《星际穿越》类型的电影，可以问问她对这部新片的期待。', timestamp: '10:36', isAI: true },
  ],
  chat6: [
    { id: 'm1', senderId: 'ayuan', senderName: '阿远', content: '我看了几条露营路线，发你看看', timestamp: '昨天 15:00' },
    { id: 'm2', senderId: 'me', senderName: '你', content: '好的，发过来', timestamp: '昨天 15:02' },
    { id: 'm3', senderId: 'ayuan', senderName: '阿远', content: '路线A比较近但风景一般，路线B远一点但是湖边风景很好', timestamp: '昨天 15:05' },
    { id: 'm4', senderId: 'me', senderName: '你', content: '我觉得路线B不错，可以在群里发一下让大家选', timestamp: '昨天 15:08' },
  ],
  chat7: [
    { id: 'm1', senderId: 'xiaochen', senderName: '小陈', content: '周末去了趟川西，风景太美了！', timestamp: '前天 10:00' },
    { id: 'm2', senderId: 'me', senderName: '你', content: '哇，照片拍得真好！', timestamp: '前天 10:02' },
    { id: 'm3', senderId: 'xiaochen', senderName: '小陈', content: '下次一起去啊，那边秋天特别美', timestamp: '前天 10:05' },
  ],
  chat8: [
    { id: 'm1', senderId: 'lina', senderName: '李娜', content: '报价单方案B和C你看了吗？', timestamp: '09:00' },
    { id: 'm2', senderId: 'me', senderName: '你', content: '刚看了，方案B报价更合理，方案C服务更全', timestamp: '09:03' },
    { id: 'm3', senderId: 'lina', senderName: '李娜', content: '我也倾向方案B，客户预算有限，B方案性价比更高', timestamp: '09:05' },
    { id: 'm4', senderId: 'me', senderName: '你', content: '行，那就定方案B，我发群里确认', timestamp: '09:08' },
  ],
  chat9: [
    { id: 'm1', senderId: 'wanglei', senderName: '王磊', content: '首页图改了一版，你看看效果', timestamp: '昨天 16:00' },
    { id: 'm2', senderId: 'me', senderName: '你', content: '整体感觉不错，比之前更有层次感了', timestamp: '昨天 16:05' },
    { id: 'm3', senderId: 'wanglei', senderName: '王磊', content: '好的，那我再微调一下细节，明天下午前发终稿', timestamp: '昨天 16:08' },
  ],
  chat10: [
    { id: 'm1', senderId: 'xiaozhang', senderName: '小张', content: '技术方案写好了，帮忙评审一下', timestamp: '周一 14:00' },
    { id: 'm2', senderId: 'me', senderName: '你', content: '收到，我先看看', timestamp: '周一 14:30' },
    { id: 'm3', senderId: 'xiaozhang', senderName: '小张', content: '第三部分关于性能优化的方案有两个选项，需要你帮我看一下哪个更合适', timestamp: '周一 14:35' },
  ],
};

export const mockGroupMessages: Record<string, ChatMessage[]> = {
  chat2: [
    { id: 'm1', senderId: 'xiaochen', senderName: '小陈', content: '这周六去露营怎么样？', timestamp: '昨天 14:20' },
    { id: 'm2', senderId: 'xiaolin', senderName: '小林', content: '可以，我带帐篷。', timestamp: '昨天 14:22' },
    { id: 'm3', senderId: 'ayuan', senderName: '阿远', content: '我负责买饮料。', timestamp: '昨天 14:25' },
    { id: 'm4', senderId: 'me', senderName: '你', content: '那我看看路线。', timestamp: '昨天 14:28' },
    { id: 'm5', senderId: 'xiaochen', senderName: '小陈', content: '有人知道集合地点定哪里比较好吗？', timestamp: '昨天 14:35' },
    { id: 'm6', senderId: 'ayuan', senderName: '阿远', content: '我发了两条路线在群里，大家看看', timestamp: '昨天 15:10' },
    { id: 'm7', senderId: 'xiaolin', senderName: '小林', content: '路线B湖边的不错！', timestamp: '昨天 15:15' },
    { id: 'm8', senderId: 'me', senderName: '你', content: '同感，那就路线B吧。不过集合地点还没定。', timestamp: '昨天 15:18' },
    { id: 'm9', senderId: 'xiaochen', senderName: '小陈', content: '还需要带餐垫吗？', timestamp: '昨天 15:20' },
  ],
  chat4: [
    { id: 'm1', senderId: 'lina', senderName: '李娜', content: '报价单我已经发群里了，大家看一下', timestamp: '09:00' },
    { id: 'm2', senderId: 'wanglei', senderName: '王磊', content: '收到，首页图我明天下午前改好', timestamp: '09:05' },
    { id: 'm3', senderId: 'lina', senderName: '李娜', content: '报价单今天18:00前需要确认，客户在等', timestamp: '09:10' },
    { id: 'm4', senderId: 'me', senderName: '你', content: '好的，我看一下方案B和方案C', timestamp: '09:12' },
    { id: 'm5', senderId: 'lina', senderName: '李娜', content: '周五上午我们同步一下进展', timestamp: '09:15' },
    { id: 'm6', senderId: 'wanglei', senderName: '王磊', content: '周五上午几点？', timestamp: '09:16' },
    { id: 'm7', senderId: 'lina', senderName: '李娜', content: '具体时间还没定，大家看什么时候方便', timestamp: '09:18' },
    { id: 'm8', senderId: 'me', senderName: '你', content: '我上午10点以后都可以', timestamp: '09:20' },
  ],
};