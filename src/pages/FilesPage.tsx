import { useState } from 'react';
import { mockFiles, FileItem } from '@/data/mockFiles';
import { FileText, FileImage, File, Sparkles, Download, ExternalLink, Pencil, Check, X, Save, Undo2 } from 'lucide-react';

type FileTab = 'recent' | 'group' | 'starred' | 'ai-organized';

const tabs: { key: FileTab; label: string }[] = [
  { key: 'recent', label: '最近文件' },
  { key: 'group', label: '群文件' },
  { key: 'starred', label: '收藏文件' },
  { key: 'ai-organized', label: 'AI 已整理' },
];

const fileTypeIcons: Record<string, typeof FileText> = {
  pdf: FileText,
  docx: FileText,
  png: FileImage,
  jpg: FileImage,
};

const fileTypeColors: Record<string, string> = {
  pdf: 'bg-red-50 text-red-500',
  docx: 'bg-blue-50 text-blue-500',
  png: 'bg-green-50 text-green-500',
  jpg: 'bg-green-50 text-green-500',
};

const isImage = (type: string) => type === 'png' || type === 'jpg' || type === 'jpeg';

export default function FilesPage() {
  const [activeTab, setActiveTab] = useState<FileTab>('recent');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [savedContent, setSavedContent] = useState<Record<string, string>>({});

  const filteredFiles = mockFiles.filter((f) => f.category === activeTab);
  const selected = mockFiles.find((f) => f.id === selectedFile);

  const handleSelectFile = (fileId: string) => {
    setSelectedFile(fileId);
    setEditing(false);
  };

  const handleStartEdit = () => {
    if (!selected?.content) return;
    setEditContent(savedContent[selected.id] || selected.content);
    setEditing(true);
  };

  const handleSave = () => {
    if (!selected) return;
    setSavedContent((prev) => ({ ...prev, [selected.id]: editContent }));
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditContent('');
  };

  const displayContent = selected
    ? (savedContent[selected.id] ?? selected.content)
    : '';

  return (
    <div className="flex h-full page-enter">
      {/* Left: File list */}
      <div className="w-[280px] border-r border-[#E5E7EB] bg-white p-4 flex-shrink-0 overflow-y-auto">
        <h2 className="text-lg font-bold text-[#111827] mb-1">文件</h2>
        <p className="text-sm text-[#9CA3AF] mb-4">轻量文件管理，支持在线编辑</p>

        <div className="flex gap-1.5 mb-4 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white shadow-md'
                  : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-1">
          {filteredFiles.map((file) => {
            const Icon = fileTypeIcons[file.type] || File;
            const colorClass = fileTypeColors[file.type] || 'bg-gray-50 text-gray-500';
            return (
              <button
                key={file.id}
                onClick={() => handleSelectFile(file.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                  selectedFile === file.id
                    ? 'bg-[#F0F4FF] border-[#4F7CFF]/30 shadow-sm'
                    : 'bg-white border-transparent hover:bg-[#F7F8FA] hover:border-[#E5E7EB]'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl ${colorClass} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#111827] truncate">{file.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-[#9CA3AF]">{file.size}</span>
                    <span className="text-[11px] text-[#9CA3AF]">{file.date}</span>
                  </div>
                </div>
                {file.editable && (
                  <Pencil className="w-3.5 h-3.5 text-[#9CA3AF] flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Center: File editor */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F7F8FA]">
        {!selected ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mx-auto mb-4 shadow-sm">
                <FileText className="w-8 h-8 text-[#D1D5DB]" />
              </div>
              <p className="text-sm text-[#9CA3AF]">选择一个文件查看或编辑</p>
              <p className="text-xs text-[#D1D5DB] mt-1">文本文件支持直接在线修改</p>
            </div>
          </div>
        ) : (
          <>
            {/* Editor header */}
            <div className="px-6 py-3 bg-white/80 backdrop-blur-sm border-b border-[#E5E7EB] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl ${fileTypeColors[selected.type] || 'bg-gray-50 text-gray-500'} flex items-center justify-center`}>
                  {(() => {
                    const Icon = fileTypeIcons[selected.type] || File;
                    return <Icon className="w-4 h-4" />;
                  })()}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#111827]">{selected.name}</h3>
                  <p className="text-[11px] text-[#9CA3AF]">
                    {selected.size} · {selected.date}
                    {savedContent[selected.id] ? ' · 已修改' : ''}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {editing ? (
                  <>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium text-[#6B7280] bg-[#F3F4F6] hover:bg-[#E5E7EB] transition-all active-scale"
                    >
                      <X className="w-4 h-4" />
                      取消
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] hover:shadow-md hover:shadow-[#4F7CFF]/20 transition-all active-scale"
                    >
                      <Save className="w-4 h-4" />
                      保存
                    </button>
                  </>
                ) : (
                  <>
                    {selected.editable && (
                      <button
                        onClick={handleStartEdit}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-[#4F7CFF] bg-[#F0F4FF] hover:bg-[#E0E8FF] transition-all active-scale"
                      >
                        <Pencil className="w-4 h-4" />
                        编辑
                      </button>
                    )}
                    <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-[#6B7280] bg-[#F3F4F6] hover:bg-[#E5E7EB] transition-all active-scale">
                      <Download className="w-4 h-4" />
                      下载
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Editor content */}
            <div className="flex-1 overflow-y-auto p-6">
              {isImage(selected.type) ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center p-8 bg-white rounded-2xl border border-[#E5E7EB] max-w-md">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center mx-auto mb-4">
                      <FileImage className="w-10 h-10 text-green-500" />
                    </div>
                    <p className="text-sm font-semibold text-[#111827] mb-1">{selected.name}</p>
                    <p className="text-xs text-[#9CA3AF] mb-4">图片文件不支持文本编辑</p>
                    <div className="w-full h-32 rounded-xl bg-gradient-to-br from-[#F7F8FA] to-[#E5E7EB] flex items-center justify-center">
                      <span className="text-sm text-[#9CA3AF]">图片预览区域</span>
                    </div>
                  </div>
                </div>
              ) : editing ? (
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full h-full min-h-[400px] p-6 bg-white rounded-2xl border border-[#E5E7EB] focus:border-[#4F7CFF]/30 focus:ring-2 focus:ring-[#4F7CFF]/10 outline-none resize-none text-sm text-[#111827] leading-relaxed font-mono shadow-sm"
                  placeholder="输入文件内容..."
                  spellCheck={false}
                />
              ) : (
                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm">
                  <pre className="text-sm text-[#111827] leading-relaxed font-sans whitespace-pre-wrap">
                    {displayContent}
                  </pre>
                  {savedContent[selected.id] && (
                    <div className="mt-4 pt-4 border-t border-[#E5E7EB] flex items-center gap-2 text-xs text-[#9CA3AF]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                      此文件有未保存的修改
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Right: AI panel */}
      {selected && !editing && (
        <aside className="hidden xl:block w-[300px] border-l border-[#E5E7EB] bg-white p-5 flex-shrink-0 overflow-y-auto">
          <div className="flex items-center gap-3 mb-5">
            <div className={`w-10 h-10 rounded-xl ${fileTypeColors[selected.type] || 'bg-gray-50 text-gray-500'} flex items-center justify-center`}>
              {(() => {
                const Icon = fileTypeIcons[selected.type] || File;
                return <Icon className="w-5 h-5" />;
              })()}
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#111827]">{selected.name}</h3>
              <p className="text-[11px] text-[#9CA3AF]">{selected.size} · {selected.date}</p>
            </div>
          </div>

          {selected.summary && (
            <div className="p-4 bg-gradient-to-r from-[#F0F4FF] to-[#F5F0FF] rounded-2xl border border-[#4F7CFF]/10 mb-4">
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#4F7CFF]" />
                <span className="text-xs font-semibold text-[#4F7CFF]">AI 摘要</span>
              </div>
              <p className="text-sm text-[#6B7280] leading-relaxed">{selected.summary}</p>
            </div>
          )}

          {selected.suggestion && (
            <div className="p-4 bg-[#FEF3C7]/30 rounded-2xl border border-[#FDE68A]/50 mb-4">
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span className="text-xs font-semibold text-[#D97706]">AI 建议</span>
              </div>
              <p className="text-sm text-[#92400E] leading-relaxed">{selected.suggestion}</p>
            </div>
          )}

          <div className="space-y-1.5">
            <h4 className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">AI 操作</h4>
            {[
              { icon: FileText, label: '总结这个文件', color: 'text-blue-500' },
              { icon: Sparkles, label: '提取待确认事项', color: 'text-purple-500' },
              { icon: ExternalLink, label: '生成回复', color: 'text-green-500' },
              { icon: FileText, label: '整理成共享记录', color: 'text-amber-500' },
            ].map((action, i) => (
              <button
                key={i}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F7F8FA] transition-all text-sm text-[#111827] active-scale"
              >
                <action.icon className={`w-4 h-4 ${action.color}`} />
                {action.label}
              </button>
            ))}
          </div>
        </aside>
      )}
    </div>
  );
}