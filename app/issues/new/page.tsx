"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import { createIssueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";
import { MdOutlineBugReport } from "react-icons/md";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onHandleSubmit = handleSubmit(async (data: IssueForm) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setError("An unexpected error occurred.");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onHandleSubmit}>
        <TextField.Root
          variant="surface"
          placeholder="Title"
          color={errors.title ? "red" : undefined}
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE
              className={errors.description ? "validation-failed" : ""}
              placeholder="Description"
              {...field}
            />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          <Spinner loading={isSubmitting}>
            <MdOutlineBugReport size={20} />
          </Spinner>
          Submit New Issue
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
