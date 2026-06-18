import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useSpaceStore } from '@/stores/spaceStore';
import SpaceSwitcher from './SpaceSwitcher';
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  UserRound,
  Sparkles,
  Bell,
  FileText,
  FolderOpen,
  Settings,
  Moon,
  Shield,
  LogOut,
  ChevronRight,
  Smartphone,
  Monitor,
  Mail,
  MapPin,
  Calendar,
  X,
} from 'lucide-react';

const lifeNavItems = [
  { to: '/home', icon: LayoutDashboard, label: '动态' },
  { to: '/chat/chat1', icon: MessageSquare, label: '聊天' },
  { to: '/relations', icon: UserRound, label: '好友' },
  { to: '/chat/chat2', icon: Users, label: '群组' },
  { to: '/reminders', icon: Bell, label: '轻提醒' },
];

const officeNavItems = [
  { to: '/home', icon: LayoutDashboard, label: '动态' },
  { to: '/chat/chat4', icon: MessageSquare, label: '聊天' },
  { to: '/relations', icon: UserRound, label: '好友' },
  { to: '/chat/chat4', icon: Users, label: '群组' },
  { to: '/records', icon: FileText, label: '共享记录' },
  { to: '/files', icon: FolderOpen, label: '文件' },
  { to: '/reminders', icon: Bell, label: '轻提醒' },
];

export default function Sidebar() {
  const { currentSpace } = useSpaceStore();
  const navItems = currentSpace === 'life' ? lifeNavItems : officeNavItems;
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
    <aside className="w-[72px] lg:w-[220px] h-screen flex flex-col bg-white border-r border-[#E5E7EB] flex-shrink-0">
      {/* Logo & Space Switcher */}
      <div className="p-4 border-b border-[#E5E7EB]">
        <div className="hidden lg:flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4F7CFF] to-[#8B5CF6] flex items-center justify-center shadow-md shadow-[#4F7CFF]/20">
            <Sparkles className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-bold text-[#111827] text-lg tracking-tight">灵枢</span>
        </div>
        <div className="lg:hidden flex justify-center mb-4">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4F7CFF] to-[#8B5CF6] flex items-center justify-center shadow-md shadow-[#4F7CFF]/20">
            <Sparkles className="w-4.5 h-4.5 text-white" />
          </div>
        </div>
        <div className="flex justify-center lg:justify-start">
          <SpaceSwitcher />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2.5 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.to === '/home'}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group ${
                isActive
                  ? 'bg-gradient-to-r from-[#F0F4FF] to-[#F5F0FF] text-[#4F7CFF]'
                  : 'text-[#6B7280] hover:bg-[#F7F8FA] hover:text-[#111827]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-[#4F7CFF] to-[#8B5CF6] rounded-r-full" />
                )}
                <item.icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-[#4F7CFF]' : ''}`} />
                <span className="hidden lg:inline">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-3 border-t border-[#E5E7EB]">
        <button
          onClick={() => setShowProfile(true)}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#F7F8FA] transition-colors cursor-pointer"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4F7CFF] to-[#8B5CF6] flex items-center justify-center text-white text-xs font-bold shadow-sm">
            ME
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-sm font-semibold text-[#111827]">我</p>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              <span className="text-[11px] text-[#9CA3AF]">在线</span>
            </div>
          </div>
        </button>
      </div>
    </aside>

    {/* Profile Modal */}
    {showProfile && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowProfile(false)} />
        <div className="relative w-full max-w-[420px] bg-white rounded-3xl shadow-2xl overflow-hidden modal-enter">
          {/* Header */}
          <div className="relative h-32 bg-gradient-to-br from-[#4F7CFF] to-[#8B5CF6]">
            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Avatar */}
          <div className="flex justify-center -mt-12 mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#4F7CFF] to-[#8B5CF6] flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg">
              ME
            </div>
          </div>

          {/* Info */}
          <div className="px-6 pb-6 text-center">
            <h2 className="text-xl font-bold text-[#111827]">张三</h2>
            <p className="text-sm text-[#9CA3AF] mt-1">自由设计师 · 产品爱好者</p>

            <div className="flex items-center justify-center gap-4 mt-3 text-xs text-[#6B7280]">
              <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> zhang@example.com</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> 杭州</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 p-4 bg-[#F7F8FA] rounded-2xl">
              <div className="text-center">
                <p className="text-lg font-bold text-[#111827]">128</p>
                <p className="text-[10px] text-[#9CA3AF]">好友</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-[#111827]">6</p>
                <p className="text-[10px] text-[#9CA3AF]">群组</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-[#111827]">23</p>
                <p className="text-[10px] text-[#9CA3AF]">提醒</p>
              </div>
            </div>

            {/* Device info */}
            <div className="mt-4 p-4 bg-[#F7F8FA] rounded-2xl">
              <h3 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">已登录设备</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm">
                  <Monitor className="w-4 h-4 text-[#4F7CFF]" />
                  <span className="text-[#111827]">MacBook Pro</span>
                  <span className="text-[#9CA3AF] text-xs ml-auto">当前</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Smartphone className="w-4 h-4 text-[#22C55E]" />
                  <span className="text-[#111827]">iPhone 15 Pro</span>
                  <span className="text-[#9CA3AF] text-xs ml-auto">在线</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 space-y-1">
              {[
                { icon: Settings, label: '设置' },
                { icon: Moon, label: '深色模式' },
                { icon: Shield, label: '隐私与安全' },
                { icon: LogOut, label: '退出登录', danger: true },
              ].map((a, i) => (
                <button
                  key={i}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#F7F8FA] transition-colors text-sm ${
                    a.danger ? 'text-[#EF4444]' : 'text-[#111827]'
                  }`}
                >
                  <a.icon className="w-4 h-4" />
                  {a.label}
                  <ChevronRight className="w-4 h-4 ml-auto text-[#D1D5DB]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}