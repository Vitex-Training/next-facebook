import { LucideIcon } from 'lucide-react';
import React from 'react';

export interface ChildProps {
  children: React.ReactNode;
}

export type ClickBtnEventType = React.MouseEvent<HTMLButtonElement, MouseEvent>;
export type ChangeInputEventType = React.ChangeEvent<HTMLInputElement>;

export type NavItem = {
  [key: string]: unknown;
  icon: LucideIcon;
  label: string;
  link: string;
};

export type FileLinkType = {
  link: string;
  metadata: {
    name: string;
  };
};

export type TabItem<T> = {
  comp?: React.ReactElement;
  label: string;
  value: T;
};
