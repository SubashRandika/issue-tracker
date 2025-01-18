import prisma from "@/prisma/client";
import {
  Avatar,
  Card,
  Flex,
  Heading,
  Link,
  Table,
  Text,
} from "@radix-ui/themes";
import { FiExternalLink } from "react-icons/fi";
import { IssueStatusBadge } from "./components";

const LatestIssues = async () => {
  const latesIssues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>
              <Heading>Latest Issues</Heading>
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {latesIssues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell p="2">
                <Flex align="center" gap="3">
                  <Avatar
                    size="3"
                    src={issue.assignedToUser?.image!}
                    fallback="?"
                    radius="full"
                  />
                  <Flex direction="column" gap="2" align="start">
                    <Link href={`/issues/${issue.id}`} color="blue">
                      <Flex align="center" gap="1">
                        <Text>{issue.title}</Text>
                        <FiExternalLink />
                      </Flex>
                    </Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
