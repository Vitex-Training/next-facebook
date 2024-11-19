import { Provider } from 'jotai';
export default function JoiProvider({ children }: ChildProps) {
  return <Provider>{children}</Provider>;
}
