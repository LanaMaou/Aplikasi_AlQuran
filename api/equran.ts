import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const nomorSurat = Number(req.query.nomorSurat);
    let apiUrl = "https://equran.id/api/v2/surat";

    if (Number.isInteger(nomorSurat) && nomorSurat >= 1 && nomorSurat <= 114) {
      apiUrl += `/${nomorSurat}`;
    }

    const response = await axios.get(apiUrl);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
