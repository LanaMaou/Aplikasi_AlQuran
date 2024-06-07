/* eslint-disable @typescript-eslint/no-explicit-any */
import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const nomorSurat: any = req.query.nomorSurat;

    if (
      !nomorSurat ||
      isNaN(parseInt(nomorSurat)) ||
      parseInt(nomorSurat) < 1 ||
      parseInt(nomorSurat) > 114
    ) {
      return res.status(400).json({ error: "Nomor surat tidak valid" });
    }

    const response = await axios.get(
      `https://equran.id/api/v2/surat/${nomorSurat}`
    );
    const data = response.data; // Ambil data dari response.data

    if (data.code !== 200) {
      // Periksa kode status dari API equran
      return res.status(404).json({ error: "Data surat tidak ditemukan" });
    }

    res.status(200).json(data); // Kirim data JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
