/* eslint-disable @typescript-eslint/no-explicit-any */
export default async (req: any, res: any) => {
  // Redirect all requests to index.html
  res.writeHead(308, { Location: "/" });
  res.end();
};
