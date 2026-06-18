import { useSearchStore } from '@/stores/searchStore';
import { Search, Sparkles } from 'lucide-react';

export default function AISearchBar() {
  const { openSearch } = useSearchStore();

  return (
    <button
      onClick={openSearch}
      className="w-full max-w-2xl mx-auto flex items-center gap-3 px-5 py-2.5 bg-[#F7F8FA] rounded-2xl ring-1 ring-[#E5E7EB] hover:ring-2 hover:ring-[#4F7CFF]/20 hover:bg-white hover:shadow-md hover:shadow-[#4F7CFF]/5 transition-all duration-300 group cursor-pointer"
    >
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#4F7CFF]/10 to-[#8B5CF6]/10 flex items-center justify-center flex-shrink-0 group-hover:from-[#4F7CFF]/20 group-hover:to-[#8B5CF6]/20 transition-all">
        <Search className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#4F7CFF] transition-colors" />
      </div>
      <span className="text-[#9CA3AF] text-sm flex-1 text-left group-hover:text-[#6B7280] transition-colors">
        问 AI 或搜索聊天、好友、群组、记录...
      </span>
      <div className="hidden sm:flex items-center gap-1">
        <Sparkles className="w-3.5 h-3.5 text-[#4F7CFF]/40" />
        <kbd className="flex items-center gap-0.5 px-2 py-1 rounded-lg bg-white text-[#9CA3AF] text-[11px] font-medium border border-[#E5E7EB] shadow-sm">
          Ctrl K
        </kbd>
      </div>
    </button>
  );
}