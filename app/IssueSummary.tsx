"use client";

import { Status } from "@prisma/client";
import { Card, Flex, Grid, Link, Text } from "@radix-ui/themes";
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
    <Grid columns="3" gap="5" width="auto">
      {container.map((summary) => (
        <Card
          style={{ backgroundColor: "var(--accent-4)" }}
          size="3"
          key={summary.status}
        >
          <Flex direction="column" align="center" justify="center" gap="2">
            <Text size="9" weight="medium">
              <CountUp start={0} end={summary.value} duration={0.75} />
            </Text>
            <Link href={`/issues/list?status=${summary.status}`}>
              <IssueStatusBadge
                status={summary.status}
                size="3"
                variant="soft"
              />
            </Link>
          </Flex>
        </Card>
      ))}
    </Grid>
  );
};

export default IssueSummary;
