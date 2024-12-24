import React, { ReactNode } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { useLocation } from 'wouter';
import useUserStore from '../../../store/useUserStore';
import { signOut } from 'common/src/api/auth';
import { sectionItemsWithTeams } from './SidebarItems';
import DesktopSidebar from './DesktopSidebar';
import MobileSidebar from './MobileSidebar';

interface SidebarLayoutProps {
  children: ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const { userProfile, clearUserProfile } = useUserStore();
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const [location, setLocation] = useLocation();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const onToggle = React.useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const onSelect = (key: string) => {
    const item = sectionItemsWithTeams.find((item) => item.key === key);
    if (item && item.href) {
      setLocation(item.href);
    }
  };

  const onLogout = () => {
    signOut();
    clearUserProfile();
  };

  return (
    <div className='flex h-dvh w-full bg-white'>
      {isMobile ? (
        <div className=''>
          <MobileSidebar
            location={location}
            sectionItemsWithTeams={sectionItemsWithTeams}
            onSelect={onSelect}
            onLogout={onLogout}
          />
        </div>
      ) : (
        <div className=''>
          <DesktopSidebar
            isCollapsed={isCollapsed}
            location={location}
            sectionItemsWithTeams={sectionItemsWithTeams}
            onToggle={onToggle}
            onSelect={onSelect}
            onLogout={onLogout}
          />
        </div>
      )}
      <div className='w-full flex-1 flex-col overflow-auto'>
        <main className='h-full w-full overflow-visible'>
          <div className='flex h-full w-full flex-col gap-4 rounded-medium'>
            <div className=''>{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
