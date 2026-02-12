import AiStockPrediction from "./pages/landingpages/AiStockPrediction";
import AiTradingBootcamp from "./pages/landingpages/AiTradingBootcamp";
import BootcampThankYou from "./pages/landingpages/BootcampThankYou";
import ThankYou from "./pages/landingpages/ThankYou";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RiskDisclaimer from "./pages/RiskDisclaimer";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AiStockPrediction />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/risk-disclaimer" element={<RiskDisclaimer />} />
        <Route path="/ai-trading-bootcamp" element={<AiTradingBootcamp />} />
        <Route path="/ai-trading-bootcamp/thank-you" element={<BootcampThankYou />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
