"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createArticleSummary } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <div>
      <Button type="submit" disabled={pending} className="w-28">
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading
          </>
        ) : (
          "Summarize"
        )}
      </Button>
    </div>
  );
}

function URLInput() {
  const { pending } = useFormStatus();

  return (
    <Input
      type="url"
      name="url"
      placeholder="Enter article URL"
      required
      disabled={pending}
    />
  );
}

export function AddForm() {
  // useActionState is available with React 19 (Next.js App Router)
  const [state, formAction] = useActionState(
    createArticleSummary,
    initialState
  );

  return (
    <form action={formAction}>
      <div className="flex gap-2">
        <URLInput />
        <SubmitButton />
      </div>
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
