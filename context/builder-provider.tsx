'use client';

import { FormBlockInstance } from '@/@types/form-block.type';
import { FormWithSettings } from '@/@types/form.type';
import { useParams } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

type BuilderContextType = {
  loading: boolean;
  formData: FormWithSettings | null;
  setFormData: React.Dispatch<React.SetStateAction<FormWithSettings | null>>;

  blockLayouts: FormBlockInstance[];
  setBlockLayouts: React.Dispatch<React.SetStateAction<FormBlockInstance[]>>;
  addBlockLayout: (blockLayout: FormBlockInstance) => void;
};

export const BuilderContext = createContext<BuilderContextType | null>(null);

export default function BuilderContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const formId = params.formId as string;

  const [formData, setFormData] = useState<FormWithSettings | null>(null);

  const [loading, setLoading] = useState(true);
  const [blockLayouts, setBlockLayouts] = useState<FormBlockInstance[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (!formId) {
          console.error('Form ID is missing from route parameters');
          return;
        }
        const response = await fetch(`/api/fetchFormById?formId=${formId}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch form');
        }

        const { data } = await response.json();
        const { form } = data;
        if (form) {
          console.log(form, 'form useeffect');
          setFormData(form);

          // Parse `blocks` from the form's `jsonBlocks`
          if (form.jsonBlocks) {
            const parsedBlocks = JSON.parse(form.jsonBlocks);
            setBlockLayouts(parsedBlocks);
          }
        }
      } catch (error) {
        console.error('Error fetching form:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [formId]);

  const addBlockLayout = (blockLayout: FormBlockInstance) => {
    setBlockLayouts((previous) => {
      const updatedBlock = [...previous];
      updatedBlock.push(blockLayout);
      return updatedBlock;
    });
  };

  return (
    <BuilderContext.Provider
      value={{
        loading,
        formData,
        setFormData,
        blockLayouts,
        setBlockLayouts,
        addBlockLayout,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('Use context inside the provider');
  }
  return context;
}
