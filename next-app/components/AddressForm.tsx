"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FaTrashAlt } from "react-icons/fa"; // You can use an icon library like react-icons
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardDescription, CardFooter, CardHeader } from "./ui/card";
import { submitForm } from "@/app/serverActions/submitForm";
import { useRouter } from "next/navigation";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z
    .string()
    .regex(
      /^(44\d{9,10}|0\d{9,10})$/,
      "Phone number must start with 44 or 0 and be a valid UK number"
    ),
  houseNumber: z.string(),
  postcode: z.string(),
});

export function AddressForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      houseNumber: "",
      postcode: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitForm(values);
    router.push("/thank-you");
  }

  return (
    <Card className="py-4 px-8 rounded-lg shadow-lg">
      <CardHeader>
        <CardDescription>
          <h2 className="text-center text-3xl font-semibold mb-4 flex justify-center items-center">
            <FaTrashAlt className="mr-2 text-2xl" />
            Bin Day
          </h2>
          <p className="text-center text-lg">
            Sign up to receive weekly text message reminders about which bin is
            due for collection in your area.
          </p>
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    autoComplete="name"
                    placeholder="Bob Lee Swagger"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="bob.lee@swagger.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    autoComplete="tel"
                    placeholder="447873456789"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="houseNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>House Number</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    autoComplete="street-address"
                    placeholder="123"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postcode</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    autoComplete="postal-code"
                    placeholder="XEX 999"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
      <CardFooter>
        <CardDescription>
          <div className="mt-10">
            <p className="text-center mt-12">
              This service is free and requires no payment details. If this
              changes, we’ll send you a payment link, and you can choose whether
              to continue.
            </p>
            <h3 className="text-lg font-semibold text-center mt-8">
              How It Works
            </h3>
            <p className="text-center mt-2">
              We fetch bin collection schedules directly from local council
              websites and using available public APIs where possible. Once
              registered, you&apos;ll receive a weekly SMS reminder telling you
              which bin to put out, so you never miss a collection day.
            </p>
          </div>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
