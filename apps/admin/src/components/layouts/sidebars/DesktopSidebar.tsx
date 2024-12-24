import React from 'react';
import {
  Avatar,
  Button,
  ScrollShadow,
  Spacer,
  Tooltip,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';

import Sidebar from './SidebarTypes';
import { cn } from 'common/src/utils/cn';
import useUserStore from '../../../store/useUserStore';

interface DesktopSidebarProps {
  isCollapsed: boolean;
  location: string;
  sectionItemsWithTeams: any[];
  onToggle: () => void;
  onSelect: (key: string) => void;
  onLogout: () => void;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  isCollapsed,
  location,
  sectionItemsWithTeams,
  onToggle,
  onSelect,
  onLogout,
}) => {
  const isCompact = isCollapsed;
  const { userProfile } = useUserStore();

  return (
    <div
      className={cn(
        'sticky top-0 flex h-screen w-72 flex-col !border-r-small border-divider p-6 transition-width bg-white',
        {
          'w-16 items-center px-2 py-6': isCompact,
        }
      )}
    >
      <div
        className={cn('flex items-center justify-between gap-3 px-3', {
          'justify-center gap-0': isCompact,
        })}
      >
        <img
          src='/full-logo.png'
          alt='Cherry Market'
          className={cn('object-contain h-6 opacity-100', {
            'w-0 opacity-0': isCompact,
          })}
        />
        <Button isIconOnly size='sm' variant='light' onPress={onToggle}>
          <Icon
            className='text-default-500'
            height={24}
            icon='eva:menu-outline'
            width={24}
          />
        </Button>
      </div>
      <Spacer y={8} />
      <div className='flex items-center gap-3 px-3'>
        {/*  {userProfile?.exporter?.logo_url && !isCompact ? (
          <img
            src={userProfile.exporter.logo_url}
            alt='Exporter Logo'
            className='flex-none w-12 h-12 rounded-full border-1 border-default'
          />
        ) : (
          <Avatar isBordered className='flex-none' size='sm' name='SA' />
        )}  */}
        <Avatar isBordered className='flex-none' size='sm' name='SA' />
        {/*   <div className={cn('flex max-w-full flex-col', { hidden: isCompact })}>
          <p className='truncate text-small font-medium text-default-600'>
            {userProfile?.first_name} {userProfile?.last_name}
          </p>
          <p className='truncate text-tiny text-default-400'>
            {capitalize(userProfile?.roles[0])}
          </p>
        </div> */}
      </div>
      <ScrollShadow className='-mr-6 h-full max-h-full py-6 pr-6'>
        <Sidebar
          selectedKeys={[location.split('/')[1] || 'daily-market']}
          isCompact={isCompact}
          items={sectionItemsWithTeams}
          onSelect={onSelect}
        />
      </ScrollShadow>
      <Spacer y={2} />
      <div
        className={cn('mt-auto flex flex-col', {
          'items-center': isCompact,
        })}
      >
        <Tooltip content='Log Out' isDisabled={!isCompact} placement='right'>
          <Button
            className={cn(
              'justify-start text-default-500 data-[hover=true]:text-foreground',
              {
                'justify-center': isCompact,
              }
            )}
            isIconOnly={isCompact}
            onClick={onLogout}
            startContent={
              isCompact ? null : (
                <Icon
                  className='flex-none rotate-180 text-default-500'
                  icon='solar:minus-circle-line-duotone'
                  width={24}
                />
              )
            }
            variant='light'
          >
            {isCompact ? (
              <Icon
                className='rotate-180 text-default-500'
                icon='solar:minus-circle-line-duotone'
                width={24}
              />
            ) : (
              'Log Out'
            )}
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default DesktopSidebar;
