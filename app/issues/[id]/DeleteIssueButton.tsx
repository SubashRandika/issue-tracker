"use client";

import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [isDeleting, setDeleting] = useState(false);

  const handleDeleteIssue = async () => {
    toast.promise(
      async () => {
        setDeleting(true);
        await axios.delete(`/api/issues/${issueId}`);
      },
      {
        loading: "Deleting Issue...",
        success: () => {
          setDeleting(false);
          router.push("/issues/list");
          router.refresh();
          return "Issue is successfully deleted";
        },
        error: (err) => {
          setDeleting(false);
          return "Error while deleting the issue";
        },
      }
    );
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting}>
            <Spinner loading={isDeleting}>
              <FaTrashAlt size={16} />
            </Spinner>
            {isDeleting ? "Deleting Issue" : "Delete Issue"}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Delete Issue</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure want to delete this issue? Once deleted you cannot
            undone.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={handleDeleteIssue}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <Toaster />
    </>
  );
};

export default DeleteIssueButton;
