import React from 'react';

export interface ChildProps {
  children: React.ReactNode;
}

export type ClickBtnEventType = React.MouseEvent<HTMLButtonElement, MouseEvent>;
