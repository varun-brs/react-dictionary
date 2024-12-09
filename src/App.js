import { Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "./core/layout";
import { Home } from "./modules/Home";
import "./App.css";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
