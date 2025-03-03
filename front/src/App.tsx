import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import MainPage from "./pages/SchedulePage/SchedulePage";
import AuthPage from "./pages/LoginPage";
import Errorpage from "./pages/404";
import HomeworkPage from "./pages/HomeworkPage/HomeworkPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="homework" element={<HomeworkPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/error" element={<Errorpage />} />
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
