import { fetchAllForms, fetchFormStats } from '@/actions/form.action';
import { Button } from '@/components/ui/button';
import { Loader, PlusIcon } from 'lucide-react';
import React, { Suspense } from 'react';
import StatsCards from './components/StatsCards';
import { Separator } from '@/components/ui/separator';
import CreateForm from './components/CreateForm';
import { Item } from '@radix-ui/react-dropdown-menu';
import FormItem from './components/_common/FormItem';

const Dashboard = () => {
  return (
    <div className="w-full pt-8">
      <div className="w-full max-w-6xl mx-auto px-2 md:px-0 pt-1">
        <section className="stats-section w-full">
          <div className="w-full flex items-center justify-between py-5">
            <h2 className="text-3xl font-semibold tracking-tight">Dashboard</h2>
            <CreateForm />
          </div>
          <StatsListWrap />
        </section>
        <div className="mt-10">
          <Separator className="" />
        </div>
        {/* {All FORM} */}
        <section className="w-full pt-7 pb-10">
          <div className="w-full flex items-center mb-4">
            <h5 className="text-xl font-semibold tracking-tight">All Forms</h5>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-3 xlg:grid-cols-3">
            <Suspense
              fallback={[1, 2, 3, 4].map((item) => (
                <Loader size="3rem" className="animate-spin" />
              ))}
            >
              <FormsList />
            </Suspense>
          </div>

          {/* <div className="flex items-center justify-center">
            No forms have been created.
          </div> */}
        </section>
      </div>
    </div>
  );
};

async function StatsListWrap() {
  const stats = await fetchFormStats();
  return <StatsCards loading={false} data={stats} />;
}

async function FormsList() {
  const { form } = await fetchAllForms();

  return (
    <div>
      {form?.map((item, i) => (
        <FormItem
          key={i}
          id={item.id}
          formId={item.formId}
          name={item.name}
          publish={item.publish}
          createdAt={item.createdAt}
          responses={item.responses}
          views={item.views}
          formBackgroundColor={item.settings.formBackgroundColor}
        />
      ))}
    </div>
  );
}

export default Dashboard;
