import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { GrEdit } from "react-icons/gr";
import { FaPencil } from "react-icons/fa6";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex gap="3" align="center" mt="2">
          <IssueStatusBadge status={issue.status} />
          <Text size="2">{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose" mt="4" size="3">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <GrEdit size={16} />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
