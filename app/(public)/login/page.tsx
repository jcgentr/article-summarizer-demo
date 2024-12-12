"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, LogIn } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { login } from "./actions";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin mr-1" />
          Logging in...
        </>
      ) : (
        <>
          <LogIn className="mr-1 h-4 w-4" />
          Log in
        </>
      )}
    </Button>
  );
}

function EmailInput() {
  const { pending } = useFormStatus();

  return (
    <Input id="email" name="email" type="email" required disabled={pending} />
  );
}

function PasswordInput() {
  const { pending } = useFormStatus();

  return (
    <Input
      id="password"
      name="password"
      type="password"
      required
      disabled={pending}
    />
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <div>
      <form action={formAction} className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Log in</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and password below to log in
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <EmailInput />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <PasswordInput />
        </div>
        <div className="flex space-x-2 justify-between">
          <SubmitButton />
        </div>
      </form>
      <p
        aria-live="polite"
        role="status"
        className="mt-4 text-sm text-red-600 h-6"
      >
        {state?.message}
      </p>
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
