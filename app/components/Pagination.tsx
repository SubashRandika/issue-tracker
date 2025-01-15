"use client";

import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pagesCount = Math.ceil(itemCount / pageSize);

  if (pagesCount <= 1) {
    return null;
  }

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currentPage} of {pagesCount}
      </Text>
      <Button
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <MdOutlineKeyboardDoubleArrowLeft fontSize="18" />
      </Button>
      <Button
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <MdOutlineKeyboardArrowLeft fontSize="18" />
      </Button>
      <Button
        variant="soft"
        disabled={currentPage === pagesCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <MdOutlineKeyboardArrowRight fontSize="18" />
      </Button>
      <Button
        variant="soft"
        disabled={currentPage === pagesCount}
        onClick={() => changePage(pagesCount)}
      >
        <MdOutlineKeyboardDoubleArrowRight fontSize="18" />
      </Button>
    </Flex>
  );
};

export default Pagination;
