"use client";

import { Suspense } from "react";
import GenerateForm from "@/components/generate/GenerateForm";

export default function GeneratePage() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <GenerateForm />
      </Suspense>
    </main>
  );
}
