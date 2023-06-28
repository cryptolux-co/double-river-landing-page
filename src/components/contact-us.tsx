import type React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@components/label";
import { Input } from "@components/input";
import { Textarea } from "@components/textarea";
import { SendIcon } from "lucide-react";
import { cn } from "@utils/cn";

const Error: React.FC<
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
});
type FormSchema = z.infer<typeof formSchema>;

type Props = {
  section: "investment" | "capital" | "impact";
};

export const ContactUs: React.FC<Props> = ({ section }) => {
  const form = useForm<FormSchema>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
  });

  return (
    <form
      onSubmit={form.handleSubmit((data) => console.log(data))}
      className="mx-auto flex w-1/2 flex-col gap-4"
    >
      <span className="small-caps text-2xl text-gray-900">Contact us</span>

      <Label>
        <div className="flex items-center gap-1">
          <span className="capitalize text-gray-900">Full name</span>
          <RequiredStar />
        </div>

        <Input {...form.register("fullName")} type="text" placeholder="Enter your name" />
        <Error message={form.formState.errors.fullName?.message} />
      </Label>

      <Label>
        <div className="flex items-center gap-1">
          <span className="capitalize text-gray-900">Email address</span>
          <RequiredStar />
        </div>

        <Input {...form.register("email")} type="email" placeholder="Enter your email address" />
        <Error message={form.formState.errors.email?.message} />
      </Label>

      <Label>
        <div className="flex items-center gap-1">
          <span className="capitalize text-gray-900">Subject</span>
          <RequiredStar />
        </div>

        <Input {...form.register("subject")} type="text" placeholder="Enter a subject" />
        <Error message={form.formState.errors.subject?.message} />
      </Label>

      <Label>
        <div className="flex items-center gap-1">
          <span className="capitalize text-gray-900">Message</span>
          <RequiredStar />
        </div>

        <Textarea {...form.register("message")} placeholder="Enter a message" />
        <Error message={form.formState.errors.message?.message} />
      </Label>

      <button
        type="submit"
        className={cn(
          "flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-medium text-white",
          {
            "bg-investments": section === "investment",
            "bg-capital": section === "capital",
            "bg-impact": section === "impact",
          },
        )}
      >
        Send <SendIcon className="h-5 w-5" />
      </button>
    </form>
  );
};