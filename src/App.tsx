import { HashRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "@/pages/WelcomePage";
import MainLayout from "@/components/MainLayout";
import HomePage from "@/pages/HomePage";
import ChatPage from "@/pages/ChatPage";
import RelationsPage from "@/pages/RelationsPage";
import RemindersPage from "@/pages/RemindersPage";
import RecordsPage from "@/pages/RecordsPage";
import FilesPage from "@/pages/FilesPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/chat/:id" element={<ChatPage />} />
          <Route path="/relations" element={<RelationsPage />} />
          <Route path="/reminders" element={<RemindersPage />} />
          <Route path="/records" element={<RecordsPage />} />
          <Route path="/files" element={<FilesPage />} />
        </Route>
      </Routes>
    </Router>
  );
}