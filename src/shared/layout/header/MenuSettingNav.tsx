'use client';

import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Bell, ChevronDown, Menu, MessageCircleMore } from 'lucide-react';
import CurrUserAvatar from 'src/shared/components/avatar/CurrUserAvatar';
import { AppBadgeSticker, AppBadgeStickerContent } from 'src/shared/components/badge-sticker/AppBadgeSticker';
import { AppButton } from 'src/shared/components/button/AppButton';
import {
  AppDropdownMenu,
  AppDropdownMenuContent,
  AppDropdownMenuLabel,
  AppDropdownMenuTrigger,
} from 'src/shared/components/dropdown-menu/AppDropdownMenu';
import TooltipWrapper from 'src/shared/components/tooltip/TooltipWrapper';

import ChatsNotices from './menu-settings/ChatsNotices';
import MenuNav from './menu-settings/MenuNav';
import Notifications from './menu-settings/Notifications';
import UserSettingNav from './menu-settings/UserSettingNav';

const CurrUserAvatarWithBarge = () => {
  return (
    <div aria-expanded={false} aria-label='Trang cá nhân của bạn' role='button' tabIndex={1}>
      <AppBadgeSticker>
        <AppBadgeStickerContent>
          <div className='rounded-full border-2 bg-lightgray'>
            <ChevronDown size={10} />
          </div>
        </AppBadgeStickerContent>
        <CurrUserAvatar />
      </AppBadgeSticker>
    </div>
  );
};

const menuSettings = [
  { dropdownComp: MenuNav, iconComp: Menu, isButton: true, label: 'Menu' },
  { dropdownComp: ChatsNotices, iconComp: MessageCircleMore, isButton: true, label: 'Messenger' },
  { dropdownComp: Notifications, iconComp: Bell, isButton: true, label: 'Thông báo' },
  {
    dropdownComp: UserSettingNav,
    iconComp: CurrUserAvatarWithBarge,
    isButton: false,
    label: 'Cài đặt và kiểm soát tài khoản',
  },
];

export default function MenuSettingNav() {
  return (
    <div aria-label='Cài đặt và kiểm soát tài khoản' className='flex items-center gap-2'>
      {menuSettings.map((menuSetting, i) => {
        const Icon = menuSetting.iconComp;
        const Content = menuSetting.dropdownComp;
        return (
          <AppDropdownMenu key={i}>
            {menuSetting.isButton ? (
              <AppDropdownMenuTrigger asChild>
                {/* this div for prevent handler  collision  */}
                <div>
                  <TooltipWrapper tooltipContent={menuSetting.label}>
                    <AppButton size='icon' type='button' variant='icon'>
                      <Icon size={20} />
                    </AppButton>
                  </TooltipWrapper>
                </div>
              </AppDropdownMenuTrigger>
            ) : (
              <AppDropdownMenuTrigger>
                <Icon />
              </AppDropdownMenuTrigger>
            )}
            <AppDropdownMenuContent align='end'>
              <VisuallyHidden.Root>
                <AppDropdownMenuLabel>{menuSetting.label}</AppDropdownMenuLabel>
              </VisuallyHidden.Root>
              <div className='p-2'>
                <Content />
              </div>
            </AppDropdownMenuContent>
          </AppDropdownMenu>
        );
      })}
    </div>
  );
}
