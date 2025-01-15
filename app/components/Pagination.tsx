import { Button, Flex, Text } from "@radix-ui/themes";
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
  const pagesCount = Math.ceil(itemCount / pageSize);

  if (pagesCount <= 1) {
    return null;
  }

  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currentPage} of {pagesCount}
      </Text>
      <Button variant="soft" disabled={currentPage === 1}>
        <MdOutlineKeyboardDoubleArrowLeft fontSize="18" />
      </Button>
      <Button variant="soft" disabled={currentPage === 1}>
        <MdOutlineKeyboardArrowLeft fontSize="18" />
      </Button>
      <Button variant="soft" disabled={currentPage === pagesCount}>
        <MdOutlineKeyboardArrowRight fontSize="18" />
      </Button>
      <Button variant="soft" disabled={currentPage === pagesCount}>
        <MdOutlineKeyboardDoubleArrowRight fontSize="18" />
      </Button>
    </Flex>
  );
};

export default Pagination;
