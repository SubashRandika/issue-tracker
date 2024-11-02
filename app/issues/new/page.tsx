"use client";

import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { Controller, useForm } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";

interface NewIssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<NewIssueForm>();
  const router = useRouter();

  const onCreateIssue = async (data: NewIssueForm) => {
    await axios.post("/api/issues", data);
    router.push("/issues");
  };

  return (
    <form className="max-w-xl space-y-3" onSubmit={handleSubmit(onCreateIssue)}>
      <TextField.Root
        variant="surface"
        placeholder="Title"
        {...register("title")}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />

      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
