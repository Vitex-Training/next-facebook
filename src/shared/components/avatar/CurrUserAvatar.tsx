import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { useAtomValue } from 'jotai';
import { currUserAtom } from 'src/shared/states/auth';

import { AppAvatar, AppAvatarImage } from './AppAvatar';

export default function CurrUserAvatar({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>) {
  const currUser = useAtomValue(currUserAtom)!;

  return (
    <AppAvatar {...{ className, ...props }}>
      <AppAvatarImage alt={currUser.firstName} src={currUser?.avatar} />
    </AppAvatar>
  );
}
