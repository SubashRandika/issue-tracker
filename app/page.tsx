import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

const Home = async () => {
  const issueCounts = await prisma.issue.groupBy({
    by: ["status"],
    _count: {
      status: true,
    },
    where: {
      status: {
        in: Object.values(Status),
      },
    },
  });

  const issues = issueCounts.reduce(
    (acc, issue) => ({
      ...acc,
      [issue.status]: issue._count.status,
    }),
    { OPEN: 0, IN_PROGRESS: 0, CLOSED: 0 }
  );

  return (
    <>
      <LatestIssues />
      <IssueSummary
        open={issues[Status.OPEN]}
        inProgress={issues[Status.IN_PROGRESS]}
        closed={issues[Status.CLOSED]}
      />
    </>
  );
};

export default Home;
