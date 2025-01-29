'use client';

import { FormWithSettings } from '@/@types/form.types';
import { useParams } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

type BuilderContextType = {
  loading: boolean;
  formData: FormWithSettings | null;
  setFormData: React.Dispatch<React.SetStateAction<FormWithSettings | null>>;

  blocks: [];
  setBlocks: React.Dispatch<React.SetStateAction<[]>>;
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
  const [blocks, setBlocks] = useState<any>([]);

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
            setBlocks(parsedBlocks);
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
  return (
    <BuilderContext.Provider
      value={{
        loading,
        formData,
        setFormData,
        blocks,
        setBlocks,
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
