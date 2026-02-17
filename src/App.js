import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Publications from "./pages/Publications";
import PublicationDetails from "./pages/PublicationDetails";
import ScienceCircle from "./pages/ScienceCircle";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/o-nas" element={<About />} />
        <Route path="/wydarzenia" element={<Events />} />
        <Route path="/publikacje" element={<Publications />} />
        <Route path="/publikacje/:id" element={<PublicationDetails />} />
        <Route path="/kolo-naukowe" element={<ScienceCircle />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

