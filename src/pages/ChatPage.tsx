import { useParams, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useSpaceStore } from '@/stores/spaceStore';
import { mockChats, mockPrivateMessages, mockGroupMessages, ChatMessage } from '@/data/mockChats';
import { Send, Sparkles, FileText, Bell, PenLine, MessageSquareText, Brain, Smile, Paperclip, Mic, Search, Users, Phone, Video } from 'lucide-react';
import VideoCallModal, { CallParticipant } from '@/components/VideoCallModal';

export default function ChatPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentSpace } = useSpaceStore();

  const spaceChats = mockChats.filter((c) => c.space === currentSpace);
  const chat = mockChats.find((c) => c.id === id);
  const isGroup = chat?.type === 'group';
  const messages: ChatMessage[] = isGroup
    ? mockGroupMessages[id || ''] || []
    : mockPrivateMessages[id || ''] || [];

  const [inputValue, setInputValue] = useState('');
  const [showAITip, setShowAITip] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(true);
  const [showChatList, setShowChatList] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Video call state
  const [videoCallOpen, setVideoCallOpen] = useState(false);
  const [callParticipants, setCallParticipants] = useState<CallParticipant[]>([]);
  const [callName, setCallName] = useState('');
  const [callAvatar, setCallAvatar] = useState('');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, id]);

  // Auto-select first chat if none selected
  useEffect(() => {
    if (!id && spaceChats.length > 0) {
      navigate(`/chat/${spaceChats[0].id}`, { replace: true });
    }
  }, [id, currentSpace]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setInputValue('');
    setShowAITip(false);
  };

  const aiFunctions = [
    { icon: MessageSquareText, label: '帮你回复', color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: FileText, label: '总结聊天', color: 'text-purple-500', bg: 'bg-purple-50' },
    { icon: Brain, label: '记住偏好', color: 'text-amber-500', bg: 'bg-amber-50' },
    { icon: Bell, label: '生成约定提醒', color: 'text-green-500', bg: 'bg-green-50' },
    { icon: PenLine, label: '正式表达', color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { icon: Sparkles, label: '生成确认消息', color: 'text-pink-500', bg: 'bg-pink-50' },
  ];

  const groupSummary = {
    key: '大家正在确认周六露营安排。',
    members: [
      { name: '小林', task: '带帐篷' },
      { name: '阿远', task: '买饮料' },
      { name: '你', task: '确认路线' },
    ],
    time: '周六露营',
    pending: ['集合时间', '集合地点', '是否需要餐垫'],
  };

  return (
    <div className="flex h-full">
      {/* Chat List Sidebar */}
      <div className={`${showChatList ? 'w-[280px]' : 'w-0'} border-r border-[#E5E7EB] bg-white flex-shrink-0 overflow-hidden transition-all duration-300`}>
        <div className="w-[280px] h-full flex flex-col">
          <div className="p-4 border-b border-[#E5E7EB]">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-[#111827]">
                {currentSpace === 'life' ? '聊天' : '办公聊天'}
              </h2>
              <div className="flex items-center gap-1">
                <button className="p-2 rounded-lg hover:bg-[#F3F4F6] text-[#6B7280] transition-colors">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {spaceChats.map((c) => (
              <button
                key={c.id}
                onClick={() => navigate(`/chat/${c.id}`)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 ${
                  id === c.id
                    ? 'bg-gradient-to-r from-[#F0F4FF] to-[#F5F0FF] border-l-[3px] border-l-[#4F7CFF]'
                    : 'hover:bg-[#F7F8FA] border-l-[3px] border-l-transparent'
                }`}
              >
                <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${
                  c.type === 'group'
                    ? 'bg-gradient-to-br from-[#4F7CFF]/15 to-[#8B5CF6]/15'
                    : 'bg-gradient-to-br from-[#4F7CFF] to-[#8B5CF6]'
                }`}>
                  {c.type === 'group' ? (
                    <Users className="w-5 h-5 text-[#4F7CFF]" />
                  ) : (
                    <span className="text-white font-bold text-sm">{c.name.charAt(0)}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm truncate ${id === c.id ? 'font-bold text-[#111827]' : 'font-medium text-[#111827]'}`}>
                      {c.name}
                    </p>
                    <span className="text-[10px] text-[#9CA3AF] flex-shrink-0 ml-2">{c.lastTime}</span>
                  </div>
                  <p className="text-xs text-[#9CA3AF] truncate mt-0.5">{c.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      {chat ? (
        <div className="flex-1 flex flex-col min-w-0 bg-[#F7F8FA]">
          {/* Chat Header */}
          <div className="px-5 py-3 bg-white/80 backdrop-blur-sm border-b border-[#E5E7EB] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowChatList(!showChatList)}
                className="p-1.5 rounded-lg hover:bg-[#F3F4F6] text-[#6B7280] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4F7CFF] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-sm">
                {chat.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#111827]">
                  {chat.name}
                  {isGroup && <span className="text-xs font-normal text-[#9CA3AF] ml-1.5">群聊</span>}
                </h2>
                <p className="text-[11px] text-[#9CA3AF]">
                  {isGroup ? `${groupSummary.members.length + 1} 位成员` : '在线'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  setCallParticipants(chat.type === 'group'
                    ? chat.name.split('').map((c, i) => ({ id: `m${i}`, name: `成员${i+1}`, avatar: c }))
                    : [{ id: chat.name, name: chat.name, avatar: chat.name.charAt(0) }]);
                  setCallName(chat.name);
                  setCallAvatar(chat.name.charAt(0));
                  setVideoCallOpen(true);
                }}
                className="p-2 rounded-xl bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E0FCE8] hover:text-[#22C55E] transition-all"
                title="语音通话"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setCallParticipants(chat.type === 'group'
                    ? chat.name.split('').map((c, i) => ({ id: `m${i}`, name: `成员${i+1}`, avatar: c }))
                    : [{ id: chat.name, name: chat.name, avatar: chat.name.charAt(0) }]);
                  setCallName(chat.name);
                  setCallAvatar(chat.name.charAt(0));
                  setVideoCallOpen(true);
                }}
                className="p-2 rounded-xl bg-[#F3F4F6] text-[#6B7280] hover:bg-[#FEF3C7] hover:text-[#D97706] transition-all"
                title="视频通话"
              >
                <Video className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowAIAssistant(!showAIAssistant)}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  showAIAssistant
                    ? 'bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white shadow-md'
                    : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
                }`}
              >
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[#E5E7EB]" />
              <span className="text-xs text-[#9CA3AF] bg-[#F7F8FA] px-3">今天</span>
              <div className="flex-1 h-px bg-[#E5E7EB]" />
            </div>

            {messages.map((msg) => {
              const isMe = msg.senderId === 'me';
              const isAI = msg.isAI;
              return (
                <div
                  key={msg.id}
                  className={`flex ${isMe ? 'justify-end' : 'justify-start'} ${isAI ? 'justify-center' : ''}`}
                >
                  {isAI ? (
                    <div className="max-w-[75%] px-5 py-3 bg-gradient-to-r from-[#F0F4FF] to-[#F5F0FF] rounded-2xl border border-[#4F7CFF]/10 shadow-sm msg-in-left">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#4F7CFF]" />
                        <span className="text-xs font-semibold text-[#4F7CFF]">{msg.senderName}</span>
                      </div>
                      <p className="text-sm text-[#6B7280] leading-relaxed">{msg.content}</p>
                    </div>
                  ) : (
                    <div className={`max-w-[65%] ${isGroup && !isMe ? 'flex gap-2' : ''}`}>
                      {isGroup && !isMe && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4F7CFF]/15 to-[#8B5CF6]/15 flex items-center justify-center text-[#4F7CFF] font-bold text-xs flex-shrink-0 mt-1">
                          {msg.senderName.charAt(0)}
                        </div>
                      )}
                      <div className={isMe ? 'msg-in-right' : 'msg-in-left'}>
                        {isGroup && !isMe && (
                          <p className="text-[11px] text-[#9CA3AF] mb-1 ml-1 font-medium">{msg.senderName}</p>
                        )}
                        <div
                          className={`px-4 py-2.5 rounded-2xl ${
                            isMe
                              ? 'bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white rounded-br-md shadow-md shadow-[#4F7CFF]/15'
                              : 'bg-white text-[#111827] rounded-bl-md border border-[#E5E7EB] shadow-sm'
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{msg.content}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-[#E5E7EB]">
            {showAITip && (
              <div className="mb-3 p-4 bg-gradient-to-r from-[#F0F4FF] to-[#F5F0FF] rounded-2xl border border-[#4F7CFF]/10 shadow-sm msg-in-left">
                <div className="flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#4F7CFF]" />
                  <span className="text-xs font-semibold text-[#4F7CFF]">AI 回复建议</span>
                </div>
                <p className="text-sm text-[#6B7280] leading-relaxed mb-3">
                  我记得小林之前也喜欢《星际穿越》类型的电影，可以问问她对这部新片的期待。
                </p>
                <div className="flex gap-1.5 flex-wrap">
                  {['自然一点', '正式一点', '委婉一点', '轻松一点'].map((tone) => (
                    <button key={tone} className="text-xs px-3 py-1.5 rounded-full bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#4F7CFF] hover:text-[#4F7CFF] hover:bg-[#F0F4FF] transition-all duration-200">
                      {tone}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-end gap-2">
              <button
                onClick={() => setShowAITip(!showAITip)}
                className={`p-2.5 rounded-xl transition-all duration-300 ${
                  showAITip ? 'bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white shadow-md' : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
                }`}
              >
                <Sparkles className="w-5 h-5" />
              </button>
              <div className="flex-1 flex items-end gap-2 bg-[#F7F8FA] rounded-2xl px-4 py-2.5 ring-1 ring-[#E5E7EB] focus-within:ring-2 focus-within:ring-[#4F7CFF]/20 focus-within:bg-white transition-all duration-200">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="输入消息..."
                  rows={1}
                  className="flex-1 bg-transparent border-none outline-none text-sm text-[#111827] placeholder-[#9CA3AF] resize-none py-0.5"
                  style={{ maxHeight: '120px' }}
                />
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#6B7280] hover:bg-[#E5E7EB]/50 transition-colors">
                    <Smile className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#6B7280] hover:bg-[#E5E7EB]/50 transition-colors">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#6B7280] hover:bg-[#E5E7EB]/50 transition-colors">
                    <Mic className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="p-2.5 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-[#4F7CFF]/20 active-scale"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-[#F7F8FA]">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4F7CFF]/10 to-[#8B5CF6]/10 flex items-center justify-center mx-auto mb-4">
              <MessageSquareText className="w-8 h-8 text-[#4F7CFF]/30" />
            </div>
            <p className="text-sm text-[#9CA3AF]">选择一个聊天开始</p>
          </div>
        </div>
      )}

      {/* AI Assistant Sidebar */}
      {chat && showAIAssistant && (
        <aside className="hidden lg:block w-[300px] border-l border-[#E5E7EB] bg-white overflow-y-auto flex-shrink-0">
          {isGroup ? (
            <div className="p-5">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#4F7CFF] to-[#8B5CF6] flex items-center justify-center shadow-md">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-bold text-[#111827]">AI 已帮你整理</h3>
              </div>

              <div className="space-y-5">
                <div className="p-4 bg-[#F7F8FA] rounded-2xl">
                  <h4 className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">聊天重点</h4>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{groupSummary.key}</p>
                </div>

                <div className="p-4 bg-[#F7F8FA] rounded-2xl">
                  <h4 className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">成员分工</h4>
                  <div className="space-y-2.5">
                    {groupSummary.members.map((m, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#4F7CFF]/20 to-[#8B5CF6]/20 flex items-center justify-center text-[#4F7CFF] font-bold text-[11px]">
                          {m.name.charAt(0)}
                        </div>
                        <div className="flex-1 flex items-center justify-between">
                          <span className="text-sm font-medium text-[#111827]">{m.name}</span>
                          <span className="text-xs text-[#6B7280]">{m.task}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-[#F7F8FA] rounded-2xl">
                  <h4 className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">时间安排</h4>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4F7CFF]" />
                    <span className="text-[#6B7280]">{groupSummary.time}</span>
                  </div>
                </div>

                <div className="p-4 bg-[#F7F8FA] rounded-2xl">
                  <h4 className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">待确认</h4>
                  <div className="space-y-2">
                    {groupSummary.pending.map((p, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-[#6B7280]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                        {p}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#E5E7EB]">
                  <button className="w-full py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] rounded-2xl hover:shadow-lg hover:shadow-[#4F7CFF]/20 transition-all duration-300 active-scale">
                    加入轻提醒
                  </button>
                  <button className="w-full py-3 text-sm font-medium text-[#4F7CFF] bg-[#F0F4FF] rounded-2xl hover:bg-[#E0E8FF] transition-all duration-200 active-scale">
                    生成讨论记录
                  </button>
                  <button className="w-full py-3 text-sm font-medium text-[#6B7280] bg-[#F3F4F6] rounded-2xl hover:bg-[#E5E7EB] transition-all duration-200 active-scale">
                    发到群里确认
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-5">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#4F7CFF] to-[#8B5CF6] flex items-center justify-center shadow-md">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-bold text-[#111827]">AI 小助手</h3>
              </div>
              <div className="space-y-1">
                {aiFunctions.map((fn, i) => (
                  <button
                    key={i}
                    onClick={() => setShowAITip(true)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-[#F7F8FA] transition-all duration-200 group"
                  >
                    <div className={`w-9 h-9 rounded-xl ${fn.bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      <fn.icon className={`w-4.5 h-4.5 ${fn.color}`} />
                    </div>
                    <span className="text-sm font-medium text-[#111827]">{fn.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-5 p-4 bg-gradient-to-br from-[#F0F4FF] to-[#F5F0FF] rounded-2xl border border-[#4F7CFF]/10">
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  AI 会根据聊天内容自动学习你的沟通偏好和重要信息，帮你更好地维护关系。
                </p>
              </div>
            </div>
          )}
        </aside>
      )}

      {/* Video Call Modal */}
      <VideoCallModal
        isOpen={videoCallOpen}
        onClose={() => setVideoCallOpen(false)}
        callerName={callName}
        callerAvatar={callAvatar}
        participants={callParticipants}
        isOffice={currentSpace === 'office'}
        meetingTitle={currentSpace === 'office' && chat ? `${chat.name} 周度同步会议` : undefined}
      />
    </div>
  );
}