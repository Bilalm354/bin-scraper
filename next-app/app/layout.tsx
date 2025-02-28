import { ThemeProvider } from "@/components/theme-provider";
import { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Bin Day",
  description: "Reminders about which bin is due for collection in your area.",
  icons: {
    icon: "/favicon.ico",
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
