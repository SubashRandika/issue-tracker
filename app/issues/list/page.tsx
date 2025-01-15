import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Box, Flex } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const status = Object.values(Status).includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = {
    status,
  };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issuesCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="4">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Box className="self-end">
        <Pagination
          itemCount={issuesCount}
          pageSize={pageSize}
          currentPage={page}
        />
      </Box>
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
