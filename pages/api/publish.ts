import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  axios.post(
    "https://api.github.com/repos/kleveland/next-personal-site/dispatches",
    {
      'event-type': "hello",
    },
    {
      headers: {
        Authorization: `Basic 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`,
      },
    }
  );
  res.status(200).json({ name: "John Doe" });
}
