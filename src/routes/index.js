import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import VerifyCode from "../pages/Verify";
import Home from "../pages/Home";

const SignInRoute = () => (
  <Router>
    <Routes>
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify" element={<VerifyCode />} />
      <Route path="/" element={<SignIn />} />
    </Routes>
  </Router>
);

const MainRoute = () => (
  <Router>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<SignIn />} />
    </Routes>
  </Router>
);

export { SignInRoute, MainRoute };
