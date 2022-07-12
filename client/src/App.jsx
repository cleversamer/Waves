import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import NotFound from "./pages/notFound";

const App = () => {
  return (
    <Routes>
      <Route path="/not-found" element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
};

export default App;
