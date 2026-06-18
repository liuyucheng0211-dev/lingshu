import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockRecords } from '@/data/mockRecords';
import { FileText, Sparkles, CheckCircle2, AlertCircle, MessageSquare, ChevronLeft } from 'lucide-react';

export default function RecordsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const recentRecords = mockRecords.filter((r) => r.category === 'recent');
  const recommendedRecords = mockRecords.filter((r) => r.category === 'recommended');

  if (selectedId) {
    return <RecordDetail id={selectedId} onBack={() => setSelectedId(null)} />;
  }

  return (
    <div className="flex h-full">
      <div className="flex-1 overflow-y-auto p-6">
        <h2 className="text-lg font-bold text-[#111827] mb-1">共享记录</h2>
        <p className="text-sm text-[#9CA3AF] mb-6">把聊天中的重要内容沉淀为轻量记录</p>

        <div className="mb-8">
          <h3 className="text-sm font-semibold text-[#6B7280] mb-3">最近生成</h3>
          <div className="space-y-2">
            {recentRecords.map((record) => (
              <button
                key={record.id}
                onClick={() => setSelectedId(record.id)}
                className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl border border-[#E5E7EB] hover:shadow-sm hover:border-[#4F7CFF]/20 transition-all text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-purple-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#111827]">{record.title}</p>
                  <p className="text-xs text-[#9CA3AF] mt-0.5">
                    来自「{record.sourceChat}」群聊 · {record.date}
                  </p>
                </div>
                <ChevronLeft className="w-4 h-4 text-[#9CA3AF] rotate-180" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#4F7CFF]" />
            <h3 className="text-sm font-semibold text-[#6B7280]">AI 推荐整理</h3>
          </div>
          <div className="space-y-2">
            {recommendedRecords.map((record) => (
              <button
                key={record.id}
                onClick={() => setSelectedId(record.id)}
                className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-[#F0F4FF]/50 to-[#F5F0FF]/50 rounded-2xl border border-[#4F7CFF]/15 hover:shadow-sm transition-all text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F7CFF]/20 to-[#8B5CF6]/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-[#4F7CFF]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#111827]">{record.title}</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">{record.summary}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RecordDetail({ id, onBack }: { id: string; onBack: () => void }) {
  const record = mockRecords.find((r) => r.id === id);
  if (!record) return null;

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#111827] mb-6 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        返回列表
      </button>

      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
            <FileText className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#111827]">{record.title}</h2>
            <p className="text-xs text-[#9CA3AF]">
              来自「{record.sourceChat}」群聊 · {record.date}
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-semibold text-[#111827] mb-2">聊天重点</h3>
            <p className="text-sm text-[#6B7280] leading-relaxed">{record.summary}</p>
          </div>

          {record.confirmed.length > 0 && (
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-[#111827] mb-2">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                已确认
              </h3>
              <div className="space-y-1.5">
                {record.confirmed.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                    {c}
                  </div>
                ))}
              </div>
            </div>
          )}

          {record.pending.length > 0 && (
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-[#111827] mb-2">
                <AlertCircle className="w-4 h-4 text-[#F59E0B]" />
                待确认
              </h3>
              <div className="space-y-1.5">
                {record.pending.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                    {p}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 pt-4 border-t border-[#E5E7EB]">
            <MessageSquare className="w-4 h-4 text-[#9CA3AF]" />
            <span className="text-sm text-[#9CA3AF]">相关聊天：来自「{record.sourceChat}」群聊</span>
          </div>
        </div>
      </div>
    </div>
  );
}