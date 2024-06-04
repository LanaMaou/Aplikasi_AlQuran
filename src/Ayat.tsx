/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Ayat() {
  const { nomorSurat } = useParams();
  const [ayat, setAyat] = useState([]);
  const [namaLatin, setNamaLatin] = useState([]);
  const [audioFull, setAudioFull] = useState("");
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const audioRefsFull = useRef<HTMLAudioElement | null>();

  useEffect(() => {
    const getData = async () => {
      const response = await axios(
        `https://equran.id/api/v2/surat/${nomorSurat}`
      );
      setAyat(response.data.data.ayat);
      setNamaLatin(response.data.data.namaLatin);
      setAudioFull(response.data.data.audioFull["05"]);
    };

    getData();
  }, [nomorSurat]);

  return (
    <div className="w-full max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 mt-2">
      <div className="flex justify-between w-full my-4 items-center">
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-600 bg-slate-700 p-3 rounded-md my-4 block max-w-32 shadow shadow-blue-400"
        >
          ⬅️ Kembali
        </Link>

        <audio
          src={audioFull}
          ref={(audio) => (audioRefsFull.current = audio)}
        ></audio>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 rounded-md flex items-center space-x-2 h-12"
          onClick={() => {
            audioRefsFull.current?.play();
          }}
        >
          <PlayIcon className="h-5 w-5" />
          <span>Putar Audio Full</span>
        </button>
      </div>
      <div className="grid gap-8 text-left">
        {ayat.length > 0 ? (
          ayat.map((ayat: any, index: number) => (
            <div className="bg-gray-800 rounded-lg shadow-md p-6" key={index}>
              <div className="flex items-center justify-between mb-4">
                <div className="text-gray-400 text-sm">
                  Surah {namaLatin}, Ayat {ayat.nomorAyat}
                </div>
                <audio
                  src={ayat.audio["05"]}
                  ref={(audio) => (audioRefs.current[index] = audio)}
                ></audio>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md flex items-center space-x-2"
                  onClick={() => {
                    audioRefs.current[index]?.play();
                  }}
                >
                  <PlayIcon className="h-5 w-5" />
                  <span>Putar Audio Ayat {ayat.nomorAyat}</span>
                </button>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-gray-100">
                  {ayat.teksArab}
                </div>
                <div className="text-xl font-medium text-gray-400">
                  {ayat.teksLatin}
                </div>
                <div className="text-lg text-gray-300">
                  {ayat.teksIndonesia}
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-center text-6xl font-bold mt-10"><span className=" mr-5 animate-spin inline-block">/</span>Loading....</h1>
        )}
      </div>
    </div>
  );
}

function PlayIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}
