"use client"

import { Fragment, useState } from "react";
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

      <InteractiveBox />
      <hr />

      {samples.map(sample => (
        <Fragment key={sample.title}>
          <ExampleBox data={sample} />
          <hr />
        </Fragment>
      ))}
    </main>
  );
}


function InteractiveBox() {
  const [rawContent, setRawContent] = useState("");
  const [preview, setPreview] = useState("");
  const [expanded, setExpanded] = useState("");

  const handleParse = () => {
    const [ short, long ] = DescriptionParser.parse(rawContent, 140)
    setPreview(short);
    setExpanded(long);
  };

  const handleLoadSample = () => {
    setRawContent("This is a [sample](https://illumina.com) release note for your AVD. The OverrideCycles setting can be used to change the [read/part/index/barcode](https://react.dev) of read is treated by BCL Convert. The BCL Convert app on [BaseSpace](https://basespace.illumina.com) requires a v2 sample sheet which can be made using Run Planning in BaseSpace.");
  };

  return <div>
    <h2 className="py-4 text-purple-600">Try out your own markdown text</h2>
    <div className="mb-6">
      <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900">Your markdown</label>
      <textarea
        rows={5}
        value={rawContent}
        onChange={e => setRawContent(e.target.value)}
        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-teal-500 focus:border-teal-500"
      />
      <div className="flex gap-x-4 my-3">
        <button
          type="button"
          onClick={handleParse}
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Parse
        </button>
        <button
          type="button"
          onClick={handleLoadSample}
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
        >
          Load sample
        </button>
      </div>

    </div>
    <div className="grid grid-cols-8 gap-y-5">
      <div className="col-span-1">
        <p>Preview</p>
      </div>
      <div className="col-span-7">
        <div dangerouslySetInnerHTML={{ __html: preview }}></div>
      </div>
      <div className="col-span-1">
        <p>Full content</p>
      </div>
      <div className="col-span-7">
        <div dangerouslySetInnerHTML={{ __html: expanded }}></div>
      </div>
    </div>
  </div>
}


function ExampleBox({ data }: { data: ExampleData }) {
  const [preview, expanded] = data.removeIlluminaLinks ? DescriptionParser.parse(data.mdContent, undefined, true) : DescriptionParser.parse(data.mdContent);

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
          <div dangerouslySetInnerHTML={{ __html: preview }}></div>
        </div>
        <div className="col-span-1">
          <p>Full content</p>
        </div>
        <div className="col-span-7">
          <div dangerouslySetInnerHTML={{ __html: expanded }}></div>
        </div>
      </div>
    </div>
  );
}
