import { useState, useEffect } from 'react';
import {
  Phone, PhoneOff, Mic, MicOff, Video, VideoOff, Users, MonitorUp, Maximize2,
  MoreHorizontal, X, MessageSquare, Clock, ClipboardList, Sparkles, UserPlus,
} from 'lucide-react';

export interface CallParticipant {
  id: string;
  name: string;
  avatar: string;
  isSpeaking?: boolean;
  isMuted?: boolean;
  videoOff?: boolean;
}

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  callerName: string;
  callerAvatar: string;
  participants: CallParticipant[];
  isOffice?: boolean;
  meetingTitle?: string;
}

export default function VideoCallModal({
  isOpen,
  onClose,
  callerName,
  callerAvatar,
  participants: initialParticipants,
  isOffice = false,
  meetingTitle,
}: VideoCallModalProps) {
  const [participants, setParticipants] = useState(initialParticipants);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [duration, setDuration] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [showAgenda, setShowAgenda] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [status, setStatus] = useState<'connecting' | 'connected' | 'ended'>('connecting');

  useEffect(() => {
    setParticipants(initialParticipants);
  }, [initialParticipants]);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => setStatus('connected'), 1500);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (status !== 'connected') return;
    const interval = setInterval(() => setDuration((d) => d + 1), 1000);
    return () => clearInterval(interval);
  }, [status]);

  if (!isOpen) return null;

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setStatus('ended');
    setTimeout(onClose, 600);
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    setMessages([...messages, { sender: 'me', text: chatInput.trim() }]);
    setChatInput('');
  };

  const meetingAgenda = [
    { time: '10:00', item: '上周工作回顾', done: true },
    { time: '10:10', item: '报价单方案确认', done: false },
    { time: '10:25', item: '首页改版进展同步', done: false },
    { time: '10:40', item: '下周计划安排', done: false },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="relative w-full h-full flex">
        {/* Main video area */}
        <div className="flex-1 flex flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-4">
              {isOffice && meetingTitle && (
                <div className="flex items-center gap-2">
                  <span className="text-white/80 text-sm font-medium">{meetingTitle}</span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                </div>
              )}
              <div className="flex items-center gap-2 text-white/60">
                <Clock className="w-4 h-4" />
                <span className="text-sm tabular-nums">{formatDuration(duration)}</span>
              </div>
              {status === 'connecting' && (
                <span className="text-sm text-amber-400 animate-pulse">连接中...</span>
              )}
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Video grid */}
          <div className={`flex-1 p-4 grid gap-3 ${
            participants.length <= 2 ? 'grid-cols-2' :
            participants.length <= 4 ? 'grid-cols-2' : 'grid-cols-3'
          }`}>
            {/* Main caller (you) */}
            <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900 ${
              participants.length === 1 ? 'col-span-2 row-span-2' : ''
            }`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4F7CFF] to-[#8B5CF6] flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {callerAvatar}
                </div>
              </div>
              {/* Simulated video bg */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#4F7CFF]/20 via-transparent to-[#8B5CF6]/10" />
              {isVideoOff && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80">
                  <VideoOff className="w-10 h-10 text-white/40" />
                </div>
              )}
              <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-medium">
                {isOffice ? '你 (主持人)' : '你'}
              </div>
              {isMuted && (
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500/80 flex items-center justify-center">
                  <MicOff className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Other participants */}
            {participants.map((p) => (
              <div
                key={p.id}
                className={`relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900 ${
                  p.isSpeaking ? 'ring-2 ring-[#22C55E] ring-offset-2 ring-offset-black' : ''
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#8B5CF6]/80 to-[#EC4899]/80 flex items-center justify-center text-white text-lg font-bold">
                    {p.avatar}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-pink-500/10" />
                {p.videoOff && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80">
                    <VideoOff className="w-8 h-8 text-white/40" />
                  </div>
                )}
                <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-medium">
                  {p.name}
                  {p.isMuted && <MicOff className="w-3 h-3 inline ml-1 text-red-400" />}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom controls */}
          <div className="flex items-center justify-center gap-4 py-5 px-6">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                isMuted ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                isVideoOff ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </button>
            <button
              onClick={handleEndCall}
              className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all duration-200 hover:scale-105"
            >
              <PhoneOff className="w-6 h-6" />
            </button>
            <button
              onClick={() => setShowChat(!showChat)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                showChat ? 'bg-white/20 text-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
            </button>
            {isOffice && (
              <button
                onClick={() => setShowAgenda(!showAgenda)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                  showAgenda ? 'bg-white/20 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <ClipboardList className="w-5 h-5" />
              </button>
            )}
            <button className="w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-all duration-200">
              <UserPlus className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-all duration-200">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Side panel: Chat or Agenda */}
        {(showChat || showAgenda) && (
          <div className="w-[320px] bg-gray-900/95 border-l border-white/10 flex flex-col">
            {showChat && (
              <>
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                  <h3 className="text-sm font-bold text-white">会议聊天</h3>
                  <button onClick={() => setShowChat(false)} className="text-white/50 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.length === 0 ? (
                    <p className="text-sm text-white/30 text-center mt-20">暂无消息</p>
                  ) : (
                    messages.map((m, i) => (
                      <div key={i} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                          m.sender === 'me'
                            ? 'bg-[#4F7CFF] text-white rounded-br-md'
                            : 'bg-white/10 text-white rounded-bl-md'
                        }`}>
                          {m.sender !== 'me' && <p className="text-xs text-[#4F7CFF] mb-0.5">{m.sender}</p>}
                          {m.text}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-3 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleSendChat(); }}
                      placeholder="输入消息..."
                      className="flex-1 bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-[#4F7CFF]/50"
                    />
                    <button
                      onClick={handleSendChat}
                      className="p-2 rounded-xl bg-[#4F7CFF] text-white hover:bg-[#4F7CFF]/80 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}

            {showAgenda && isOffice && (
              <>
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                  <h3 className="text-sm font-bold text-white">会议议程</h3>
                  <button onClick={() => setShowAgenda(false)} className="text-white/50 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-3">
                    {meetingAgenda.map((a, i) => (
                      <div key={i} className={`p-3 rounded-xl ${a.done ? 'bg-white/5' : 'bg-white/10 border border-white/10'}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-2 h-2 rounded-full ${a.done ? 'bg-[#22C55E]' : 'bg-[#F59E0B]'}`} />
                          <span className="text-xs text-white/50">{a.time}</span>
                        </div>
                        <p className={`text-sm ${a.done ? 'text-white/40 line-through' : 'text-white'}`}>
                          {a.item}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#4F7CFF]/10 to-[#8B5CF6]/10 border border-[#4F7CFF]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-[#4F7CFF]" />
                      <span className="text-xs font-semibold text-[#4F7CFF]">AI 会议建议</span>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">
                      当前议程还剩 2 项未完成，建议将下周计划调整为异步讨论，聚焦报价单确认和首页进展。
                    </p>
                  </div>

                  <button className="w-full mt-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] rounded-xl hover:shadow-lg transition-all">
                    添加到轻提醒
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}