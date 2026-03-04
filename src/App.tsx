import AiStockPrediction from "./pages/landingpages/AiStockPrediction";
import AiTradingBootcamp from "./pages/landingpages/AiTradingBootcamp";
import BootcampThankYou from "./pages/landingpages/BootcampThankYou";
import ThankYou from "./pages/landingpages/ThankYou";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RiskDisclaimer from "./pages/RiskDisclaimer";
import BlogsPage from "./pages/BlogsPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BlogEditor from "./pages/admin/BlogEditor";
import { AuthProvider } from "./context/AuthContext";
import { BlogProvider } from "./context/BlogContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <BlogProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AiStockPrediction />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/risk-disclaimer" element={<RiskDisclaimer />} />
            <Route path="/ai-trading-bootcamp" element={<AiTradingBootcamp />} />
            <Route path="/ai-trading-bootcamp/thank-you" element={<BootcampThankYou />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="blog/new" element={<BlogEditor />} />
              <Route path="blog/edit/:id" element={<BlogEditor />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </BlogProvider>
    </AuthProvider>
  );
}

export default App;
