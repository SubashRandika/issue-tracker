import { Flex } from "@radix-ui/themes";
import React from "react";
import Skeleton from "@/app/components/Skeleton";

const IssueFormSkeleton = () => {
  return (
    <Flex className="max-w-xl" direction="column" gap="2">
      <Skeleton height="2rem" />
      <Skeleton height="23rem" />
    </Flex>
  );
};

export default IssueFormSkeleton;
