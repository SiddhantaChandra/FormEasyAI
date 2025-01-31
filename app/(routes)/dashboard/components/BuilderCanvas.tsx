'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Active,
  DragEndEvent,
  useDndMonitor,
  useDroppable,
} from '@dnd-kit/core';
import { useBuilder } from '@/context/builder-provider';
import { FormBlockInstance, FormBlockType } from '@/@types/form-block.type';
import { FormBlocks } from '@/lib/form-blocks';
import { allBlockLayouts } from '@/constants';
import { generateUniqueId } from '@/lib/helper';

const BuilderCanvas = () => {
  const [activeBlock, setActiveBlock] = useState<Active | null>(null);
  const { blockLayouts, addBlockLayout } = useBuilder();

  const droppable = useDroppable({
    id: 'builder-canvas-droppable',
    data: {
      isBuilderCanvasDropArea: true,
    },
  });

  useDndMonitor({
    onDragStart: (e) => {
      setActiveBlock(e.active);
    },
    onDragEnd: (e: DragEndEvent) => {
      console.log('DRAG END', e);
      const { active, over } = e;
      if (!over || !active) return;
      setActiveBlock(null);

      const isBlockButtonElement = active?.data?.current?.isBlockBtnElement;
      const isBlockLayout = active?.data?.current?.blockType;

      const isDraggingOverCanvas = over.data?.current?.isBuilderCanvasDropArea;

      if (
        isBlockButtonElement &&
        allBlockLayouts.includes(isBlockLayout) &&
        isDraggingOverCanvas
      ) {
        const blockType = active?.data?.current?.blockType;
        const newBlockLayout = FormBlocks[
          blockType as FormBlockType
        ].createInstance(generateUniqueId());
        console.log('New Block Layout Instance', newBlockLayout);
        addBlockLayout(newBlockLayout);
        return;
      }
    },
  });

  return (
    <div className="relative w-full h-[calc(100vh_-_65px)] px-5 md:px-0 pt-4 pb-[120px] overflow-auto transition-all duration-300 scrollbar">
      <div className="w-full h-full max-w-[650px] mx-auto">
        {/* {Dropable Canvas} */}
        <div
          ref={droppable.setNodeRef}
          className={cn(
            `w-full relative bg-transparent px-2 rounded-md flex flex-col min-h-svh items-center justify-start pt-1 pb-14
          
         
          `,
            droppable.isOver && 'ring-4 ring-primary/20 ring-inset',
          )}
        >
          <div className="w-full mb-3 bg-white bg-[url(/images/form-bg-1.jpg)] bg-center bg-cover bg-no-repeat border shadow-sm h-[135px] max-w-[768px] rounded-md px-1" />

          {blockLayouts.length > 0 && (
            <div className="flex flex-col w-full gap-4">
              {blockLayouts.map((blockLayout) => (
                <CanvasBLWrapper
                  key={blockLayout.id}
                  blockLayout={blockLayout}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function CanvasBLWrapper({ blockLayout }: { blockLayout: FormBlockInstance }) {
  const CanvasBlockLayout = FormBlocks[blockLayout.blockType].canvasComponent;
  return (
    <div className="relative mb-1">
      <CanvasBlockLayout blockInstance={blockLayout} />
    </div>
  );
}

export default BuilderCanvas;
