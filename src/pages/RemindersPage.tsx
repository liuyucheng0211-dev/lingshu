import { useState } from 'react';
import { useReminderStore } from '@/stores/reminderStore';
import { Sparkles, CheckCircle2, Clock, Calendar, AlertCircle, MessageSquare } from 'lucide-react';

type FilterType = 'all' | 'life' | 'office' | 'important';

export default function RemindersPage() {
  const { reminders, markComplete } = useReminderStore();
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = reminders.filter((r) => {
    if (r.status === 'done') return false;
    if (filter === 'life') return r.space === 'life';
    if (filter === 'office') return r.space === 'office';
    if (filter === 'important') return r.importance === 'important';
    return true;
  });

  const today = filtered.filter((r) => r.status === 'today');
  const week = filtered.filter((r) => r.status === 'week');
  const pending = filtered.filter((r) => r.status === 'pending');
  const done = reminders.filter((r) => r.status === 'done');

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: '全部' },
    { key: 'life', label: '生活' },
    { key: 'office', label: '办公' },
    { key: 'important', label: '重要' },
  ];

  const handleMarkComplete = (id: string) => {
    markComplete(id);
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-[#111827]">轻提醒</h2>
            <p className="text-sm text-[#9CA3AF]">重要的约定和待办都不会遗漏</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f.key
                  ? 'bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white shadow-md'
                  : 'bg-white text-[#6B7280] hover:bg-[#F7F8FA] border border-[#E5E7EB]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          <ReminderGroup
            icon={Clock}
            title="今天"
            items={today}
            onComplete={handleMarkComplete}
            color="text-blue-500"
          />
          <ReminderGroup
            icon={Calendar}
            title="本周"
            items={week}
            onComplete={handleMarkComplete}
            color="text-purple-500"
          />
          <ReminderGroup
            icon={AlertCircle}
            title="待确认"
            items={pending}
            onComplete={handleMarkComplete}
            color="text-amber-500"
          />
          {done.length > 0 && (
            <ReminderGroup
              icon={CheckCircle2}
              title="已完成"
              items={done}
              onComplete={handleMarkComplete}
              color="text-green-500"
              isDone
            />
          )}
        </div>
      </div>

      <aside className="hidden lg:block w-[280px] border-l border-[#E5E7EB] bg-white p-4 flex-shrink-0 overflow-y-auto">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-[#4F7CFF]" />
          <h3 className="text-sm font-semibold text-[#111827]">AI 建议</h3>
        </div>
        <div className="p-4 bg-gradient-to-r from-[#F0F4FF] to-[#F5F0FF] rounded-2xl border border-[#4F7CFF]/15 mb-4">
          <p className="text-sm text-[#6B7280] mb-3">
            你有 2 个约定接近时间，可以生成一条自然提醒发到群里。
          </p>
          <button className="w-full py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] rounded-xl hover:shadow-md transition-all flex items-center justify-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5" />
            生成提醒话术
          </button>
        </div>
        <div className="space-y-2">
          <button className="w-full py-2.5 text-sm font-medium text-[#4F7CFF] bg-[#F0F4FF] rounded-xl hover:bg-[#E0E8FF] transition-all">
            生成讨论记录
          </button>
          <button className="w-full py-2.5 text-sm font-medium text-[#6B7280] bg-[#F3F4F6] rounded-xl hover:bg-[#E5E7EB] transition-all">
            标记完成
          </button>
        </div>
      </aside>
    </div>
  );
}

function ReminderGroup({
  icon: Icon,
  title,
  items,
  onComplete,
  color,
  isDone,
}: {
  icon: typeof Clock;
  title: string;
  items: { id: string; title: string; time: string; importance: string; space: string; source?: string }[];
  onComplete: (id: string) => void;
  color: string;
  isDone?: boolean;
}) {
  if (items.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-4 h-4 ${color}`} />
        <h3 className="text-sm font-semibold text-[#111827]">{title}</h3>
        <span className="text-xs text-[#9CA3AF]">({items.length})</span>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all ${
              isDone
                ? 'bg-[#F0FDF4] border-[#BBF7D0]'
                : item.importance === 'important'
                ? 'bg-[#FEF3C7]/30 border-[#FDE68A]/50'
                : 'bg-white border-[#E5E7EB]'
            } hover:shadow-sm group`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className={`text-sm ${isDone ? 'text-[#6B7280] line-through' : 'text-[#111827] font-medium'}`}>
                  {item.title}
                </p>
                {item.importance === 'important' && !isDone && (
                  <span className="text-xs px-1.5 py-0.5 rounded-md bg-[#FEF3C7] text-[#D97706] font-medium">
                    重要
                  </span>
                )}
                <span className={`text-xs px-1.5 py-0.5 rounded-md ${
                  item.space === 'life' ? 'bg-blue-50 text-blue-500' : 'bg-purple-50 text-purple-500'
                }`}>
                  {item.space === 'life' ? '生活' : '办公'}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-[#9CA3AF]">{item.time}</p>
                {item.source && (
                  <p className="text-xs text-[#9CA3AF]">来自 {item.source}</p>
                )}
              </div>
            </div>
            {!isDone && (
              <button
                onClick={() => onComplete(item.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-[#22C55E]/10 text-[#9CA3AF] hover:text-[#22C55E]"
              >
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}