"use client"

import { Fragment } from "react";
import { DescriptionParser } from "./desciption";

type ExampleData = {
  mdContent: string,
  title: string,
  removeIlluminaLinks?: boolean,
}

export default function Home() {

  const samples: ExampleData[] = [
    {
      title: "Link display text gets trucated",
      mdContent: `Lorem ipsum dolor sit, consectetur [truncated](https://www.pacbio.com) adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna [aliqua](https://www.illumina.com). Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    },
    {
      title: "Styling like italic gets trucated correctly",
      mdContent: `Lorem ipsum dolor sit, consectetur _TestedAndTested_ [truncated](https://www.pacbio.com) adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna [aliqua](https://www.illumina.com). Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    },
    {
      title: "Nested styling gets trucated correctly",
      mdContent: `Lorem ipsum dolor sit, consectetur _**TestedAndTested**_ adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna [aliqua](https://www.illumina.com). Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    },
    {
      title: "Short enough text",
      mdContent: `Lorem ipsum dolor sit, consectetu.`,
    },
    {
      title: "Remove non illumina link",
      mdContent: `Lorem ipsum dolor sit, consectetur [truncated](https://www.pacbio.com) adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna [ilmn site](https://www.illumina.com). Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      removeIlluminaLinks: true,
    },
  ];

  return (
    <main className="px-24">
      <h1 className="my-8">Demo for Description Parser</h1>
      {samples.map(sample => (
        <Fragment key={sample.title}>
          <ExampleBox data={sample} />
          <hr />
        </Fragment>
      ))}
    </main>
  );
}

function ExampleBox({ data }: { data: ExampleData }) {
  const [ preview, expanded ] = data.removeIlluminaLinks ? DescriptionParser.parse(data.mdContent, undefined, true) : DescriptionParser.parse(data.mdContent);

  return (
    <div>
        <h2 className="py-4">{data.title}</h2>
        <div className="grid grid-cols-8 gap-y-5">
          <div className="col-span-1">
            <p>Raw source</p>
          </div>
          <div className="col-span-7">
            <div>{data.mdContent}</div>
          </div>
          <div className="col-span-1">
            <p>Preview</p>
          </div>
          <div className="col-span-7">
            <div dangerouslySetInnerHTML={{__html: preview}}></div>
          </div>
          <div className="col-span-1">
            <p>Full content</p>
          </div>
          <div className="col-span-7">
            <div dangerouslySetInnerHTML={{__html: expanded}}></div>
          </div>
        </div>
      </div>
  );
}
