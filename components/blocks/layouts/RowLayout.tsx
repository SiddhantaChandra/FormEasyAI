import {
  ObjectBlockType,
  FormBlockType,
  FormCategoryType,
} from '@/@types/form-block.type';
import { Rows2 } from 'lucide-react';

const blockType: FormBlockType = 'RowLayout';
const blockCategory: FormCategoryType = 'Layout';

export const RowLayoutBlock: ObjectBlockType = {
  blockType,
  blockCategory,

  createInstance: (id: string) => ({
    id: `row-layout-${id}`,
    blockType,
    isLocked: false,
    attributes: {},
    childblocks: [],
  }),

  blockBtnElement: {
    icon: Rows2,
    label: 'Row Layout',
  },

  canvasComponent: RowLayoutCanvasComponent,
  formComponent: RowLayoutFormComponent,
  propertiesComponent: RowLayoutPropertiesComponent,
};

function RowLayoutCanvasComponent() {
  return <div>Canvas Comp</div>;
}

function RowLayoutFormComponent() {
  return <div>Form Comp</div>;
}

function RowLayoutPropertiesComponent() {
  return <div>Properties Comp</div>;
}
