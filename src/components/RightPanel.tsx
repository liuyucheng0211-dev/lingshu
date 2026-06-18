import { useSpaceStore } from '@/stores/spaceStore';
import { useReminderStore } from '@/stores/reminderStore';
import { Bell, AlertTriangle, EyeOff, Clock } from 'lucide-react';

export default function RightPanel() {
  const { currentSpace } = useSpaceStore();
  const { getLifeReminders, getOfficeReminders, getImportantCrossSpace } = useReminderStore();

  const currentReminders = currentSpace === 'life' ? getLifeReminders() : getOfficeReminders();
  const crossSpaceReminders = getImportantCrossSpace(currentSpace);
  const todayReminders = currentReminders.filter((r) => r.status === 'today');
  const pendingReminders = currentReminders.filter((r) => r.status === 'pending');

  return (
    <aside className="hidden xl:block w-[288px] h-screen overflow-y-auto bg-white/60 backdrop-blur-sm border-l border-[#E5E7EB] p-5 flex-shrink-0">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#4F7CFF]/10 to-[#8B5CF6]/10 flex items-center justify-center">
          <Bell className="w-4 h-4 text-[#4F7CFF]" />
        </div>
        <h3 className="text-sm font-bold text-[#111827]">AI 轻提醒</h3>
        {todayReminders.length > 0 && (
          <span className="ml-auto text-[11px] font-semibold text-[#4F7CFF] bg-[#F0F4FF] px-2 py-0.5 rounded-full">
            {todayReminders.length} 条今日
          </span>
        )}
      </div>

      {/* Current space reminders */}
      <div className="mb-5">
        <div className="flex items-center gap-1.5 mb-3">
          <div className={`w-1.5 h-1.5 rounded-full ${currentSpace === 'life' ? 'bg-[#4F7CFF]' : 'bg-[#8B5CF6]'}`} />
          <span className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider">
            {currentSpace === 'life' ? '生活空间' : '办公空间'}
          </span>
        </div>
        <div className="space-y-2">
          {todayReminders.map((r) => (
            <ReminderCard key={r.id} reminder={r} />
          ))}
          {pendingReminders.slice(0, 2).map((r) => (
            <ReminderCard key={r.id} reminder={r} />
          ))}
          {todayReminders.length === 0 && pendingReminders.length === 0 && (
            <div className="p-4 rounded-2xl bg-[#F7F8FA] text-center">
              <Clock className="w-5 h-5 text-[#D1D5DB] mx-auto mb-2" />
              <p className="text-xs text-[#9CA3AF]">暂无提醒</p>
            </div>
          )}
        </div>
      </div>

      {/* Cross-space important reminders */}
      {crossSpaceReminders.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 mb-3">
            <AlertTriangle className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span className="text-[11px] font-semibold text-[#F59E0B] uppercase tracking-wider">跨空间重要提醒</span>
          </div>
          <div className="space-y-2">
            {crossSpaceReminders.map((r) => {
              if (r.importance === 'private') {
                return (
                  <div key={r.id} className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#FEF3C7]/40 border border-[#FDE68A]/60 pulse-glow">
                    <EyeOff className="w-4 h-4 text-[#F59E0B] flex-shrink-0" />
                    <span className="text-xs text-[#92400E] font-medium">
                      {r.space === 'office' ? '办公空间' : '生活空间'}有 1 条重要提醒
                    </span>
                  </div>
                );
              }
              return (
                <div key={r.id} className="p-3 rounded-2xl bg-[#FEF3C7]/40 border border-[#FDE68A]/60 hover:shadow-sm transition-all cursor-pointer pulse-glow">
                  <div className="text-[11px] text-[#D97706] mb-1 font-medium">
                    {r.space === 'office' ? '办公空间' : '生活空间'}重要提醒：
                  </div>
                  <div className="text-sm font-semibold text-[#92400E]">{r.title}</div>
                  <div className="text-[11px] text-[#B45309]/70 mt-1">{r.time}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}

function ReminderCard({ reminder }: { reminder: { id: string; title: string; time: string; importance: string; source?: string } }) {
  const isImportant = reminder.importance === 'important';
  return (
    <div className={`p-3 rounded-2xl transition-all duration-300 cursor-pointer hover:shadow-sm hover:-translate-y-0.5 ${
      isImportant
        ? 'bg-[#FEF3C7]/30 border border-[#FDE68A]/50'
        : 'bg-[#F7F8FA] hover:bg-white hover:border-[#E5E7EB] border border-transparent'
    }`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className={`text-sm leading-snug ${isImportant ? 'font-semibold text-[#92400E]' : 'text-[#111827]'}`}>
            {reminder.title}
          </p>
          <div className="flex items-center gap-2 mt-1.5">
            <p className="text-[11px] text-[#9CA3AF]">{reminder.time}</p>
            {reminder.source && (
              <p className="text-[11px] text-[#9CA3AF] truncate">· {reminder.source}</p>
            )}
          </div>
        </div>
        {isImportant && (
          <div className="w-5 h-5 rounded-full bg-[#FEF3C7] flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-3 h-3 text-[#F59E0B]" />
          </div>
        )}
      </div>
    </div>
  );
}