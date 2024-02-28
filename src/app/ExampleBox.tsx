import { ExampleData } from "./data";
import { DescriptionParser } from "./desciption";

export default function ExampleBox({ data }: { data: ExampleData }) {
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
