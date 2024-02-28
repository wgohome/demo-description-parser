import { useState } from "react";
import { DescriptionParser } from "./desciption";

export default function InteractiveBox() {
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
