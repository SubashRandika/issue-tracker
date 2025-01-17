import { IssueStatusBadge } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { Flex, Heading, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { GiBugNet } from "react-icons/gi";
import { HiSortAscending } from "react-icons/hi";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column.value,
                  },
                }}
              >
                {column.label}
                {searchParams && column.value === searchParams.orderBy && (
                  <HiSortAscending
                    fontSize="20"
                    className="inline ml-1"
                    color="teal"
                  />
                )}
              </NextLink>
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {issues.length === 0 ? (
          <Table.Row>
            <Table.Cell colSpan={3} align="center">
              <Flex direction="column" gap="2" align="center">
                <Heading size="6">Issues not available</Heading>
                <Heading size="1">
                  Haven&apos;t create an issue? You can create one via &apos;New
                  Issue&apos;.
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
                {new Intl.DateTimeFormat("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                }).format(new Date(issue.createdAt))}
              </Table.Cell>
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table.Root>
  );
};

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
