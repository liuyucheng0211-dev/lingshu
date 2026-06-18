import { useSpaceStore } from '@/stores/spaceStore';

export default function SpaceSwitcher() {
  const { currentSpace, switchSpace } = useSpaceStore();

  return (
    <div className="flex items-center gap-0 bg-gray-100 rounded-full p-0.5 relative">
      {/* Animated background pill */}
      <div
        className={`absolute top-0.5 h-[calc(100%-4px)] w-[calc(50%-2px)] rounded-full bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] shadow-md transition-all duration-400 ease-out ${
          currentSpace === 'life' ? 'left-0.5' : 'left-[calc(50%-0.5px)]'
        }`}
      />
      <button
        onClick={() => switchSpace('life')}
        className={`relative z-10 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
          currentSpace === 'life'
            ? 'text-white'
            : 'text-[#6B7280] hover:text-[#111827]'
        }`}
      >
        生活
      </button>
      <button
        onClick={() => switchSpace('office')}
        className={`relative z-10 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
          currentSpace === 'office'
            ? 'text-white'
            : 'text-[#6B7280] hover:text-[#111827]'
        }`}
      >
        办公
      </button>
    </div>
  );
}