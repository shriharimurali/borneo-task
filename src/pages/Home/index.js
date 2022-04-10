import React, { useContext } from "react";
import { Container, Grid } from "@mui/material";
import Header from "../../components/Header";
import ExpenseList from "../../components/ExpenseList";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "../../context";

const Home = () => {
  const { loading } = useContext(AuthContext);
  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            zIndex: 100,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: "rgba(255, 255, 255, 0.5)",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}
      <Header />
      <Container fixed>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ExpenseList />
          </Grid>
          <Grid item xs={6}>
            <BarChart />
          </Grid>
          <Grid item xs={6}>
            <PieChart />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
