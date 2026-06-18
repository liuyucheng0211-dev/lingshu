import { useState } from 'react';
import { useSpaceStore } from '@/stores/spaceStore';
import { mockLifeFeed, SocialFeedItem } from '@/data/mockSocialFeed';
import { Heart, MessageCircle, Share2, MoreHorizontal, FileText, Users, FolderOpen, ChevronRight } from 'lucide-react';

export default function HomePage() {
  const { currentSpace } = useSpaceStore();

  if (currentSpace === 'office') {
    return <OfficeHomePage />;
  }

  return <MomentsFeed />;
}

function MomentsFeed() {
  const [feed, setFeed] = useState<SocialFeedItem[]>(mockLifeFeed);

  const toggleLike = (id: string) => {
    setFeed((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, liked: !item.liked, likes: item.liked ? item.likes - 1 : item.likes + 1 }
          : item
      )
    );
  };

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 sticky top-0 bg-[#F7F8FA]/80 backdrop-blur-sm z-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-[#111827]">动态</h2>
          <button className="w-9 h-9 rounded-xl bg-white flex items-center justify-center hover:bg-[#F0F4FF] transition-colors">
            <MoreHorizontal className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>
      </div>

      {/* Feed list */}
      <div className="px-6 pb-6 space-y-6">
        {feed.map((item, i) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden hover:shadow-md transition-all duration-300"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {/* Post header */}
            <div className="flex items-center gap-3 p-4">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#4F7CFF] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm">
                {item.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#111827]">{item.name}</p>
                <p className="text-xs text-[#9CA3AF]">{item.time}</p>
              </div>
            </div>

            {/* Post content */}
            <div className="px-4 pb-3">
              <p className="text-sm text-[#111827] leading-relaxed whitespace-pre-line">{item.content}</p>
            </div>

            {/* Post images */}
            {item.images && item.images.length > 0 && (
              <div className="px-4 pb-3">
                <div className={`grid gap-1.5 rounded-xl overflow-hidden ${
                  item.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
                }`}>
                  {item.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="aspect-square bg-[#F3F4F6] overflow-hidden"
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action bar */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-[#F3F4F6]">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleLike(item.id)}
                  className="flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#EF4444] transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 transition-all ${
                      item.liked ? 'fill-[#EF4444] text-[#EF4444]' : ''
                    }`}
                  />
                  {item.likes > 0 && <span>{item.likes}</span>}
                </button>
                <button className="flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#4F7CFF] transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  {item.comments.length > 0 && <span>{item.comments.length}</span>}
                </button>
              </div>
              <button className="text-xs text-[#6B7280] hover:text-[#4F7CFF] transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Comments */}
            {item.comments.length > 0 && (
              <div className="px-4 pb-3 bg-[#F7F8FA] mx-3 mb-3 rounded-xl">
                {item.comments.map((comment, ci) => (
                  <div
                    key={ci}
                    className={`flex items-start gap-2 py-2 ${
                      ci < item.comments.length - 1 ? 'border-b border-[#E5E7EB]' : ''
                    }`}
                  >
                    <span className="text-xs font-semibold text-[#4F7CFF] flex-shrink-0">
                      {comment.name}
                    </span>
                    <span className="text-xs text-[#6B7280] flex-1">{comment.content}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function OfficeHomePage() {
  const sections = [
    {
      icon: MessageCircle,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-500',
      title: '最近讨论',
      items: [
        { name: '设计小队', desc: '报价单确认', time: '10分钟前', avatar: 'SJ' },
        { name: '官网改版群', desc: '首页视觉调整', time: '1小时前', avatar: 'GW' },
      ],
    },
    {
      icon: FileText,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-500',
      title: '共享记录',
      items: [
        { name: '报价单确认记录', desc: '来自「设计小队」群聊', time: '', avatar: '' },
        { name: '周五同步讨论记录', desc: '来自「设计小队」群聊', time: '', avatar: '' },
      ],
    },
    {
      icon: Users,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-500',
      title: '待确认分工',
      items: [
        { name: '王磊', desc: '调整首页图 · 明天下午前', time: '', avatar: 'WL' },
        { name: '李娜', desc: '确认报价单 · 今天 18:00 前', time: '', avatar: 'LN' },
      ],
    },
    {
      icon: FolderOpen,
      iconBg: 'bg-red-50',
      iconColor: 'text-red-400',
      title: '重要文件',
      items: [
        { name: '报价单.pdf', desc: '2.4 MB · 6月18日', time: '', avatar: '' },
        { name: '首页修改建议.docx', desc: '1.8 MB · 6月17日', time: '', avatar: '' },
      ],
    },
  ];

  return (
    <div className="p-6 space-y-6 page-enter">
      <div>
        <h2 className="text-xl font-bold text-[#111827] mb-1">办公空间</h2>
        <p className="text-sm text-[#9CA3AF]">轻协作，不打扰</p>
      </div>

      {sections.map((section) => (
        <div key={section.title}>
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-7 h-7 rounded-lg ${section.iconBg} flex items-center justify-center`}>
              <section.icon className={`w-4 h-4 ${section.iconColor}`} />
            </div>
            <h3 className="text-sm font-bold text-[#111827]">{section.title}</h3>
          </div>
          <div className="space-y-2">
            {section.items.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-[#E5E7EB] hover:shadow-md hover:border-[#4F7CFF]/15 transition-all duration-300 cursor-pointer hover-lift"
              >
                {item.avatar ? (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4F7CFF]/15 to-[#8B5CF6]/15 flex items-center justify-center text-[#4F7CFF] font-bold text-xs flex-shrink-0">
                    {item.avatar}
                  </div>
                ) : (
                  <div className={`w-9 h-9 rounded-lg ${section.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <section.icon className={`w-4 h-4 ${section.iconColor}`} />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#111827]">{item.name}</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">{item.desc}</p>
                </div>
                {item.time && (
                  <span className="text-xs text-[#9CA3AF] flex-shrink-0">{item.time}</span>
                )}
                <ChevronRight className="w-4 h-4 text-[#D1D5DB] flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}