import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  axios.post(
    "https://api.github.com/repos/kleveland/next-personal-site/actions/workflows/main.yml/dispatches",
    {
      ref: "main"
    },
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token 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`,
      },
    }
  );
  res.status(200).json({ name: "John Doe" });
}
