import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpaceStore } from '@/stores/spaceStore';
import { mockFriends, mockGroups } from '@/data/mockRelations';
import { mockChats } from '@/data/mockChats';
import type { FriendMemory, GroupMemory } from '@/data/mockRelations';
import VideoCallModal, { CallParticipant } from '@/components/VideoCallModal';
import { Heart, MessageCircle, Calendar, Users, Lightbulb, Star, Coffee, Sparkles, Briefcase, Code, Palette, Clock, Phone, Video } from 'lucide-react';

export default function RelationsPage() {
  const { currentSpace } = useSpaceStore();
  const navigate = useNavigate();
  const spaceFriends = mockFriends.filter((f) => f.space === currentSpace);
  const spaceGroups = mockGroups.filter((g) => g.space === currentSpace);

  const [selectedFriend, setSelectedFriend] = useState<FriendMemory>(spaceFriends[0]);
  const [selectedGroup, setSelectedGroup] = useState<GroupMemory | null>(spaceGroups[0] || null);

  // Video call state
  const [videoCallOpen, setVideoCallOpen] = useState(false);
  const [callParticipants, setCallParticipants] = useState<CallParticipant[]>([]);
  const [callName, setCallName] = useState('');
  const [callAvatar, setCallAvatar] = useState('');
  const [callIsOffice, setCallIsOffice] = useState(false);

  useEffect(() => {
    setSelectedFriend(spaceFriends[0]);
    setSelectedGroup(spaceGroups[0] || null);
  }, [currentSpace]);

  const isOffice = currentSpace === 'office';

  const findChatId = (friendId: string) => {
    const chat = mockChats.find((c) => c.name === mockFriends.find((f) => f.id === friendId)?.name && c.type === 'private');
    return chat?.id;
  };

  const findGroupChatId = (groupName: string) => {
    const chat = mockChats.find((c) => c.name === groupName && c.type === 'group');
    return chat?.id;
  };

  const handleChat = (friend: FriendMemory) => {
    const chatId = findChatId(friend.id);
    if (chatId) navigate(`/chat/${chatId}`);
  };

  const handleGroupChat = (group: GroupMemory) => {
    const chatId = findGroupChatId(group.name);
    if (chatId) navigate(`/chat/${chatId}`);
  };

  const handleVoiceCall = (friend: FriendMemory) => {
    setCallParticipants([{ id: friend.id, name: friend.name, avatar: friend.avatar }]);
    setCallName(friend.name);
    setCallAvatar(friend.avatar);
    setCallIsOffice(isOffice);
    setVideoCallOpen(true);
  };

  const handleVideoCall = (friend: FriendMemory) => {
    setCallParticipants([{ id: friend.id, name: friend.name, avatar: friend.avatar }]);
    setCallName(friend.name);
    setCallAvatar(friend.avatar);
    setCallIsOffice(isOffice);
    setVideoCallOpen(true);
  };

  const handleGroupVideoCall = (group: GroupMemory) => {
    const parts: CallParticipant[] = group.members
      .filter((m) => m !== '你')
      .map((m, i) => ({
        id: `member-${i}`,
        name: m,
        avatar: m.charAt(0),
      }));
    setCallParticipants(parts);
    setCallName(group.name);
    setCallAvatar('G');
    setCallIsOffice(isOffice);
    setVideoCallOpen(true);
  };

  return (
    <div className="flex h-full page-enter">
      {/* Left: contact list */}
      <div className="w-[220px] border-r border-[#E5E7EB] bg-white p-4 flex-shrink-0 overflow-y-auto">
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-1.5 h-1.5 rounded-full ${isOffice ? 'bg-[#8B5CF6]' : 'bg-[#4F7CFF]'}`} />
          <h3 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
            {isOffice ? '同事' : '好友'}
          </h3>
          <span className="text-[10px] text-[#9CA3AF] ml-auto">{spaceFriends.length}</span>
        </div>
        <div className="space-y-1 mb-6">
          {spaceFriends.map((friend) => (
            <button
              key={friend.id}
              onClick={() => setSelectedFriend(friend)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                selectedFriend?.id === friend.id
                  ? 'bg-gradient-to-r from-[#F0F4FF] to-[#F5F0FF] text-[#4F7CFF] font-medium shadow-sm'
                  : 'text-[#6B7280] hover:bg-[#F7F8FA] hover:text-[#111827]'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4F7CFF]/20 to-[#8B5CF6]/20 flex items-center justify-center text-[#4F7CFF] font-bold text-xs flex-shrink-0">
                {friend.avatar}
              </div>
              <div className="text-left min-w-0">
                <span className="block truncate">{friend.name}</span>
                {isOffice && friend.role && (
                  <span className="text-[10px] text-[#9CA3AF] block truncate">{friend.role}</span>
                )}
              </div>
            </button>
          ))}
        </div>

        <h3 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">群组</h3>
        <div className="space-y-1">
          {spaceGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => setSelectedGroup(group)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                selectedGroup?.id === group.id
                  ? 'bg-gradient-to-r from-[#F0F4FF] to-[#F5F0FF] text-[#4F7CFF] font-medium shadow-sm'
                  : 'text-[#6B7280] hover:bg-[#F7F8FA] hover:text-[#111827]'
              }`}
            >
              <Users className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{group.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right: detail */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#111827]">关系记忆</h2>
          <p className="text-sm text-[#9CA3AF] mt-0.5">
            {isOffice ? 'AI 帮你记住同事的协作习惯和工作偏好' : 'AI 帮你记住重要的人和关系'}
          </p>
        </div>

        {/* Friend detail card */}
        {selectedFriend && (
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 mb-6 hover-lift">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-xl shadow-md ${
                isOffice ? 'from-[#8B5CF6] to-[#A78BFA]' : 'from-[#4F7CFF] to-[#8B5CF6]'
              }`}>
                {selectedFriend.avatar}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#111827]">{selectedFriend.name}</h3>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-[#9CA3AF]">
                    {isOffice ? selectedFriend.role || '同事' : '好友'}
                  </p>
                  {isOffice && selectedFriend.workStyle && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#F3F4F6] text-[#6B7280]">
                      {selectedFriend.workStyle[0]}
                    </span>
                  )}
                </div>
              </div>
              {/* Action buttons */}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => handleChat(selectedFriend)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F0F4FF] text-[#4F7CFF] text-xs font-medium hover:bg-[#E0E8FF] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  发消息
                </button>
                <button
                  onClick={() => handleVoiceCall(selectedFriend)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F0FDF4] text-[#22C55E] text-xs font-medium hover:bg-[#E0FCE8] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  语音
                </button>
                <button
                  onClick={() => handleVideoCall(selectedFriend)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FEF3C7] text-[#D97706] text-xs font-medium hover:bg-[#FDE68A] transition-colors"
                >
                  <Video className="w-3.5 h-3.5" />
                  视频
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isOffice ? (
                <>
                  <MemorySection icon={Briefcase} color="text-purple-500" bg="bg-purple-50" title="专业领域" items={selectedFriend.expertise || []} />
                  <MemorySection icon={MessageCircle} color="text-blue-500" bg="bg-blue-50" title="最近协作" items={selectedFriend.recentTopics} />
                  <MemorySection icon={Coffee} color="text-amber-500" bg="bg-amber-50" title="沟通风格" items={selectedFriend.communicationStyle} />
                  <MemorySection icon={Clock} color="text-indigo-500" bg="bg-indigo-50" title="工作习惯" items={selectedFriend.workStyle || []} />
                  <MemorySection icon={Star} color="text-green-500" bg="bg-green-50" title="协作记忆" items={selectedFriend.collaborationMemory} />
                  <MemorySection icon={Lightbulb} color="text-pink-500" bg="bg-pink-50" title="互动建议" items={selectedFriend.suggestions} />
                </>
              ) : (
                <>
                  <MemorySection icon={Heart} color="text-pink-500" bg="bg-pink-50" title="兴趣偏好" items={selectedFriend.interests} />
                  <MemorySection icon={MessageCircle} color="text-blue-500" bg="bg-blue-50" title="最近聊到" items={selectedFriend.recentTopics} />
                  <MemorySection icon={Calendar} color="text-green-500" bg="bg-green-50" title="重要日期" items={selectedFriend.importantDates.length > 0 ? selectedFriend.importantDates : ['暂无']} />
                  <MemorySection icon={Coffee} color="text-amber-500" bg="bg-amber-50" title="沟通偏好" items={selectedFriend.communicationStyle} />
                  <MemorySection icon={Star} color="text-purple-500" bg="bg-purple-50" title="协作记忆" items={selectedFriend.collaborationMemory} />
                  <MemorySection icon={Lightbulb} color="text-indigo-500" bg="bg-indigo-50" title="互动建议" items={selectedFriend.suggestions} />
                </>
              )}
            </div>
          </div>
        )}

        {/* Group detail card */}
        {selectedGroup && (
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 hover-lift">
            <div className="flex items-center gap-3 mb-5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isOffice ? 'bg-[#8B5CF6]/10' : 'bg-[#4F7CFF]/10'
              }`}>
                <Users className={`w-5 h-5 ${isOffice ? 'text-[#8B5CF6]' : 'text-[#4F7CFF]'}`} />
              </div>
              <h3 className="text-lg font-bold text-[#111827]">{selectedGroup.name}</h3>
              {/* Group action buttons */}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => handleGroupChat(selectedGroup)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F0F4FF] text-[#4F7CFF] text-xs font-medium hover:bg-[#E0E8FF] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  群聊
                </button>
                <button
                  onClick={() => handleGroupVideoCall(selectedGroup)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#FEF3C7] to-[#FEE2E2] text-[#D97706] text-xs font-medium hover:from-[#FDE68A] hover:to-[#FECACA] transition-colors"
                >
                  <Video className="w-3.5 h-3.5" />
                  {isOffice ? '发起会议' : '视频通话'}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">成员</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedGroup.members.map((m, i) => (
                    <span key={i} className="px-3 py-1.5 bg-[#F3F4F6] rounded-full text-sm text-[#6B7280]">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">最近主题</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedGroup.recentTopics.map((t, i) => (
                    <span key={i} className={`px-3 py-1.5 rounded-full text-sm ${
                      isOffice ? 'bg-[#F5F0FF] text-[#8B5CF6]' : 'bg-[#F0F4FF] text-[#4F7CFF]'
                    }`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">已确认</h4>
                  <div className="space-y-1.5">
                    {selectedGroup.confirmed.map((c, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-[#6B7280]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">待确认</h4>
                  <div className="space-y-1.5">
                    {selectedGroup.pending.map((p, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-[#6B7280]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                        {p}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-[#F0F4FF] to-[#F5F0FF] rounded-2xl border border-[#4F7CFF]/10">
                <Sparkles className="w-4 h-4 text-[#4F7CFF] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#4F7CFF] mb-1">AI 建议</h4>
                  <p className="text-sm text-[#6B7280]">{selectedGroup.suggestions[0]}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Call Modal */}
      <VideoCallModal
        isOpen={videoCallOpen}
        onClose={() => setVideoCallOpen(false)}
        callerName={callName}
        callerAvatar={callAvatar}
        participants={callParticipants}
        isOffice={callIsOffice}
        meetingTitle={callIsOffice ? `${callName} 周度同步会议` : undefined}
      />
    </div>
  );
}

function MemorySection({ icon: Icon, color, bg, title, items }: {
  icon: typeof Heart;
  color: string;
  bg: string;
  title: string;
  items: string[];
}) {
  return (
    <div className="p-4 rounded-xl bg-[#F7F8FA] hover:bg-white hover:shadow-sm transition-all duration-200">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-7 h-7 rounded-lg ${bg} flex items-center justify-center`}>
          <Icon className={`w-3.5 h-3.5 ${color}`} />
        </div>
        <h4 className="text-xs font-semibold text-[#111827]">{title}</h4>
      </div>
      <div className="space-y-1">
        {items.map((item, i) => (
          <p key={i} className="text-sm text-[#6B7280]">{item}</p>
        ))}
      </div>
    </div>
  );
}