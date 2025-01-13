import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex, Heading, Table } from "@radix-ui/themes";
import { GiBugNet } from "react-icons/gi";
import IssueActions from "./IssueActions";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: { status: Status };
}) => {
  const status = Object.values(Status).includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={3} align="center">
                <Flex direction="column" gap="2" align="center">
                  <Heading size="6">Issues not available</Heading>
                  <Heading size="1">
                    Haven&apos;t create an issue? You can create one via
                    &apos;New Issue&apos;.
                  </Heading>
                  <GiBugNet fontSize={50} color="gray" />
                </Flex>
              </Table.Cell>
            </Table.Row>
          ) : (
            issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>{issue.title}</Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
