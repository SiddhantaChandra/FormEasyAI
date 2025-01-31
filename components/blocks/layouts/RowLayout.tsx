import {
  ObjectBlockType,
  FormBlockType,
  FormCategoryType,
  FormBlockInstance,
} from '@/@types/form-block.type';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Copy, GripHorizontal, Rows2, Trash2Icon } from 'lucide-react';

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

function RowLayoutCanvasComponent({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) {
  const childBlocks = blockInstance.childblocks || [];
  return (
    <div className="max-w-full">
      {blockInstance.isLocked && <Border />}
      <Card
        className={cn(
          `w-full bg-white relative border shadow-sm min-h-[120px] max-w-[768px] rounded-md !p-0 `,
          blockInstance.isLocked && '!rounded-t-none',
        )}
      >
        <CardContent className="px-2 pb-2">
          {!blockInstance.isLocked && (
            <div
              role="button"
              className="flex items-center w-full h-[24px] cursor-move justify-center"
            >
              <GripHorizontal size="20px" className="text-gray-400" />
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {childBlocks?.length === 0 ? (
              <Placeholder />
            ) : (
              <div className="flex w-full flex-col items-center justify-center gap-1 py-4 px-3">
                <div className="flex items-center justify-center gap-1">
                  {/* {childBlock} */}
                </div>
              </div>
            )}
          </div>
        </CardContent>
        {!blockInstance.isLocked && (
          <CardFooter className="flex items-center gap-3 justify-end border-t py-3">
            <Button variant="outline" size="icon">
              <Copy />
            </Button>
            <Button variant="outline" size="icon">
              <Trash2Icon />
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

function RowLayoutFormComponent() {
  return <div>Form Comp</div>;
}

function RowLayoutPropertiesComponent() {
  return <div>Properties Comp</div>;
}

function Border() {
  return <div className="w-full rounded-t-md min-h-[8px] bg-primary" />;
}

function Placeholder() {
  return (
    <div className="flex flex-col items-center justify-center border border-dotted border-primary bg-primary/10 hover:bg-primary/5 w-full h-28 text-primary font-medium text-base gap-1 rounded-md">
      <p className="text-center text-primary/80">
        Drag and drop a field here to get started
      </p>
    </div>
  );
}
