import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

const Home = async () => {
  const open = await prisma.issue.findMany({
    where: {
      status: "OPEN",
    },
  });

  const inProgress = await prisma.issue.findMany({
    where: {
      status: "IN_PROGRESS",
    },
  });

  const closed = await prisma.issue.findMany({
    where: {
      status: "CLOSED",
    },
  });

  return (
    <>
      <LatestIssues />
      <IssueSummary
        open={open.length}
        inProgress={inProgress.length}
        closed={closed.length}
      />
    </>
  );
};

export default Home;
