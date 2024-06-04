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
import axios from "axios";
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
  const getAPI = async () => {
    const response = await axios("https://equran.id/api/v2/surat");
    setData(response.data.data);
  };

  useEffect(() => {
    getAPI();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          color={"#eeeeee"}
          fontWeight={"bold"}
          fontFamily={"inter"}
          className="drop-shadow-xl"
        >
          Aplikasi Al-Qur'an
        </Typography>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Grid my={2} container spacing={2}>
                  {data.map((data: any, index: any) => (
                    <Grid item xs={4} key={index}>
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
                  ))}
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
          <Typography  gutterBottom fontWeight={"bold"}>
            {data.namaLatin} <br />{" "}
            <Typography
              variant="caption"
              
              fontWeight={"bold"}
            >
              {data.arti}
            </Typography>
          </Typography>
          <Typography component="div" textAlign={"right"}>
            {data.nama} <br />
            <Typography variant="caption" >
              {data.jumlahAyat} Ayat
            </Typography>
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