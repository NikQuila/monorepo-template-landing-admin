import React from 'react';
import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ScrollShadow,
  Spacer,
  useDisclosure,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import Sidebar from './SidebarTypes';
import useUserStore from '../../../store/useUserStore';
import { cn } from 'common/src/utils/cn';

interface MobileSidebarProps {
  location: string;
  sectionItemsWithTeams: any[];
  onSelect: (key: string) => void;
  onLogout: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  location,
  sectionItemsWithTeams,
  onSelect,
  onLogout,
}) => {
  const { userProfile } = useUserStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const sidebarWidth = 288;

  return (
    <div className='relative '>
      <div className='fixed top-0 right-0 p-4 z-40'>
        <button
          className='shadow-md bg-neutral-50 p-2 rounded-lg'
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
        >
          <Icon
            className='text-default-500'
            height={24}
            icon='solar:hamburger-menu-outline'
            width={24}
          />
        </button>
      </div>
      <Modal
        classNames={{
          base: 'justify-start m-0 p-0 h-dvh max-h-full w-[var(--sidebar-width)] z-[50]',
          wrapper: 'items-start   justify-start !w-[var(--sidebar-width)]',
          body: 'p-0',
          closeButton: 'z-50',
        }}
        isOpen={isOpen}
        motionProps={{
          variants: {
            enter: {
              x: 0,
              transition: {
                duration: 0.3,
                ease: 'easeOut',
              },
            },
            exit: {
              x: -500,
              transition: {
                duration: 0.4,
                ease: 'easeOut',
              },
            },
          },
        }}
        radius='none'
        scrollBehavior='inside'
        style={{
          // @ts-ignore
          '--sidebar-width': `${sidebarWidth}px`,
        }}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalBody>
            <div className='relative flex h-full w-72 flex-1 flex-col p-6'>
              <div className='flex items-center gap-2 px-2'>
                <div className='flex  items-center justify-center rounded-full'>
                  <img
                    src='/full-logo.png'
                    alt='Cherry Market'
                    className={cn('object-contain h-6 opacity-100')}
                  />
                </div>
              </div>
              <Spacer y={8} />
              <div className='flex items-center gap-3 px-3'>
                {/* 
                {userProfile?.exporter?.logo_url ? (
                  <img
                    src={userProfile.exporter.logo_url}
                    alt='Exporter Logo'
                    className='flex-none w-12 h-12 rounded-full border-1 border-default'
                  />
                ) : (
                  <Avatar
                    isBordered
                    className='flex-none'
                    size='sm'
                    name='JD'
                  />
                )} */}
                <Avatar isBordered className='flex-none' size='sm' name='JD' />
                {/*  <div className='flex flex-col'>
                  <p className='text-small font-medium text-default-600'>
                    {userProfile?.first_name} {userProfile?.last_name}
                  </p>
                  <p className='text-tiny text-default-400'>
                    {capitalize(userProfile?.roles[0])}
                  </p>
                </div> */}
              </div>

              <ScrollShadow className='-mr-6 h-full max-h-full py-6 pr-6'>
                <Sidebar
                  selectedKeys={[location.split('/')[1] || 'daily-market']}
                  items={sectionItemsWithTeams}
                  onSelect={onSelect}
                  aria-label='Navigation Menu' // Add aria-label
                />
              </ScrollShadow>

              <Spacer y={8} />
              <div className='mt-auto flex flex-col'>
                <Button
                  className='justify-start text-default-500 data-[hover=true]:text-foreground'
                  startContent={
                    <Icon
                      className='rotate-180 text-default-500'
                      icon='solar:minus-circle-line-duotone'
                      width={24}
                    />
                  }
                  variant='light'
                  onPress={onLogout}
                >
                  Log Out
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MobileSidebar;
