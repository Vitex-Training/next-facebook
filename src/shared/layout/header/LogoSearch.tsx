'use client';

import _ from 'lodash';
import { ArrowLeft, Search, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { AppAvatar, AppAvatarImage } from 'src/shared/components/avatar/AppAvatar';
import { AppButton } from 'src/shared/components/button/AppButton';
import {
  AppCommand,
  AppCommandEmpty,
  AppCommandGroup,
  AppCommandItem,
  AppCommandList,
} from 'src/shared/components/command/AppCommand';
import SearchCommandInput from 'src/shared/components/command/SearchCommandInput';
import {
  AppPopover,
  AppPopoverAnchor,
  AppPopoverClose,
  AppPopoverContent,
  AppPopoverTrigger,
} from 'src/shared/components/popover/AppPopover';
import { filterUsersNotIncludeDeactivate } from 'src/shared/services/firebase/user/filterUsersNotIncludeDeactivate';
import { ClickBtnEventType } from 'src/shared/types/general';
import { UserInfo } from 'src/shared/types/user';
import { getFullName } from 'src/shared/utils/getFullName';

interface UserInfoExtend extends UserInfo {
  numberOfNotification: number;
}

export default function LogoSearch() {
  const router = useRouter();
  const [openInputSearch, setOpenInputSearch] = useState(false);
  const [inputSearchValue, setInputSearchValue] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<UserInfoExtend[]>([]);

  const removeSuggestion = (e: ClickBtnEventType, uid: UserInfo['uid']) => {
    e.stopPropagation();

    const otherSuggestions = searchSuggestions.filter((suggestion) => suggestion.uid !== uid);
    setSearchSuggestions(otherSuggestions);
  };

  const selectUser = (uid: UserInfo['uid']) => {
    setOpenInputSearch(false);
    router.push(`/profile/${uid}`);
  };

  const handleFilter = async (inputSearchValue: string) => {
    const wellFormatSearch = inputSearchValue.toLowerCase();

    const filterFn = (user: UserInfo) => {
      const fullName = getFullName(user);
      return fullName.toLowerCase().includes(wellFormatSearch);
    };
    const filteredUsers = await filterUsersNotIncludeDeactivate(filterFn);

    // hard code for notification of user
    setSearchSuggestions(filteredUsers.map((user) => ({ ...user, numberOfNotification: 2 })));
  };

  const debounceFn = useMemo(() => _.debounce(handleFilter, 300), []);

  // Stop the invocation of the debounced function after unmounting
  useEffect(() => {
    return () => {
      debounceFn.cancel();
    };
  }, [debounceFn]);

  useEffect(() => {
    if (openInputSearch) {
      debounceFn(inputSearchValue);
    }
  }, [inputSearchValue, openInputSearch, debounceFn]);

  return (
    <div className='flex gap-2'>
      <Link href='/'>
        <Image alt='Facebook' height={40} src='/logo/round-logo-40x40.png' width={40} />
      </Link>
      <AppPopover onOpenChange={setOpenInputSearch} open={openInputSearch}>
        <AppPopoverTrigger asChild>
          <div>
            <AppButton
              aria-expanded={openInputSearch}
              className='bg-lightgray text-small-icon-foreground hover:bg-lightgray md:hidden'
              role='combobox'
              size='icon'
              type='button'
              variant='icon'>
              <Search size={20} />
            </AppButton>
            <AppButton className='hidden items-center gap-0 rounded-full p-2 md:flex' type='button' variant='icon'>
              <Search size={16} />
              <span className='px-2 text-muted-foreground'>Tìm kiếm trên Facebook</span>
            </AppButton>
          </div>
        </AppPopoverTrigger>
        <AppPopoverAnchor className='fixed left-0 top-0' />
        <AppPopoverContent align='start' asChild={true} className='w-full px-3 py-0 sm:w-[320px]' side='top'>
          <div className='rounded-none border-none'>
            <AppCommand>
              <div className='flex items-center gap-2'>
                <AppPopoverClose asChild>
                  <AppButton className='bg-transparent hover:bg-lightgray' size='icon' type='button' variant='icon'>
                    <ArrowLeft size={20} />
                  </AppButton>
                </AppPopoverClose>
                <SearchCommandInput
                  inputProps={{
                    autoFocus: true,
                    onValueChange: setInputSearchValue,
                    placeholder: 'Tìm kiếm trên Facebook',
                    value: inputSearchValue,
                  }}
                />
              </div>
              <div className='flex items-center justify-between'>
                <span>Mới đây</span>
                <AppButton
                  className='bg-transparent font-normal text-primary hover:bg-small-icon-accent hover:text-primary-accent'
                  type='button'>
                  Chỉnh sửa
                </AppButton>
              </div>
              <AppCommandList>
                <AppCommandEmpty>Không tìm thấy người dùng</AppCommandEmpty>
                <AppCommandGroup>
                  {searchSuggestions.map((user) => {
                    return (
                      <AppCommandItem
                        asChild
                        key={user.uid}
                        onSelect={() => {
                          selectUser(user.uid);
                        }}
                        value={getFullName(user)}>
                        <div className='flex items-center justify-between gap-2 hover:bg-lightgray'>
                          <div className='flex items-center justify-start gap-2'>
                            <AppAvatar className='size-8'>
                              <AppAvatarImage src={user?.avatar} />
                            </AppAvatar>
                            <div className='flex flex-col'>
                              <span className='text-base font-semibold'>{getFullName(user)}</span>
                              <span className='text-up-xs text-primary-accent'>
                                {user.numberOfNotification}+ thông tin mới
                              </span>
                            </div>
                          </div>
                          <AppButton
                            onClick={(e) => removeSuggestion(e, user.uid)}
                            size='small-icon'
                            type='button'
                            variant='small-icon'>
                            <X size={14} />
                          </AppButton>
                        </div>
                      </AppCommandItem>
                    );
                  })}
                </AppCommandGroup>
              </AppCommandList>
            </AppCommand>
          </div>
        </AppPopoverContent>
      </AppPopover>
    </div>
  );
}
