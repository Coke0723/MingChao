import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalMusicPlayer from "./components/GlobalMusicPlayer";
import HomePage from "./pages/HomePage";
import CharacterPage from "./pages/CharacterPage";
import VersionPage from "./pages/VersionPage";

function App() {
  return (
    <BrowserRouter>
      <GlobalMusicPlayer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/versions/:version" element={<VersionPage />} />
        <Route path="/characters/:slug" element={<CharacterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
