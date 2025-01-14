"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

type FilterStatus = Status | "ALL";

const statuses: { label: string; value: FilterStatus }[] = [
  { label: "All", value: "ALL" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderBy = searchParams.get("orderBy");

  const onStatusChange = (status: FilterStatus) => {
    const params = new URLSearchParams();

    if (status && status !== "ALL") {
      params.append("status", status);
    }

    if (orderBy) {
      params.append("orderBy", orderBy);
    }

    const query = params.size ? `?${params.toString()}` : "";
    router.push(`/issues/list${query}`);
  };

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || "ALL"}
      onValueChange={onStatusChange}
    >
      <Select.Trigger placeholder="Filter status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
