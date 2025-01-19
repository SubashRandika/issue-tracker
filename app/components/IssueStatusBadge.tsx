import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({
  status,
  size = "1",
  variant = "soft",
}: {
  status: Status;
  size?: "1" | "2" | "3";
  variant?: "solid" | "soft" | "surface" | "outline";
}) => {
  return (
    <Badge color={statusMap[status].color} size={size} variant={variant}>
      {statusMap[status].label}
    </Badge>
  );
};

export default IssueStatusBadge;
