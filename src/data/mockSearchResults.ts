export interface SearchResult {
  type: 'ai-answer' | 'chat' | 'contact' | 'record' | 'knowledge';
  title: string;
  description: string;
  source?: string;
  space: 'life' | 'office' | 'knowledge';
  actions: string[];
  url?: string;
}

export interface SearchResponse {
  query: string;
  aiSummary?: string;
  lifeResults: SearchResult[];
  officeResults: SearchResult[];
  knowledgeResults: SearchResult[];
  hiddenCount: number;
  relatedRecords: SearchResult[];
}

export const mockSearchExamples = [
  '今天有什么重要提醒？',
  '小林最近聊到了什么？',
  '帮我找报价单相关记录',
  '什么是设计系统？有哪些最佳实践？',
  'AI 如何帮助团队提升协作效率？',
  '最近流行的前端技术趋势是什么？',
  '总结这个群最近的讨论',
];

function generateKnowledgeResults(query: string): { summary: string; results: SearchResult[] } {
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes('设计系统') || lowerQuery.includes('设计规范')) {
    return {
      summary: '设计系统是一套可复用的设计组件、模式和指南的集合，帮助团队以一致的方式构建产品。成熟的设计系统通常包含设计令牌（色彩、字体、间距）、UI组件库、交互模式、无障碍指南等。主流实践包括 Material Design、Apple HIG、Ant Design 等。采用设计系统可将产品开发效率提升30-50%，并确保跨产品的一致性。',
      results: [
        { type: 'knowledge', title: 'Material Design 3', description: 'Google 开源设计系统，支持动态配色与自适应布局', space: 'knowledge', actions: ['阅读文档', '查看组件', '引用'], url: 'https://m3.material.io' },
        { type: 'knowledge', title: 'Ant Design', description: '蚂蚁集团出品的企业级设计体系，支持 React/Vue/Angular', space: 'knowledge', actions: ['阅读文档', '查看组件'], url: 'https://ant.design' },
        { type: 'knowledge', title: '设计令牌 (Design Tokens)', description: '将设计决策编码为平台无关的数据，是设计系统的基础设施', space: 'knowledge', actions: ['了解更多', '引用'], url: 'https://tr.designtokens.org' },
      ],
    };
  }

  if (lowerQuery.includes('ai') && (lowerQuery.includes('团队') || lowerQuery.includes('协作') || lowerQuery.includes('效率'))) {
    return {
      summary: 'AI 正在深刻改变团队协作方式。通过自然语言处理、智能摘要、自动化工作流等技术，AI 可以显著减少重复劳动。据 McKinsey 报告，AI 可将知识工作者的生产力提升 30-45%。关键应用场景包括：智能会议纪要、自动化任务分配、代码辅助生成、知识库智能检索等。',
      results: [
        { type: 'knowledge', title: 'AI 驱动的工作流自动化', description: '通过 AI 自动处理审批、分配任务、生成报告等重复性工作，节省团队 40% 时间', space: 'knowledge', actions: ['阅读详情', '引用'], url: 'https://zapier.com/blog/ai-automation' },
        { type: 'knowledge', title: 'GitHub Copilot', description: 'AI 编程助手，可将开发者编码效率提升 55%，已服务超过 100 万开发者', space: 'knowledge', actions: ['阅读详情', '引用'], url: 'https://github.com/features/copilot' },
        { type: 'knowledge', title: 'Notion AI', description: '集成在 Notion 中的 AI 助手，支持文档生成、翻译、摘要和头脑风暴', space: 'knowledge', actions: ['阅读详情', '引用'], url: 'https://www.notion.so/product/ai' },
      ],
    };
  }

  if (lowerQuery.includes('前端') || lowerQuery.includes('技术趋势') || lowerQuery.includes('技术栈')) {
    return {
      summary: '2025-2026 年前端技术持续演进，React Server Components、Next.js App Router、AI 驱动的开发工具成为主流趋势。TypeScript 覆盖率超过 90%，Tailwind CSS 成为最受欢迎的样式方案。WebAssembly 在性能密集场景中的使用持续增长。',
      results: [
        { type: 'knowledge', title: 'React Server Components', description: 'React 19 的核心特性，允许组件在服务端渲染，减少客户端 JS 体积', space: 'knowledge', actions: ['阅读详情', '引用'], url: 'https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023' },
        { type: 'knowledge', title: 'Next.js 14+ App Router', description: 'Vercel 推出的全栈框架，支持 React Server Components、流式渲染和增量静态再生', space: 'knowledge', actions: ['阅读详情', '引用'], url: 'https://nextjs.org/docs/app' },
        { type: 'knowledge', title: 'Tailwind CSS v4', description: '原子化 CSS 框架，采用 CSS 优先配置模式，性能提升 5 倍', space: 'knowledge', actions: ['阅读详情', '引用'], url: 'https://tailwindcss.com' },
        { type: 'knowledge', title: 'WebAssembly (Wasm)', description: '在浏览器中运行高性能代码的二进制格式，Figma 和 Photoshop Web 版均基于 Wasm', space: 'knowledge', actions: ['阅读详情', '引用'], url: 'https://webassembly.org' },
      ],
    };
  }

  if (lowerQuery.includes('科技') || lowerQuery.includes('新闻')) {
    return {
      summary: '近期科技领域的热点话题集中在生成式 AI、空间计算和量子计算突破。Apple Vision Pro 开启了空间计算时代，OpenAI 的 Sora 模型重新定义了 AI 视频生成，Google Gemini 则展示了多模态 AI 的潜力。',
      results: [
        { type: 'knowledge', title: 'Apple Vision Pro · 空间计算', description: '苹果首款空间计算设备，支持手势和眼动追踪，重新定义人机交互', space: 'knowledge', actions: ['阅读详情', '引用'], url: 'https://www.apple.com/apple-vision-pro' },
        { type: 'knowledge', title: 'OpenAI Sora · AI 视频生成', description: '文本到视频生成模型，可生成长达 60 秒的高质量视频，理解复杂物理世界', space: 'knowledge', actions: ['阅读详情', '引用'], url: 'https://openai.com/sora' },
        { type: 'knowledge', title: 'Google Gemini · 多模态 AI', description: 'Google 发布的最强多模态 AI 模型，支持文本、图像、音频和代码的混合理解', space: 'knowledge', actions: ['阅读详情', '引用'], url: 'https://deepmind.google/technologies/gemini' },
      ],
    };
  }

  return {
    summary: `关于「${query}」的搜索结果显示，灵枢已在您的聊天记录、文件和共享资源中找到了相关内容。如需更详细的外部知识，可以点击下方卡片查看相关信息源。`,
    results: [
      { type: 'knowledge', title: 'AI 驱动的搜索引擎', description: '灵枢智能搜索支持自然语言查询，跨聊天记录、文件、共享记录和外部知识库综合检索', space: 'knowledge', actions: ['了解更多', '引用'], url: '' },
    ],
  };
}

