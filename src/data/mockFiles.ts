export interface FileItem {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  category: 'recent' | 'group' | 'starred' | 'ai-organized';
  summary?: string;
  suggestion?: string;
  content?: string;
  editable?: boolean;
}

export const mockFiles: FileItem[] = [
  {
    id: 'f1',
    name: '报价单.pdf',
    type: 'pdf',
    size: '2.4 MB',
    date: '2026-06-18',
    category: 'recent',
    editable: true,
    summary: '该文件包含三个报价方案，其中方案B价格最低，方案C包含更多服务项。',
    suggestion: '可以发给李娜确认最终版本。',
    content: `【报价单】

项目名称：首页改版设计
日期：2026年6月18日

方案 A - 基础版
- 首页视觉调整：¥8,000
- 响应式适配：¥3,000
- 总计：¥11,000

方案 B - 标准版
- 首页视觉调整：¥8,000
- 响应式适配：¥3,000
- 3个内页设计：¥5,000
- 总计：¥16,000

方案 C - 完整版
- 首页视觉调整：¥8,000
- 响应式适配：¥3,000
- 5个内页设计：¥8,000
- 品牌元素优化：¥4,000
- 动效设计：¥3,000
- 总计：¥26,000

备注：
方案B价格最低且覆盖核心需求，方案C包含更多服务项。
建议客户根据预算选择合适的方案。`,
  },
  {
    id: 'f2',
    name: '首页修改建议.docx',
    type: 'docx',
    size: '1.8 MB',
    date: '2026-06-17',
    category: 'recent',
    editable: true,
    summary: '包含首页视觉调整的详细建议和参考图。',
    suggestion: '可以发给王磊作为改版参考。',
    content: `【首页修改建议】

1. Banner 区域
   - 主标题字号建议从 32px 调整为 40px，增强视觉冲击力
   - 背景色从纯白改为浅灰渐变，增加层次感
   - CTA 按钮颜色使用品牌蓝 #4F7CFF

2. 产品展示区
   - 卡片间距从 16px 增加到 24px
   - 添加 hover 上浮效果，提升交互感
   - 图片圆角从 8px 调整为 12px

3. 底部导航
   - 简化导航层级，保留核心入口
   - 添加社交媒体图标
   - 版权信息更新为 2026 年

4. 整体风格
   - 保持简洁大气风格
   - 增加微动效提升品质感
   - 移动端适配需要重点优化`,
  },
  {
    id: 'f3',
    name: '活动海报.png',
    type: 'png',
    size: '5.2 MB',
    date: '2026-06-16',
    category: 'recent',
    editable: false,
  },
  {
    id: 'f4',
    name: '露营路线图.jpg',
    type: 'jpg',
    size: '3.1 MB',
    date: '2026-06-17',
    category: 'group',
    editable: false,
  },
  {
    id: 'f5',
    name: '方案A截图.png',
    type: 'png',
    size: '1.5 MB',
    date: '2026-06-16',
    category: 'group',
    editable: false,
  },
  {
    id: 'f6',
    name: '方案B截图.png',
    type: 'png',
    size: '1.7 MB',
    date: '2026-06-16',
    category: 'group',
    editable: false,
  },
  {
    id: 'f7',
    name: '读书笔记模板.docx',
    type: 'docx',
    size: '0.8 MB',
    date: '2026-06-15',
    category: 'ai-organized',
    editable: true,
    summary: 'AI 整理的读书笔记模板，方便小组讨论记录。',
    content: `【读书笔记模板】

书名：《三体》
作者：刘慈欣
阅读日期：2026年6月

核心观点：
1. 黑暗森林法则——宇宙社会学的基本假设
2. 技术爆炸——文明发展的非线性特征
3. 猜疑链——星际文明间的信任困境

精彩段落摘录：
"给岁月以文明，而不是给文明以岁月。"

个人思考：
（在此记录你的想法和感悟）

讨论问题：
1. 黑暗森林法则在现实中是否有映射？
2. 面对未知文明，人类的应对策略是否合理？`,
  },
  {
    id: 'f8',
    name: '本周讨论总结.pdf',
    type: 'pdf',
    size: '1.2 MB',
    date: '2026-06-17',
    category: 'ai-organized',
    editable: true,
    summary: 'AI 自动生成的本周群聊讨论总结。',
    content: `【本周讨论总结】

生成时间：2026年6月17日
来源：设计小队群聊

本周重点讨论：
1. 首页改版方案评审
   - 王磊提交了3个视觉方案
   - 团队倾向于方案B（简洁现代风格）
   - 需要补充移动端适配方案

2. 报价单确认进度
   - 李娜已发送报价单给客户
   - 客户反馈需要在今天18:00前确认
   - 方案B和方案C是主要选项

3. 周五同步安排
   - 时间待定（建议上午10:00-11:00）
   - 需要准备：方案截图、报价对比、时间排期

下周计划：
- 确认最终报价方案
- 启动首页改版开发
- 安排客户汇报会议`,
  },
];