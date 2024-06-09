/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Container,
  createTheme,
  debounce,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import "./App.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import Ayat from "./Ayat";
import { MenuBook } from "@mui/icons-material";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  palette: {
    mode: "dark",
  },
});

function App() {
  const [data, setData] = useState([]);
  const [dataFresh, setDataFresh] = useState([]);
  const [dataNotFound, setDataNotFound] = useState(false);

  // Search handler
  const handleSearch = debounce((event: any) => {
    const value = event.target.value;
    const filteredData = dataFresh.filter((item: any) =>
      item.namaLatin.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredData.length === 0) {
      setData([]);
      setDataNotFound(true);
    } else {
      setData(filteredData);
      setDataNotFound(false);
    }
  }, 300);

  // Fetching data
  useEffect(() => {
    const getAPI = async () => {
      try {
        const response = await fetch("/api/equran");

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setDataFresh(data.data);
        setData(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getAPI();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <h1 className="drop-shadow-xl bg-gradient-to-r from-blue-200 to-indigo-900 text-transparent bg-clip-text font-inter font-bold text-3xl lg:text-5xl pt-10">
          Aplikasi Al-Qur'an
        </h1>

        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Surat
                  data={data}
                  handleSearch={handleSearch}
                  dataNotFound={dataNotFound}
                />
              }
            />
            <Route path="/ayat/:nomorSurat" element={<Ayat />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

const Surat = ({
  data,
  handleSearch = () => {},
  dataNotFound,
}: {
  data: any;
  handleSearch: any;
  dataNotFound: any;
}) => {
  return (
    <>
      {(data.length > 0 || dataNotFound) && (
        <div className="md:w-1/3 lg:w-1/4 mt-6 -mb-4 w-full">
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <MenuBook sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Cari Surah Al-Qur'an"
              variant="standard"
              fullWidth
              onInput={(e) => handleSearch(e)}
            />
          </Box>
        </div>
      )}
      <Grid my={2} container spacing={2} justifyContent="center">
        {data.length > 0 && dataNotFound === false ? (
          data.map((data: any, index: any) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <div
                key={index}
                className="bg-blue-600 rounded-lg shadow-sm shadow-blue-500 border border-blue-500 bg-opacity-70"
              >
                <Content data={data} />
              </div>
            </Grid>
          ))
        ) : (
          <h1 className="text-center text-4xl font-bold mt-10">
            {dataNotFound ? (
              <p className="text-red-400 text-2xl md:text-4xl font-bold">
                <span className="animate-bounce inline-block">❌</span>  Surah Tidak Ditemukan
              </p>
            ) : (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 animate-spin mr-3"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 3a9 9 0 1 0 9 9"></path>
                </svg>
                <span className="text-4xl font-bold dark:text-neutral-300">
                  Loading...
                </span>{" "}
              </div>
            )}
          </h1>
        )}
      </Grid>
    </>
  );
};

const Content = ({ data }: { data: any }) => {
  return (
    <>
      <CardContent sx={{ display: "flex", textAlign: "left" }}>
        <span className="w-10 h-10 relative z-[1] mr-5 flex items-center justify-center before:content-[''] before:bg-blue-500 before:h-10 before:w-10 before:absolute before:-z-[1] before:rotate-45 text-white font-bold before:rounded-md before:drop-shadow-md">
          <p>{data.nomor}</p>
        </span>
        <Box display={"flex"} justifyContent={"space-between"} flexGrow={1}>
          <Typography gutterBottom fontWeight={"bold"}>
            {data.namaLatin} <br />{" "}
            <Typography variant="caption" fontWeight={"bold"}>
              {data.arti}
            </Typography>
          </Typography>
          <Typography component="div" textAlign={"right"}>
            {data.nama} <br />
            <Typography variant="caption">{data.jumlahAyat} Ayat</Typography>
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size="medium"
          variant="contained"
          sx={{
            color: "black",
            backgroundColor: "#60a5fa",
            textTransform: "none",
          }}
        >
          <Link to={`/ayat/${data.nomor}`} className="font-semibold">
            Lihat Selengkapnya <FiArrowUpRight className="h-5 w-5 inline" />
          </Link>
        </Button>
      </CardActions>
    </>
  );
};

export default App;
