import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Brain, Bell, MessageSquare, Shield, Zap, Smartphone, Monitor, ChevronRight, ArrowRight, Search, Users, Heart, FileText, Coffee, Calendar, Briefcase, CheckCircle, Video, Mic, Clock, Bot, Layout, Layers, Star, TrendingUp, ArrowUpRight, Palette, Globe, Smile, Target, Coffee as CoffeeIcon, Laptop, Workflow } from 'lucide-react';

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: 4 + Math.random() * 10,
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 5,
  duration: 4 + Math.random() * 6,
  type: i % 3,
}));

const stats = [
  { value: '10+', label: '功能模块', icon: Layers },
  { value: '双空间', label: '生活·办公独立', icon: Layout },
  { value: 'AI原生', label: '深度融入每个功能', icon: Brain },
  { value: '全平台', label: '桌面·移动端覆盖', icon: Globe },
];

const coreValues = [
  {
    title: '提升工作效率',
    desc: '不用在多个软件之间来回切换。聊天、整理、提醒、会议一站式完成。AI 自动识别聊天中的关键信息，帮你省掉 80% 的手动整理工作。',
    highlight: '节省 80% 整理时间',
    icon: Zap,
    color: 'from-amber-500 to-orange-500',
  },
  {
    title: '生活工作彻底分离',
    desc: '一个账号两个空间。生活聊天不会混进工作群，办公文件不会出现在朋友圈。重要事项自动跨空间提醒，真正做到生活不被工作打扰，工作不会因为生活分心。',
    highlight: '互不干扰，重要互通',
    icon: Layout,
    color: 'from-blue-500 to-indigo-500',
  },
  {
    title: '拒绝软件冗余',
    desc: '去掉了传统办公软件中复杂的项目管理、甘特图、审批流这些你可能永远用不到的功能。保持社交产品本来的轻量，打开就能用，不用复杂配置。',
    highlight: '轻量设计，开箱即用',
    icon: CheckCircle,
    color: 'from-emerald-500 to-green-500',
  },
  {
    title: 'AI 原生设计',
    desc: 'AI 不是事后外挂功能，而是从第一天开始就作为核心设计。每一步操作都有 AI 在后台默默帮你整理，让每一次聊天都更有回应。',
    highlight: '从设计之初就融入 AI',
    icon: Bot,
    color: 'from-purple-500 to-violet-500',
  },
];

const targetUsers = [
  {
    icon: Smile,
    color: 'from-blue-400 to-blue-600',
    title: '年轻用户与学生',
    desc: '需要一个清爽的社交工具，不被广告和复杂功能困扰。用灵枢和朋友自然聊天，AI 自动帮你记住每个人的喜好。',
    tag: '社交新手',
  },
  {
    icon: Users,
    color: 'from-purple-400 to-violet-600',
    title: '朋友小圈子与兴趣社群',
    desc: '群聊 + 记录 + 提醒综合管理。AI 自动提取群聊约定，再也不用为"谁带什么""几点集合"翻半天聊天记录。',
    tag: '群聊达人',
  },
  {
    icon: Briefcase,
    color: 'from-emerald-400 to-green-600',
    title: '自由职业者与小团队',
    desc: '不需要笨重的企业软件。轻量级协作工具，AI 帮你整理讨论、确认分工、生成记录，专注工作本身。',
    tag: '轻协作',
  },
];

