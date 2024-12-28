import { Button } from "@radix-ui/themes";
import { FaTrashAlt } from "react-icons/fa";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button color="red">
      <FaTrashAlt size={16} />
      Delete Issue
    </Button>
  );
};

export default DeleteIssueButton;
