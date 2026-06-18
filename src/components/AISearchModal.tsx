import { useEffect, useRef, useState } from 'react';
import { useSearchStore } from '@/stores/searchStore';
import { mockSearchExamples } from '@/data/mockSearchResults';
import { Search, X, ArrowRight, MessageSquare, User, FileText, Command, CornerDownLeft, Globe, ExternalLink, Sparkles } from 'lucide-react';

const scopeOptions = [
  { value: 'current', label: '当前空间' },
  { value: 'life', label: '生活空间' },
  { value: 'office', label: '办公空间' },
  { value: 'all', label: '全部空间' },
  { value: 'important', label: '重要提醒' },
] as const;

export default function AISearchModal() {
  const { isOpen, closeSearch, query, setQuery, scope, setScope, results, search } = useSearchStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (!isOpen) setExiting(false);
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) handleClose();
        else useSearchStore.getState().openSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setExiting(true);
    setTimeout(() => closeSearch(), 200);
  };

  if (!isOpen && !exiting) return null;
  if (!isOpen && exiting) {
    setTimeout(() => setExiting(false), 0);
    return null;
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.trim()) {
      search();
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'chat': return <MessageSquare className="w-4 h-4" />;
      case 'contact': return <User className="w-4 h-4" />;
      case 'record': return <FileText className="w-4 h-4" />;
      case 'knowledge': return <Globe className="w-4 h-4" />;
      default: return <Search className="w-4 h-4" />;
    }
  };

  const isKnowledge = (s: string) => s.includes('什么是') || s.includes('如何') || s.includes('最近');

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh]">
      <div
        className={`absolute inset-0 bg-black/40 ${exiting ? 'animate-[fadeIn_0.2s_ease-out_reverse_both]' : 'backdrop-enter'}`}
        onClick={handleClose}
        style={{ backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
      />
      <div className={`relative w-full max-w-[640px] glass-strong rounded-3xl shadow-2xl overflow-hidden ${exiting ? 'modal-exit' : 'modal-enter'}`}>
        <div className="p-5">
          <div className="flex items-center gap-3 px-4 py-3 bg-[#F7F8FA]/80 rounded-2xl ring-1 ring-[#E5E7EB]/50 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#4F7CFF]/30 focus-within:bg-white">
            <Search className="w-5 h-5 text-[#9CA3AF] flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="问 AI 或搜索知识..."
              className="flex-1 bg-transparent border-none outline-none text-[#111827] placeholder-[#9CA3AF] text-[15px]"
            />
            {query ? (
              <button onClick={() => { setQuery(''); }} className="text-[#9CA3AF] hover:text-[#111827] transition-colors">
                <X className="w-4 h-4" />
              </button>
            ) : (
              <kbd className="hidden sm:flex items-center gap-0.5 text-[10px] text-[#9CA3AF] bg-white px-1.5 py-0.5 rounded-md border border-[#E5E7EB]">
                <Command className="w-2.5 h-2.5" />K
              </kbd>
            )}
          </div>

          <div className="flex items-center gap-1.5 mt-3 flex-wrap">
            {scopeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setScope(opt.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  scope === opt.value
                    ? 'bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white shadow-md shadow-[#4F7CFF]/20'
                    : 'bg-[#F3F4F6]/80 text-[#6B7280] hover:bg-[#E5E7EB] hover:text-[#111827]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {!results ? (
          <div className="px-5 pb-5">
            <p className="text-[11px] font-medium text-[#9CA3AF] mb-3 px-1 uppercase tracking-wider">试试这样问</p>
            <div className="space-y-1">
              {mockSearchExamples.map((example, i) => (
                <button
                  key={i}
                  onClick={() => { setQuery(example); search(example); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#F7F8FA] transition-all duration-200 text-sm text-[#6B7280] hover:text-[#111827] text-left group"
                >
                  {isKnowledge(example) ? (
                    <Globe className="w-3.5 h-3.5 text-[#D1D5DB] group-hover:text-[#22C55E] flex-shrink-0 transition-colors" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-[#D1D5DB] group-hover:text-[#4F7CFF] flex-shrink-0 transition-colors" />
                  )}
                  {example}
                  <CornerDownLeft className="w-3 h-3 text-[#D1D5DB] ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="px-5 pb-5 max-h-[52vh] overflow-y-auto space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="text-[11px] font-medium text-[#9CA3AF] uppercase tracking-wider">AI 回答</span>
            </div>

            {results.aiSummary && (
              <div className="p-4 bg-gradient-to-r from-[#F0FDF4] to-[#EEF2FF] rounded-2xl border border-[#E5E7EB]">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[#22C55E]" />
                  <span className="text-xs font-semibold text-[#22C55E]">AI 智能总结</span>
                </div>
                <p className="text-sm text-[#4B5563] leading-relaxed">{results.aiSummary}</p>
              </div>
            )}

            {results.lifeResults.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4F7CFF]" />
                  <span className="text-xs font-semibold text-[#4F7CFF]">生活空间</span>
                </div>
                {results.lifeResults.map((r, i) => (
                  <ResultCard key={i} result={r} icon={getIcon(r.type)} />
                ))}
              </div>
            )}

            {results.officeResults.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                  <span className="text-xs font-semibold text-[#8B5CF6]">办公空间</span>
                </div>
                {results.officeResults.map((r, i) => (
                  <ResultCard key={i} result={r} icon={getIcon(r.type)} />
                ))}
              </div>
            )}

            {results.knowledgeResults.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                  <span className="text-xs font-semibold text-[#22C55E]">联网知识</span>
                </div>
                {results.knowledgeResults.map((r, i) => (
                  <KnowledgeCard key={i} result={r} />
                ))}
              </div>
            )}

            {results.hiddenCount > 0 && (
              <div className="flex items-center gap-2 px-1 text-xs text-[#9CA3AF]">
                <div className="w-1 h-1 rounded-full bg-[#D1D5DB]" />
                已隐藏 {results.hiddenCount} 条普通提醒
              </div>
            )}

            {results.relatedRecords.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6B7280]" />
                  <span className="text-xs font-semibold text-[#6B7280]">相关记录</span>
                </div>
                {results.relatedRecords.map((r, i) => (
                  <ResultCard key={i} result={r} icon={getIcon(r.type)} />
                ))}
              </div>
            )}

            <div className="flex gap-2 pt-3 border-t border-[#E5E7EB]/50">
              <button className="flex-1 py-2.5 text-sm font-medium text-[#4F7CFF] bg-[#F0F4FF] rounded-xl hover:bg-[#E0E8FF] transition-all duration-200 active-scale">
                打开相关聊天
              </button>
              <button className="flex-1 py-2.5 text-sm font-medium text-[#4F7CFF] bg-[#F0F4FF] rounded-xl hover:bg-[#E0E8FF] transition-all duration-200 active-scale">
                生成提醒话术
              </button>
              <button className="flex-1 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] rounded-xl hover:shadow-lg hover:shadow-[#4F7CFF]/20 transition-all duration-300 active-scale">
                加入轻提醒
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ResultCard({ result, icon }: { result: { title: string; description: string; source?: string; actions: string[] }; icon: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-[#F7F8FA]/80 rounded-2xl hover:bg-white hover:shadow-sm hover:shadow-[#4F7CFF]/5 transition-all duration-300 cursor-pointer group border border-transparent hover:border-[#E5E7EB]">
      <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center flex-shrink-0 mt-0.5 text-[#4F7CFF] shadow-sm group-hover:shadow transition-all">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[#111827]">{result.title}</span>
          {result.source && (
            <span className="text-[11px] text-[#9CA3AF]">来自 {result.source}</span>
          )}
        </div>
        <p className="text-sm text-[#6B7280] mt-1">{result.description}</p>
        {result.actions.length > 0 && (
          <div className="flex gap-1.5 mt-2.5">
            {result.actions.slice(0, 3).map((action, i) => (
              <span key={i} className="text-[11px] px-2.5 py-1 bg-white rounded-full text-[#4F7CFF] border border-[#E5E7EB] font-medium hover:border-[#4F7CFF]/30 hover:bg-[#F0F4FF] transition-all cursor-pointer">
                {action}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function KnowledgeCard({ result }: { result: { title: string; description: string; url?: string; actions: string[]; source?: string } }) {
  return (
    <a
      href={result.url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 p-4 bg-[#F0FDF4]/60 rounded-2xl hover:bg-[#DCFCE7]/60 hover:shadow-sm transition-all duration-300 cursor-pointer group border border-[#BBF7D0]/30 block no-underline"
    >
      <div className="w-9 h-9 rounded-xl bg-[#DCFCE7] flex items-center justify-center flex-shrink-0 mt-0.5 text-[#22C55E] shadow-sm group-hover:shadow transition-all">
        <Globe className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[#111827]">{result.title}</span>
          {result.url && (
            <ExternalLink className="w-3 h-3 text-[#9CA3AF] opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </div>
        <p className="text-sm text-[#6B7280] mt-1">{result.description}</p>
        {result.actions.length > 0 && (
          <div className="flex gap-1.5 mt-2.5">
            {result.actions.slice(0, 3).map((action, i) => (
              <span key={i} className="text-[11px] px-2.5 py-1 bg-white rounded-full text-[#22C55E] border border-[#BBF7D0] font-medium hover:border-[#22C55E]/40 hover:bg-[#F0FDF4] transition-all cursor-pointer">
                {action}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}