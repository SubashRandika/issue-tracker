import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { GrEdit } from "react-icons/gr";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
      <GrEdit size={16} />
      <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
    </Button>
  );
};

export default EditIssueButton;
