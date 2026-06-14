"use client";

import { PigramProvider } from "@/contexts/pigram-context";
import PigramApp from "@/components/pigram/app";

export default function HomePage() {
  return (
    <PigramProvider>
      <PigramApp />
    </PigramProvider>
  );
}
