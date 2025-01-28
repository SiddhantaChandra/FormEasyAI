import React from 'react';
import { defaultBackgroundColor } from '@/constants';
import BuilderSidebar from './BuilderSidebar';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import BuilderCanvas from './_common/BuilderCanvas';

const Builder = (props: { isSidebarOpen: boolean }) => {
  return (
    <div>
      <BuilderSidebar />
      <SidebarInset className="!p=0 flex-1">
        <div
          className="w-full h-full"
          style={{
            backgroundColor: defaultBackgroundColor,
          }}
        >
          <SidebarTrigger className="absolute top-0 z-50" />
          <BuilderCanvas />
        </div>
      </SidebarInset>
    </div>
  );
};

export default Builder;
