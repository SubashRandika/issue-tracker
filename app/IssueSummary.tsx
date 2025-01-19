"use client";

import { Status } from "@prisma/client";
import { Card, Flex, Link, Text } from "@radix-ui/themes";
import CountUp from "react-countup";
import { IssueStatusBadge } from "./components";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const container: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    {
      label: "Open Issues",
      value: open,
      status: "OPEN",
    },
    {
      label: "In Progress Issues",
      value: inProgress,
      status: "IN_PROGRESS",
    },
    {
      label: "Closed Issues",
      value: closed,
      status: "CLOSED",
    },
  ];

  return (
    <Flex gap="3" align="start">
      {container.map((summary) => (
        <Card className="bg-teal-100" size="3" key={summary.status}>
          <Flex direction="column" align="center" justify="center" gap="2">
            <Text size="9" weight="medium" className="text-gray-900">
              <CountUp start={0} end={summary.value} duration={0.75} />
            </Text>
            <Link href={`/issues/list?status=${summary.status}`} color="cyan">
              <IssueStatusBadge
                status={summary.status}
                size="3"
                variant="outline"
              />
            </Link>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
