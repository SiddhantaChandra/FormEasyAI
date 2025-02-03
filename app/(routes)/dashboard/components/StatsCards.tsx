import { fetchFormStats } from '@/actions/form.action';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader } from 'lucide-react';
import React from 'react';

const StatsCards = (props: {
  data: Awaited<ReturnType<typeof fetchFormStats>>;
  loading: boolean;
}) => {
  const { loading, data } = props;
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grids-cols-4 lg:grid-cols-2 xl:grid-cols-4">
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardDescription>Total Forms</CardDescription>
          <CardTitle className="text-4xl">
            {loading ? <Skeleton className="h-10" /> : data?.totalForms || 0}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            All forms created on your account
          </p>
        </CardContent>
      </Card>

      {/* Responses */}
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardDescription>Total Responses</CardDescription>
          <CardTitle className="text-4xl">
            {loading ? (
              <Skeleton className="h-10" />
            ) : (
              data?.totalResponses || 0
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            Responses submitted on your forms
          </p>
        </CardContent>
      </Card>
      {/* {Conversion Rate} */}
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardDescription>Conversion Rates</CardDescription>
          <CardTitle className="text-4xl">
            {loading ? (
              <Skeleton className="h-10" />
            ) : (
              <>{data?.conversionRate?.toFixed(1)}%</>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            Percentage of views that resulted in responses
          </p>
        </CardContent>
      </Card>
      {/* {Engagement Rate} */}
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardDescription>Engagement Rates</CardDescription>
          <CardTitle className="text-4xl">
            {loading ? (
              <Skeleton className="h-10" />
            ) : (
              <>{data?.engagementRate?.toFixed(1)}%</>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            Rate of forms that recieved responses
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
