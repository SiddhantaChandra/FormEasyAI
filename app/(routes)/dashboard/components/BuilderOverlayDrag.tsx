'use client';
import { FormBlockType } from '@/@types/form-block.type';
import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import React, { useState } from 'react';
import BlockButtonDragOverlay from './BlockButtonDragOverlay';
import { FormBlocks } from '@/lib/form-blocks';

const BuilderOverlayDrag = () => {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (events) => {
      console.log('Item drag', events);
      setDraggedItem(events.active);
    },
    onDragCancel: () => {
      console.log('Item drag cancel');
      setDraggedItem(null);
    },
    onDragEnd: () => {
      console.log('Item drag end');
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;

  let fallBackNode = <div>No block drag</div>;

  const isBlockButtonElement = draggedItem?.data?.current?.isBlockBtnElement;

  if (isBlockButtonElement) {
    const blockType = draggedItem?.data?.current?.blockType as FormBlockType;
    fallBackNode = <BlockButtonDragOverlay formBlock={FormBlocks[blockType]} />;
  }

  return (
    <DragOverlay>
      <div className="opacity-95">{fallBackNode}</div>
    </DragOverlay>
  );
};

export default BuilderOverlayDrag;
