import { Box, Card, Flex } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const LoadingIssueDetails = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex gap="3" align="center" mt="2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose flex flex-col" mt="4" size="3">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetails;
