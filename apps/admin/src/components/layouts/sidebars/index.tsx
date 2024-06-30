'use client';

import React, { ReactNode } from 'react';
import {
  Avatar,
  Button,
  ScrollShadow,
  Spacer,
  Tooltip,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { useMediaQuery } from 'usehooks-ts';

import { sectionItemsWithTeams } from './SidebarItems';

import Sidebar from './SidebarTypes';
import { cn } from 'common/src/utils/cn';
import { signOut } from 'common/src/api/auth';
import useUserStore from '../../../store/useUserStore';

interface SidebarLayoutProps {
  children: ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { clearUserProfile } = useUserStore();

  const isCompact = isCollapsed || isMobile;

  const onToggle = React.useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  return (
    <div className='flex h-dvh w-full'>
      <div
        className={cn(
          'relative flex h-full w-72 flex-col !border-r-small border-divider p-6 transition-width',
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
          <span
            className={cn('text-small font-bold uppercase opacity-100', {
              'w-0 opacity-0': isCompact,
            })}
          >
            Acme
          </span>
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
          <Avatar
            isBordered
            className='flex-none'
            size='sm'
            src='https://i.pravatar.cc/150?u=a04258114e29026708c'
          />
          <div
            className={cn('flex max-w-full flex-col', { hidden: isCompact })}
          >
            <p className='truncate text-small font-medium text-default-600'>
              John Doe
            </p>
            <p className='truncate text-tiny text-default-400'>
              Product Designer
            </p>
          </div>
        </div>
        <ScrollShadow className='-mr-6 h-full max-h-full py-6 pr-6'>
          <Sidebar
            defaultSelectedKey='home'
            isCompact={isCompact}
            items={sectionItemsWithTeams}
          />
        </ScrollShadow>
        <Spacer y={2} />
        <div
          className={cn('mt-auto flex flex-col', {
            'items-center': isCompact,
          })}
        >
          <Tooltip
            content='Help & Feedback'
            isDisabled={!isCompact}
            placement='right'
          >
            <Button
              fullWidth
              className={cn(
                'justify-start truncate text-default-500 data-[hover=true]:text-foreground',
                {
                  'justify-center': isCompact,
                }
              )}
              isIconOnly={isCompact}
              startContent={
                isCompact ? null : (
                  <Icon
                    className='flex-none text-default-500'
                    icon='solar:info-circle-line-duotone'
                    width={24}
                  />
                )
              }
              variant='light'
            >
              {isCompact ? (
                <Icon
                  className='text-default-500'
                  icon='solar:info-circle-line-duotone'
                  width={24}
                />
              ) : (
                'Help & Information'
              )}
            </Button>
          </Tooltip>
          <Tooltip content='Log Out' isDisabled={!isCompact} placement='right'>
            <Button
              className={cn(
                'justify-start text-default-500 data-[hover=true]:text-foreground',
                {
                  'justify-center': isCompact,
                }
              )}
              isIconOnly={isCompact}
              onClick={() => {
                signOut();
                clearUserProfile();
              }}
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
      <div className='w-full flex-1 flex-col p-4'>
        <main className='h-full w-full overflow-visible'>
          <div className='flex h-full w-full flex-col gap-4 rounded-medium border-small border-divider'>
            <div className='p-10'>{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
