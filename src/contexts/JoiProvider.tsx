import { Provider } from 'jotai';
import { ChildProps } from 'src/types/general';
export default function JoiProvider({ children }: ChildProps) {
  return <Provider>{children}</Provider>;
}
