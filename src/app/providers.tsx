"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
