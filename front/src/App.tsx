import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainPage from "./pages/SchedulePage";
import AuthPage from "./pages/LoginPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
