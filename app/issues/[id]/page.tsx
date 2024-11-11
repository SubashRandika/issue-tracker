import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Heading, Text, Flex, Card } from "@radix-ui/themes";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

  if (!issue) {
    notFound();
  }

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" align="center" mt="2">
        <IssueStatusBadge status={issue.status} />
        <Text size="2">{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card mt="3" size="3">
        {issue.description}
      </Card>
    </div>
  );
};

export default IssueDetailsPage;
