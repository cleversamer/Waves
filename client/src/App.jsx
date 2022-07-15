import { Routes, Route, Navigate } from "react-router-dom";
import Home from "pages/home";
import NotFound from "pages/notFound";

import config from "config.json";

const App = () => {
  return (
    <Routes>
      <Route path={config.routes.notFound} element={<NotFound />} />
      <Route path={config.routes.home} element={<Home />} />
      <Route path="/" element={<Navigate to={config.routes.home} replace />} />
      <Route
        path="*"
        element={<Navigate to={config.routes.notFound} replace />}
      />
    </Routes>
  );
};

export default App;
