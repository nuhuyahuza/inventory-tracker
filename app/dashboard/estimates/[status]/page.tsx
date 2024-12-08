import { Metadata } from "next";
import { EstimatesTable } from "@/components/estimates/EstimatesTable";
import { capitalizeFirstLetter } from "@/lib/utils";

type EstimateStatus = "pending" | "approved" | "rejected";

interface EstimateStatusPageProps {
  params: Promise<{
    status: EstimateStatus;
  }>;
}

export async function generateMetadata({ params }: EstimateStatusPageProps): Promise<Metadata> {
  const resolvedParams = await params; // Resolve the promise
  return {
    title: `${capitalizeFirstLetter(resolvedParams.status)} Estimates | Dashboard`,
    description: `View all ${resolvedParams.status} estimates`,
  };
}

export default async function EstimateStatusPage({ params }: EstimateStatusPageProps) {
  const resolvedParams = await params; // Resolve the promise
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          {capitalizeFirstLetter(resolvedParams.status)} Estimates
        </h2>
        <p className="text-muted-foreground">
          View and manage {resolvedParams.status} estimates
        </p>
      </div>

      <EstimatesTable status={resolvedParams.status} />
    </div>
  );
}
