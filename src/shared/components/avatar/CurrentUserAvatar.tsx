import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from 'src/shared/states/auth';

import { AppAvatar, AppAvatarImage } from './AppAvatar';

export default function CurrentUserAvatar({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>) {
  const currentUser = useAtomValue(currentUserAtom)!;

  return (
    <AppAvatar {...{ className, ...props }}>
      <AppAvatarImage alt={currentUser.firstName} src={currentUser?.avatar} />
    </AppAvatar>
  );
}
