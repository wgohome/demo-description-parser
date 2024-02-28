"use client"

import react from "react";
import dynamic from "next/dynamic";
import { samples } from "./data";

const ExampleBox = dynamic(() => import('./ExampleBox'), {
  ssr: false,
})
const InteractiveBox = dynamic(() => import('./InteractiveBox'), {
  ssr: false,
})

export default function Home() {
  return (
    <main className="px-24">
      <h1 className="my-8">Demo for Description Parser</h1>
      <InteractiveBox />
      <hr />

      {samples.map(sample => (
        <react.Fragment key={sample.title}>
          <ExampleBox data={sample} />
          <hr />
        </react.Fragment>
      ))}
    </main>
  );
}
