export type ExampleData = {
  mdContent: string,
  title: string,
  removeIlluminaLinks?: boolean,
}

export const samples: ExampleData[] = [
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
