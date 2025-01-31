'use client';
import React, { useState } from 'react';
import { Loader } from 'lucide-react';
import { DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SidebarProvider } from '@/components/ui/sidebar';
import Builder from './Builder';
import { useBuilder } from '@/context/builder-provider';
import BuilderOverlayDrag from './BuilderOverlayDrag';

const FormBuilder = () => {
  const { formData, loading } = useBuilder();
  const isPublished = formData?.publish;
  if (loading) {
    <div className="w-full flex h-56 items-center justify-center">
      <Loader size="3rem" className="animate-spin" />
    </div>;
  }
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    isPublished ? false : true,
  );

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 8,
    },
  });
  return (
    <div>
      <DndContext sensors={useSensors(mouseSensor)}>
        <BuilderOverlayDrag />
        <SidebarProvider
          open={isSidebarOpen}
          onOpenChange={setIsSidebarOpen}
          className="h-[calc(100vh_-_64px)]"
          style={
            {
              '--sidebar-width': '300px',
              '--sidebar-height': '40px',
              // display: 'block',
            } as React.CSSProperties
          }
        >
          <Builder {...{ isSidebarOpen }} />
        </SidebarProvider>
      </DndContext>
    </div>
  );
};

export default FormBuilder;
