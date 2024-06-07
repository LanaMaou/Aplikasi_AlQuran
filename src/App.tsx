/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  createTheme,
  Grid,
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
import Ayat from "./Ayat";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getAPI = async () => {
      try {
        const response = await fetch("/api/equran");

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
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
                <Grid my={2} container spacing={2} justifyContent="center">
                  {data.length > 0 ? (
                    data.map((data: any, index: any) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                          sx={{
                            boxShadow: 6,
                            borderRadius: 3,
                            marginBottom: 2,
                            backgroundColor: "#334155",
                            color: "#eeeeee",
                          }}
                          key={index}
                        >
                          <Content data={data} />
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <h1 className="text-center text-4xl font-bold mt-10">
                      <span className=" mr-5 animate-spin inline-block">/</span>
                      Loading....
                    </h1>
                  )}
                </Grid>
              }
            />
            <Route path="/ayat/:nomorSurat" element={<Ayat />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

const Content = ({ data }: { data: any }) => {
  return (
    <>
      <CardContent sx={{ display: "flex", textAlign: "left" }}>
        <span className="w-10 h-10 relative z-[1] mr-5 flex items-center justify-center before:content-[''] before:bg-green-600 before:h-10 before:w-10 before:absolute before:-z-[1] before:rotate-45 text-white font-bold before:rounded-md before:drop-shadow-md">
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
        <Button size="small" color="primary" variant="outlined">
          <Link to={`/ayat/${data.nomor}`}>Lihat Selengkapnya ≫</Link>
        </Button>
      </CardActions>
    </>
  );
};

export default App;
