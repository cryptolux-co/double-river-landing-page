import type React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@components/label";
import { Input } from "@components/input";
import { Textarea } from "@components/textarea";
import { cn } from "@utils/cn";
import { Checkbox } from "@components/checkbox";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { QueryClient, QueryClientProvider, useMutation } from "react-query";

const ErrorMessage: React.FC<
  Omit<React.ComponentPropsWithoutRef<"span">, "children"> & {
    message: unknown;
  }
> = ({ className, ...props }) => {
  if (typeof props.message !== "string") return null;

  return (
    <span className={cn("text-sm text-destructive", className)} {...props}>
      {props.message}
    </span>
  );
};

const RequiredStar: React.FC = () => (
  <span className="font-bold text-destructive" aria-hidden="true">
    *
  </span>
);

const formSchema = z.object({
  fullName: z
    .string({
      required_error: "Please enter your name",
    })
    .trim()
    .min(2, "Your name must be at least 2 characters long")
    .max(100, "Your name must be less than 100 characters long"),
  email: z
    .string({
      required_error: "Please enter your email address",
    })
    .email("Please enter a valid email address"),
  subject: z
    .string({
      required_error: "Please enter a subject",
    })
    .trim()
    .min(2, "Your subject must be at least 2 characters long")
    .max(100, "Your subject must be less than 100 characters long"),
  message: z
    .string({
      required_error: "Please enter a message",
    })
    .trim()
    .min(2, "Your message must be at least 2 characters long")
    .max(1000, "Your message must be less than 1000 characters long"),
  acceptTerms: z.boolean().refine((accepted) => accepted, {
    message: "You must accept the terms and conditions",
    path: ["acceptTerms"],
  }),
});
type FormSchema = z.infer<typeof formSchema>;

type Props = {
  section: "investments" | "capital" | "impact";
};

const emails = {
  investments: "investments@doubleriver.com",
  capital: "capital@doubleriver.com",
  impact: "impact@doubleriver.com",
} satisfies Record<Props["section"], `${Props["section"]}@doubleriver.com`>;

export const BaseContactUsForm: React.FC<Props> = ({ section }) => {
  const sendForm = useMutation({
    retry: false,
    mutationFn: async (data: Omit<FormSchema, "acceptTerms">) => {
      try {
        const res = await fetch("/", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            "form-name": "contact",
            ...data,
          }).toString(),
        });

        if (!res.ok)
          throw new Error("There was an error sending your message. Please try again later.");

        return res;
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("There was an error sending your message. Please try again later.");
      }
    },
  });

  const form = useForm<FormSchema>({
    defaultValues: {
      acceptTerms: false,
    },
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
  });

  function onSubmit({ acceptTerms, ...data }: FormSchema): void {
    sendForm.mutate(data);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mx-auto flex w-11/12 flex-col gap-4 md:w-1/2"
    >
      <span className="small-caps text-2xl text-gray-900">Contact us</span>

      <Label>
        <div className="flex items-center gap-1">
          <span className="capitalize text-gray-900">Full name</span>
          <RequiredStar />
        </div>

        <Input {...form.register("fullName")} type="text" placeholder="Enter your name" />
        <ErrorMessage message={form.formState.errors.fullName?.message} />
      </Label>

      <Label>
        <div className="flex items-center gap-1">
          <span className="capitalize text-gray-900">Email address</span>
          <RequiredStar />
        </div>

        <Input {...form.register("email")} type="email" placeholder="Enter your email address" />
        <ErrorMessage message={form.formState.errors.email?.message} />
      </Label>

      <Label>
        <div className="flex items-center gap-1">
          <span className="capitalize text-gray-900">Subject</span>
          <RequiredStar />
        </div>

        <Input {...form.register("subject")} type="text" placeholder="Enter a subject" />
        <ErrorMessage message={form.formState.errors.subject?.message} />
      </Label>

      <Label>
        <div className="flex items-center gap-1">
          <span className="capitalize text-gray-900">Message</span>
          <RequiredStar />
        </div>

        <Textarea {...form.register("message")} placeholder="Enter a message" />
        <ErrorMessage message={form.formState.errors.message?.message} />
      </Label>

      <Controller
        control={form.control}
        name="acceptTerms"
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <div className="items-top flex gap-2">
              <Checkbox
                id="terms1"
                checked={field.value}
                onCheckedChange={() => {
                  field.onChange(!field.value);
                }}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
                <p className="text-sm text-muted-foreground">
                  You agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>

            {/* @ts-expect-error - The error message for acceptTerms is nested for some reason. */}
            <ErrorMessage message={form.formState.errors.acceptTerms?.acceptTerms.message} />
          </div>
        )}
      />

      <button
        type="submit"
        className={cn(
          "flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-white transition-shadow duration-200 hover:shadow-md",
          {
            "bg-investments hover:bg-[hsl(204,100%,23%)]": section === "investments",
            "bg-[hsl(52,94%,50%)] text-black hover:bg-[hsl(52,93%,47%)]": section === "capital",
            "bg-[hsl(148,26%,30%)] hover:bg-[hsl(148,26%,27%)]": section === "impact",
          },
          (sendForm.isLoading || sendForm.isSuccess) && "cursor-not-allowed opacity-50",
        )}
        disabled={sendForm.isLoading || sendForm.isSuccess || sendForm.isError}
      >
        {sendForm.isLoading
          ? "Sending..."
          : sendForm.isSuccess
          ? "Sent!"
          : sendForm.isError
          ? "Error!"
          : "Send"}
        <PaperPlaneIcon className="h-4 w-4" />
      </button>
    </form>
  );
};

export const ContactUsForm: React.FC<Props> = ({ section }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BaseContactUsForm section={section} />
    </QueryClientProvider>
  );
};