const coreFeatures = [
  {
    icon: MessageSquare,
    color: 'from-blue-400 to-blue-600',
    title: 'AI 自动整理聊天',
    desc: '聊完天 AI 自动帮你提取关键信息：时间定好了自动提醒，分工明确了自动记录，决定做完了自动归档。再也不用边聊边记。',
    useCase: '群聊讨论完，AI 自动生成"聊天重点 + 成员分工 + 时间安排 + 待确认事项"',
  },
  {
    icon: Brain,
    color: 'from-indigo-400 to-indigo-600',
    title: 'AI 关系记忆',
    desc: '记住每个人的偏好、习惯和沟通风格。同事喜欢图文并茂，朋友喜欢直接了当，AI 帮你在合适时机用合适方式沟通。',
    useCase: '生活空间记录"小林的生日和兴趣"，办公空间记录"王磊的专业领域和沟通偏好"',
  },
  {
    icon: Search,
    color: 'from-amber-400 to-orange-500',
    title: 'AI 全局搜索',
    desc: '不用翻聊天记录、不用找文件。直接问 AI"上次讨论的报价单在哪"，聊天、文件、记录一次搜到，AI 帮你总结。',
    useCase: 'Ctrl+K 唤起，自然语言提问，结果跨空间呈现，支持一键操作',
  },
  {
    icon: Video,
    color: 'from-pink-400 to-rose-500',
    title: '音视频通话 + 会议',
    desc: '好友随时视频，群组一键开会。办公会议自带议程管理和会后整理，生活视频通话轻松自然。',
    useCase: '办公空间会议：预设议程 → AI 建议 → 会后自动生成纪要和待办',
  },
  {
    icon: FileText,
    color: 'from-purple-400 to-violet-600',
    title: '文件在线编辑',
    desc: '直接在聊天旁边打开文件编辑，修改实时保存。AI 自动关联文件相关的聊天决策，告别版本混乱。',
    useCase: '无需离开应用，在线编辑文件。AI 面板提供摘要、提取待办、生成回复',
  },
  {
    icon: Bell,
    color: 'from-emerald-400 to-green-600',
    title: '轻提醒不打扰',
    desc: '只在需要的时候提醒你。约定时间到了、同事问了还没回复、朋友生日快到了——不多不少，刚刚好。',
    useCase: '今天 / 本周 / 待确认 / 已完成分区，隐私提醒自动模糊，跨空间重要事项互通',
  },
];

const workflowSteps = [
  {
    step: '01',
    icon: Sparkles,
    title: '进入空间',
    desc: '从欢迎页进入生活或办公空间',
    color: 'from-blue-400 to-blue-600',
  },
  {
    step: '02',
    icon: Users,
    title: '自然聊天',
    desc: '在群聊中讨论活动、方案和工作',
    color: 'from-indigo-400 to-indigo-600',
  },
  {
    step: '03',
    icon: Brain,
    title: 'AI 整理',
    desc: 'AI 自动提取约定、分工和关键决策',
    color: 'from-purple-400 to-violet-600',
  },
  {
    step: '04',
    icon: Bell,
    title: '轻提醒',
    desc: '重要事项自动加入提醒，不打扰',
    color: 'from-amber-400 to-orange-500',
  },
  {
    step: '05',
    icon: Layout,
    title: '空间切换',
    desc: '一键切换到办公空间查看协作内容',
    color: 'from-emerald-400 to-green-600',
  },
  {
    step: '06',
    icon: FileText,
    title: '生成记录',
    desc: '共享记录归档，文件整理完成',
    color: 'from-pink-400 to-rose-500',
  },
];

const colorPalette = [
  { name: '主色蓝', hex: '#4F7CFF', class: 'bg-[#4F7CFF]' },
  { name: '辅助紫', hex: '#8B5CF6', class: 'bg-[#8B5CF6]' },
  { name: '重要橙', hex: '#F59E0B', class: 'bg-[#F59E0B]' },
  { name: '完成绿', hex: '#22C55E', class: 'bg-[#22C55E]' },
  { name: '背景灰', hex: '#F7F8FA', class: 'bg-[#F7F8FA]' },
  { name: '主文字', hex: '#111827', class: 'bg-[#111827]' },
];

