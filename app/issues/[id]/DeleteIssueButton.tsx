"use client";

import * as Toast from "@radix-ui/react-toast";
import { AlertDialog, Button, Flex, Spinner, Text } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { MdError } from "react-icons/md";
import styles from "./Toast.module.css";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const handleDeleteIssue = async () => {
    try {
      setDeleting(true);
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
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
      <Toast.Provider swipeDirection="down">
        <Toast.Root
          className={styles.Root}
          open={error}
          onOpenChange={setError}
        >
          <Toast.Title className={styles.Title}>
            <Flex gap="2">
              <MdError className={styles.Icon} size={24} />
              <Text size="2">Deletion Failed</Text>
            </Flex>
          </Toast.Title>
          <Toast.Description asChild>
            <Text className={styles.Description} size="1">
              This issue cannot be deleted. Please try again later.
            </Text>
          </Toast.Description>
          <Toast.Action className={styles.Action} asChild altText="Close Toast">
            <Button
              size="1"
              variant="soft"
              color="gray"
              onClick={() => setError(false)}
            >
              <GrClose />
            </Button>
          </Toast.Action>
        </Toast.Root>
        <Toast.Viewport className={styles.Viewport} />
      </Toast.Provider>
    </>
  );
};

export default DeleteIssueButton;
