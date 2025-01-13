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
  const filteredStatus = searchParams.get("status") ?? "ALL";

  const onStatusChange = (status: FilterStatus) => {
    if (status === "ALL") {
      router.push("/issues/list");
    } else {
      router.push(`/issues/list?status=${status}`);
    }
  };

  return (
    <Select.Root
      defaultValue={
        Object.values(Status).includes(filteredStatus as Status)
          ? (filteredStatus as Status)
          : "ALL"
      }
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
