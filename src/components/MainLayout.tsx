import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import RightPanel from './RightPanel';
import AISearchBar from './AISearchBar';
import AISearchModal from './AISearchModal';

export default function MainLayout() {
  const location = useLocation();
  const [pageKey, setPageKey] = useState(0);

  useEffect(() => {
    setPageKey((k) => k + 1);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-[#F7F8FA] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-[#E5E7EB]">
          <AISearchBar />
        </div>
        <div key={pageKey} className="flex-1 overflow-y-auto page-enter">
          <Outlet />
        </div>
      </div>
      <RightPanel />
      <AISearchModal />
    </div>
  );
}