export default function WelcomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = 'hidden';
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Animated particles background */}
      <div className="fixed inset-0 animated-gradient-bg pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              top: `${p.top}%`,
              animation: `${p.type === 0 ? 'float' : p.type === 1 ? 'floatSlow' : 'floatReverse'} ${p.duration}s ease-in-out ${p.delay}s infinite`,
              background: p.type === 0
                ? 'linear-gradient(135deg, #4F7CFF, #8B5CF6)'
                : p.type === 1
                  ? 'linear-gradient(135deg, #F59E0B, #EC4899)'
                  : 'linear-gradient(135deg, #22C55E, #4F7CFF)',
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* ===== Section 1: Hero ===== */}
        <section className="flex items-center justify-center px-6 py-20 lg:py-28">
          <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 stagger-1">
                <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                <Sparkles className="w-4 h-4 text-[#4F7CFF]" />
                <span className="text-sm text-[#4F7CFF] font-medium">AI 原生轻社交空间</span>
              </div>

              <h1 className="text-6xl lg:text-8xl font-black text-[#111827] mb-4 tracking-tight stagger-2">
                <span className="gradient-text">灵枢</span>
              </h1>

              <p className="text-2xl lg:text-3xl font-bold gradient-text mb-3 stagger-3">
                让每一次聊天，都更有回应
              </p>

              <p className="text-lg text-[#6B7280] mb-2 stagger-3">
                一个软件，搞定聊天、整理和提醒
              </p>

              <p className="text-[#9CA3AF] text-base leading-relaxed max-w-xl mb-10 stagger-4">
                告别在微信、钉钉、飞书、Notion 之间来回切换。灵枢用 AI 把聊天自动变成约定和记录，让生活和工作井井有条。
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start stagger-5">
                <button
                  onClick={() => navigate('/home')}
                  className="group relative px-8 py-4 bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white font-semibold rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-[#4F7CFF]/30 hover:-translate-y-0.5 active-scale"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    进入我的空间
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#4F7CFF] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </button>
                <button
                  onClick={() => navigate('/chat/chat1')}
                  className="group px-8 py-4 glass font-semibold rounded-2xl text-[#4F7CFF] transition-all duration-300 hover:shadow-lg hover:shadow-[#4F7CFF]/10 hover:-translate-y-0.5 active-scale"
                >
                  <span className="flex items-center gap-2">
                    体验 AI 聊天
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>

            {/* Hero right: Floating cards */}
            <div className="flex-1 w-full max-w-md hidden lg:block stagger-6">
              <div className="relative">
                <FloatingCard
                  icon={Brain} label="AI 记忆" text="小林喜欢科幻片，上次聊到《星际穿越》"
                  className="top-0 left-8" delay="0.3s"
                />
                <FloatingCard
                  icon={Bell} label="轻提醒" text="今晚 20:00 确认电影时间"
                  className="top-28 right-0" delay="0.5s"
                />
                <FloatingCard
                  icon={MessageSquare} label="群聊摘要" text="露营群有 3 条待确认事项"
                  className="top-56 left-4" delay="0.7s"
                />
                <FloatingCard
                  icon={Sparkles} label="跨空间提醒" text="办公空间有 1 条重要提醒"
                  className="top-[340px] right-8" delay="0.9s"
                />
                <div className="mt-4 pt-96 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
                    <div className="flex -space-x-2">
                      {['XL', 'XC', 'AY', 'LN'].map((initials, i) => (
                        <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-[#4F7CFF] to-[#8B5CF6] border-2 border-white flex items-center justify-center text-[10px] font-bold text-white" style={{ zIndex: 4 - i }}>
                          {initials}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs text-[#6B7280]">已有 <span className="font-semibold text-[#111827]">4</span> 位好友在线</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Section 1.5: Stats Strip ===== */}
        <section className="py-10 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="text-center p-6 bg-white rounded-2xl border border-[#E5E7EB] hover:shadow-lg hover:border-[#4F7CFF]/20 transition-all duration-300"
                  style={{ animationDelay: `${0.7 + i * 0.1}s` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F7CFF]/10 to-[#8B5CF6]/10 flex items-center justify-center mx-auto mb-3">
                    <s.icon className="w-5 h-5 text-[#4F7CFF]" />
                  </div>
                  <div className="text-2xl font-black gradient-text mb-1">{s.value}</div>
                  <div className="text-xs text-[#9CA3AF]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Section 2: Core Values ===== */}
        <section className="py-16 px-6 bg-white/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#111827] mb-4">
                为什么选择灵枢
              </h2>
              <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
                专为提升效率、分离生活工作、减少软件冗余而设计。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coreValues.map((item, i) => (
                <div
                  key={i}
                  className="relative flex gap-5 p-6 bg-white rounded-2xl border border-[#E5E7EB] hover:shadow-lg hover:border-[#4F7CFF]/15 transition-all duration-300 group"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-md transition-transform duration-300 group-hover:scale-110`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-[#111827]">{item.title}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-[#4F7CFF]/10 to-[#8B5CF6]/10 text-[#4F7CFF] font-medium">
                        {item.highlight}
                      </span>
                    </div>
                    <p className="text-sm text-[#6B7280] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Section 3: Target Users ===== */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-4">
                <Target className="w-4 h-4 text-[#4F7CFF]" />
                <span className="text-sm text-[#4F7CFF] font-medium">为谁设计</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#111827] mb-4">
                目标用户
              </h2>
              <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
                灵枢为不同场景的用户设计了恰到好处的体验。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {targetUsers.map((u, i) => (
                <div
                  key={i}
                  className="group p-6 bg-white rounded-2xl border border-[#E5E7EB] hover:shadow-xl hover:shadow-[#4F7CFF]/8 hover:-translate-y-1 transition-all duration-500"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${u.color} flex items-center justify-center mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    <u.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-[#111827]">{u.title}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F0F4FF] text-[#4F7CFF] font-medium">{u.tag}</span>
                  </div>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{u.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Section 4: Dual Space ===== */}
        <section className="py-20 px-6 bg-white/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-4">
                <Layout className="w-4 h-4 text-[#4F7CFF]" />
                <span className="text-sm text-[#4F7CFF] font-medium">核心设计</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#111827] mb-4">
                一个软件，两个世界
              </h2>
              <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
                轻点切换，生活和工作互不干扰，重要事项跨空间提醒。
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Life Space */}
              <div className="relative group p-8 bg-white rounded-2xl border border-[#E5E7EB] hover:shadow-xl hover:shadow-[#4F7CFF]/10 hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6]" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F7CFF] to-[#8B5CF6] flex items-center justify-center shadow-md">
                    <Coffee className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#4F7CFF]">生活空间</h3>
                    <p className="text-xs text-[#9CA3AF]">朋友 · 家人 · 兴趣</p>
                  </div>
                  <span className="ml-auto text-[10px] px-2 py-1 rounded-full bg-blue-50 text-[#4F7CFF] font-medium">轻松 · 温情</span>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: MessageSquare, text: '和朋友自然聊天，AI 自动记住好恶和偏好', label: '聊天' },
                    { icon: Calendar, text: '群聊里定下的聚会时间，自动变成轻提醒', label: '提醒' },
                    { icon: Heart, text: '关系记忆帮你记住重要日期和个人习惯', label: '记忆' },
                    { icon: Video, text: '一键视频通话，随时和好友面对面', label: '通话' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 group/item">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors group-hover/item:bg-blue-100">
                        <item.icon className="w-3.5 h-3.5 text-[#4F7CFF]" />
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] font-medium text-[#4F7CFF] bg-blue-50 px-1.5 py-0.5 rounded">{item.label}</span>
                        <p className="text-sm text-[#6B7280] mt-1">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Office Space */}
              <div className="relative group p-8 bg-white rounded-2xl border border-[#E5E7EB] hover:shadow-xl hover:shadow-[#8B5CF6]/10 hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] flex items-center justify-center shadow-md">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#8B5CF6]">办公空间</h3>
                    <p className="text-xs text-[#9CA3AF]">同事 · 项目 · 文件</p>
                  </div>
                  <span className="ml-auto text-[10px] px-2 py-1 rounded-full bg-purple-50 text-[#8B5CF6] font-medium">高效 · 专业</span>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: Bot, text: '群聊讨论方案，AI 自动提取关键决策和分工', label: 'AI 整理' },
                    { icon: FileText, text: '文件在线编辑，AI 关联相关聊天上下文', label: '文件' },
                    { icon: Video, text: '一键发起会议，自带议程管理和会后整理', label: '会议' },
                    { icon: Bell, text: '跨空间提醒：办公空间的重要事项，生活空间也能看到', label: '互通' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 group/item">
                      <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors group-hover/item:bg-purple-100">
                        <item.icon className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] font-medium text-[#8B5CF6] bg-purple-50 px-1.5 py-0.5 rounded">{item.label}</span>
                        <p className="text-sm text-[#6B7280] mt-1">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Section 5: Feature Highlights ===== */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-4">
                <Star className="w-4 h-4 text-[#4F7CFF]" />
                <span className="text-sm text-[#4F7CFF] font-medium">产品能力</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#111827] mb-4">
                六大核心功能
              </h2>
              <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
                覆盖生活和工作中的高频社交场景，AI 深度融入每个环节。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreFeatures.map((f, i) => (
                <div
                  key={i}
                  className="group p-6 bg-white rounded-2xl border border-[#E5E7EB] hover:shadow-xl hover:shadow-[#4F7CFF]/8 hover:-translate-y-1 transition-all duration-500"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    <f.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#111827] mb-2">{f.title}</h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed mb-3">{f.desc}</p>
                  <div className="pt-3 border-t border-[#F3F4F6]">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#4F7CFF] flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-[#9CA3AF] leading-relaxed">{f.useCase}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Section 6: Core Workflow ===== */}
        <section className="py-20 px-6 bg-white/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-4">
                <Workflow className="w-4 h-4 text-[#4F7CFF]" />
                <span className="text-sm text-[#4F7CFF] font-medium">使用流程</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#111827] mb-4">
                从聊天到整理，一气呵成
              </h2>
              <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
                AI 贯穿整个使用流程，让自然聊天自动产生价值和行动。
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {workflowSteps.map((step, i) => (
                <div key={i} className="relative group">
                  <div className="p-5 bg-white rounded-2xl border border-[#E5E7EB] hover:shadow-lg hover:border-[#4F7CFF]/15 hover:-translate-y-1 transition-all duration-300 text-center">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-3 shadow-md transition-transform duration-300 group-hover:scale-110`}>
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-xs font-black text-[#D1D5DB] mb-1">{step.step}</div>
                    <h4 className="text-sm font-bold text-[#111827] mb-1">{step.title}</h4>
                    <p className="text-[11px] text-[#9CA3AF] leading-relaxed">{step.desc}</p>
                  </div>
                  {i < workflowSteps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-2 items-center text-[#D1D5DB]">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Section 7: Device Showcase ===== */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-4">
                <Globe className="w-4 h-4 text-[#4F7CFF]" />
                <span className="text-sm text-[#4F7CFF] font-medium">跨平台</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#111827] mb-4">
                全平台覆盖
              </h2>
              <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
                桌面端和移动端无缝切换，随时随地保持连接。
              </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
              {/* Desktop Mockup */}
              <div className="w-full max-w-[600px]">
                <div className="text-center mb-4">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-[#6B7280]">
                    <Monitor className="w-4 h-4 text-[#4F7CFF]" />
                    桌面端体验
                  </span>
                </div>
                <div className="bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-[#F7F8FA] border-b border-[#E5E7EB]">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                      <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                      <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
                    </div>
                    <div className="flex-1 mx-4 bg-white rounded-lg py-1 px-3 text-xs text-[#9CA3AF] text-center">
                      灵枢 · 让每一次聊天，都更有回应
                    </div>
                  </div>
                  <div className="flex h-[300px]">
                    <div className="w-[180px] bg-[#F7F8FA] border-r border-[#E5E7EB] p-3">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#4F7CFF] to-[#8B5CF6]" />
                        <span className="text-xs font-bold text-[#111827]">灵枢</span>
                      </div>
                      <div className="flex bg-gray-100 rounded-full p-0.5 mb-3">
                        <div className="flex-1 text-center text-[10px] py-1 rounded-full bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white font-medium">生活</div>
                        <div className="flex-1 text-center text-[10px] py-1 text-[#6B7280]">办公</div>
                      </div>
                      <div className="space-y-1">
                        {['动态', '聊天', '好友', '群组', '轻提醒'].map((n, i) => (
                          <div key={i} className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] ${i === 0 ? 'bg-[#F0F4FF] text-[#4F7CFF] font-medium' : 'text-[#6B7280]'}`}>
                            <div className="w-1.5 h-1.5 rounded-full bg-current" />
                            {n}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 p-4">
                      <div className="bg-white rounded-xl p-3 mb-2 shadow-sm border border-[#E5E7EB]">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4F7CFF] to-[#8B5CF6] flex items-center justify-center text-[8px] text-white font-bold">XC</div>
                          <span className="text-[11px] font-bold">小陈</span>
                          <span className="text-[9px] text-[#9CA3AF]">10分钟前</span>
                        </div>
                        <p className="text-[11px] text-[#6B7280]">周末去了趟川西，风景太美了！分享几张照片给大家～</p>
                        <div className="flex gap-1 mt-2">
                          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-200 to-blue-300" />
                          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-green-200 to-green-300" />
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-[9px] text-[#9CA3AF]">
                          <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> 12</span>
                          <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> 2</span>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-3 shadow-sm border border-[#E5E7EB]">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#EC4899] flex items-center justify-center text-[8px] text-white font-bold">AY</div>
                          <span className="text-[11px] font-bold">阿远</span>
                          <span className="text-[9px] text-[#9CA3AF]">30分钟前</span>
                        </div>
                        <p className="text-[11px] text-[#6B7280]">发现了一家超棒的咖啡店，手冲绝了！</p>
                        <div className="flex items-center gap-3 mt-2 text-[9px] text-[#9CA3AF]">
                          <span className="flex items-center gap-1"><Heart className="w-3 h-3 fill-[#EF4444] text-[#EF4444]" /> 8</span>
                          <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> 1</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Mockup */}
              <div className="w-full max-w-[260px]">
                <div className="text-center mb-4">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-[#6B7280]">
                    <Smartphone className="w-4 h-4 text-[#22C55E]" />
                    移动端体验
                  </span>
                </div>
                <div className="bg-black rounded-[2.5rem] p-3 shadow-2xl">
                  <div className="bg-white rounded-[2rem] overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-2 bg-[#F7F8FA]">
                      <span className="text-[9px] font-medium text-[#111827]">9:41</span>
                      <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-full border-2 border-[#111827]" />
                      </div>
                    </div>
                    <div className="px-4 py-2 border-b border-[#E5E7EB] flex items-center justify-between">
                      <span className="text-sm font-bold text-[#111827]">动态</span>
                      <div className="w-6 h-6 rounded-full bg-[#F3F4F6]" />
                    </div>
                    <div className="px-4 py-2">
                      <div className="flex items-center gap-2 px-3 py-2 bg-[#F7F8FA] rounded-xl">
                        <Search className="w-3.5 h-3.5 text-[#9CA3AF]" />
                        <span className="text-[10px] text-[#9CA3AF]">问 AI 或搜索...</span>
                      </div>
                    </div>
                    <div className="px-4 py-2 space-y-3">
                      <div className="flex gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#4F7CFF] to-[#8B5CF6] flex items-center justify-center text-[8px] text-white font-bold flex-shrink-0">XC</div>
                        <div className="flex-1">
                          <p className="text-[10px] font-bold text-[#111827]">小陈</p>
                          <p className="text-[9px] text-[#6B7280] mt-0.5">周末去了趟川西，风景太美了！</p>
                          <div className="flex gap-1 mt-1.5">
                            <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-blue-200 to-blue-300" />
                          </div>
                          <div className="flex items-center gap-3 mt-1.5 text-[9px] text-[#9CA3AF]">
                            <span>❤ 12</span>
                            <span>💬 2</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#EC4899] flex items-center justify-center text-[8px] text-white font-bold flex-shrink-0">AY</div>
                        <div className="flex-1">
                          <p className="text-[10px] font-bold text-[#111827]">阿远</p>
                          <p className="text-[9px] text-[#6B7280] mt-0.5">发现了一家超棒的咖啡店！</p>
                          <div className="flex items-center gap-3 mt-1.5 text-[9px] text-[#9CA3AF]">
                            <span>❤ 8</span>
                            <span>💬 1</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-around py-2 border-t border-[#E5E7EB]">
                      {['动态', '聊天', '好友', '我的'].map((n, i) => (
                        <div key={i} className="flex flex-col items-center gap-0.5">
                          <div className={`w-5 h-5 rounded-md ${i === 0 ? 'bg-[#4F7CFF]' : 'bg-[#D1D5DB]'}`} />
                          <span className={`text-[8px] ${i === 0 ? 'text-[#4F7CFF] font-medium' : 'text-[#9CA3AF]'}`}>{n}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Section 8: Design Language ===== */}
        <section className="py-20 px-6 bg-white/20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-4">
                <Palette className="w-4 h-4 text-[#4F7CFF]" />
                <span className="text-sm text-[#4F7CFF] font-medium">设计语言</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#111827] mb-4">
                轻社交 · AI 陪伴 · 高级感
              </h2>
              <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
                年轻化、低压力、温和干净的设计风格，让每一次使用都舒心。
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Color Palette */}
              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
                <h3 className="text-sm font-bold text-[#111827] mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#4F7CFF] to-[#8B5CF6]" />
                  品牌色彩系统
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {colorPalette.map((c, i) => (
                    <div key={i} className="text-center">
                      <div className={`w-full h-14 rounded-xl ${c.class} mb-2 shadow-sm ${c.hex === '#F7F8FA' ? 'border border-[#E5E7EB]' : ''}`} />
                      <div className="text-[10px] font-medium text-[#6B7280]">{c.name}</div>
                      <div className="text-[10px] text-[#9CA3AF] font-mono">{c.hex}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Design Principles */}
              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
                <h3 className="text-sm font-bold text-[#111827] mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA]" />
                  设计原则
                </h3>
                <div className="space-y-3">
                  {[
                    { label: '卡片式布局', desc: '大量留白、圆角卡片、轻微阴影', icon: Layout },
                    { label: '蓝紫渐变', desc: '主色 #4F7CFF 辅助 #8B5CF6 作为品牌识别', icon: Palette },
                    { label: '线性图标', desc: '使用 lucide-react 柔和线性风格图标', icon: Star },
                    { label: '微动效', desc: 'hover 上浮、渐变过渡、粒子背景动画', icon: Sparkles },
                  ].map((p, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4F7CFF]/10 to-[#8B5CF6]/10 flex items-center justify-center flex-shrink-0">
                        <p.icon className="w-4 h-4 text-[#4F7CFF]" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#111827]">{p.label}</div>
                        <div className="text-xs text-[#9CA3AF]">{p.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Section 9: Bottom CTA ===== */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="p-12 bg-white rounded-3xl border border-[#E5E7EB] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4F7CFF] via-[#8B5CF6] to-[#A78BFA]" />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4F7CFF] to-[#8B5CF6] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#4F7CFF]/30">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#111827] mb-3">
                准备好开始了吗？
              </h2>
              <p className="text-[#6B7280] text-lg mb-4">
                让每一次聊天，都更有回应
              </p>
              <p className="text-[#9CA3AF] text-sm mb-8 max-w-lg mx-auto">
                体验灵枢，让 AI 帮你在自然聊天中整理关系、记住约定、区分空间、提醒重要事务。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/home')}
                  className="px-10 py-4 bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white font-semibold rounded-2xl hover:shadow-2xl hover:shadow-[#4F7CFF]/30 hover:-translate-y-0.5 transition-all duration-300 active-scale"
                >
                  进入我的空间
                </button>
                <button
                  onClick={() => navigate('/chat/chat1')}
                  className="px-10 py-4 glass font-semibold rounded-2xl text-[#4F7CFF] hover:shadow-lg transition-all duration-300 active-scale"
                >
                  体验 AI 聊天
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 text-center">
          <div className="max-w-6xl mx-auto px-6">
            <div className="border-t border-[#E5E7EB] pt-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#4F7CFF] to-[#8B5CF6]" />
                <span className="text-sm font-bold gradient-text">灵枢</span>
              </div>
              <p className="text-xs text-[#9CA3AF]">
                AI 原生轻社交空间 · 让每一次聊天，都更有回应
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Bottom gradient fade */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F7F8FA]/80 to-transparent pointer-events-none" />
    </div>
  );
}

function FloatingCard({ icon: Icon, label, text, className, delay }: {
  icon: typeof Brain;
  label: string;
  text: string;
  className: string;
  delay: string;
}) {
  return (
    <div
      className={`absolute glass-card p-4 rounded-2xl w-56 stagger-1 ${className}`}
      style={{ animationDelay: delay }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4F7CFF] to-[#8B5CF6] flex items-center justify-center">
          <Icon className="w-4 h-4 text-white" />
        </div>
        <span className="text-xs font-bold text-[#111827]">{label}</span>
      </div>
      <p className="text-xs text-[#6B7280] leading-relaxed">{text}</p>
    </div>
  );
}