export function getSearchResults(query: string): SearchResponse {
  const lowerQuery = query.toLowerCase();

  const hasKnowledgeQuery =
    lowerQuery.includes('什么是') ||
    lowerQuery.includes('如何') ||
    lowerQuery.includes('怎么') ||
    lowerQuery.includes('设计系统') ||
    lowerQuery.includes('前端') ||
    lowerQuery.includes('技术趋势') ||
    lowerQuery.includes('科技') ||
    lowerQuery.includes('新闻') ||
    lowerQuery.includes('ai') ||
    lowerQuery.includes('趋势') ||
    lowerQuery.includes('协作') ||
    lowerQuery.includes('效率');

  const { summary, results: knowledgeResults } = hasKnowledgeQuery
    ? generateKnowledgeResults(query)
    : { summary: '', results: [] as SearchResult[] };

  if (query.includes('今天') || query.includes('重要')) {
    return {
      query, aiSummary: summary || undefined,
      lifeResults: [
        { type: 'ai-answer', title: '生活空间', description: '20:00 和小林确认电影时间', source: '小林', space: 'life', actions: ['打开聊天', '加入轻提醒'] },
        { type: 'ai-answer', title: '生活空间', description: '露营集合地点待确认', source: '周末露营小队', space: 'life', actions: ['打开群聊', '生成提醒话术'] },
      ],
      officeResults: [
        { type: 'ai-answer', title: '办公空间重要提醒', description: '18:00 前确认报价单', source: '设计小队群聊', space: 'office', actions: ['打开聊天', '加入轻提醒', '整理成共享记录'] },
      ],
      knowledgeResults, hiddenCount: 3,
      relatedRecords: [
        { type: 'record', title: '露营群路线讨论', description: '阿远分享了两条路线方案，路线B获选', space: 'life', actions: ['查看详情', '生成讨论记录'] },
        { type: 'record', title: '报价单确认记录', description: '李娜需要在今天18:00前确认报价单', space: 'office', actions: ['查看详情', '打开聊天'] },
      ],
    };
  }

  if (query.includes('小林')) {
    return {
      query, aiSummary: summary || undefined,
      lifeResults: [
        { type: 'contact', title: '小林', description: '最近聊到想看新上映的科幻片，喜欢科幻电影、咖啡、短途旅行', space: 'life', actions: ['打开聊天', '查看关系记忆'] },
        { type: 'chat', title: '和小林的聊天', description: '10:36 - 确认周六晚上7点看电影', space: 'life', actions: ['打开聊天'] },
      ],
      officeResults: [], knowledgeResults, hiddenCount: 0,
      relatedRecords: [
        { type: 'record', title: '露营活动分工', description: '小林负责带帐篷', space: 'life', actions: ['查看详情'] },
      ],
    };
  }

  if (query.includes('报价单')) {
    return {
      query, aiSummary: summary || undefined,
      lifeResults: [],
      officeResults: [
        { type: 'chat', title: '设计小队群聊', description: '李娜今天18:00前确认报价单', source: '办公空间', space: 'office', actions: ['打开聊天', '加入轻提醒'] },
        { type: 'record', title: '报价单.pdf', description: '共享文件，2.4MB，6月18日', space: 'office', actions: ['查看文件', '总结文件'] },
        { type: 'record', title: '报价单确认记录', description: '共享记录：已确认报价单发送，待确认最终版本', space: 'office', actions: ['查看详情', '整理成共享记录'] },
      ],
      knowledgeResults, hiddenCount: 0,
      relatedRecords: [
        { type: 'record', title: '周五同步讨论记录', description: '包含报价单确认相关讨论', space: 'office', actions: ['查看详情'] },
      ],
    };
  }

  if (hasKnowledgeQuery && knowledgeResults.length > 0) {
    return {
      query, aiSummary: summary,
      lifeResults: [],
      officeResults: [],
      knowledgeResults, hiddenCount: 0,
      relatedRecords: [],
    };
  }

  return { query, knowledgeResults: [], lifeResults: [], officeResults: [], hiddenCount: 0, relatedRecords: [] };
}
