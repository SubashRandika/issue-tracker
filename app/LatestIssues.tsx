import prisma from "@/prisma/client";
import {
  Avatar,
  Box,
  Card,
  Flex,
  Heading,
  Link,
  Separator,
  Text,
} from "@radix-ui/themes";
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
      <Heading mx="3" mt="1" mb="3">
        Latest Issues
      </Heading>
      <Box px="3">
        <Separator orientation="horizontal" size="4" />
        {latesIssues.map((issue, index) => (
          <Flex direction="column" key={issue.id} gap="3" mt="2">
            <Flex align="center" gap="2">
              <Avatar
                size="3"
                src={issue.assignedToUser?.image!}
                fallback="?"
                radius="full"
              />
              <Flex direction="column" gap="1" align="start">
                <Link href={`/issues/${issue.id}`} color="blue">
                  <Text size="2">{issue.title}</Text>
                </Link>
                <IssueStatusBadge status={issue.status} />
              </Flex>
            </Flex>
            {index !== latesIssues.length - 1 && (
              <Separator orientation="horizontal" size="4" />
            )}
          </Flex>
        ))}
      </Box>
    </Card>
  );
};

export default LatestIssues;
