import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaShieldAlt } from 'react-icons/fa';
import AiPredictionHeader from '../components/AiPredictionHeader';
import AiPredictionFooter from '../components/AiPredictionFooter';

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-black">
            <Helmet>
                <title>Terms of Service | AI Stock Prediction</title>
                <meta name="description" content="Terms of Service for AI Stock Prediction platform. Read our legal terms, disclaimers, and user responsibilities." />
            </Helmet>

            <AiPredictionHeader />

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-4 overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-black"></div>
                <div className="container mx-auto relative z-10">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors"
                    >
                        <FaArrowLeft /> Back to Home
                    </Link>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
                            <FaShieldAlt className="text-4xl text-cyan-400" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tight">Terms of Service</h1>
                            <p className="text-gray-400 mt-2">Last Updated: 20-01-2025</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="prose prose-invert prose-cyan max-w-none">

                        {/* Section 1 */}
                        <div className="mb-12 p-8 bg-zinc-900/50 rounded-2xl border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-cyan-400">1.</span> Acceptance of Terms
                            </h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                By accessing or using our website, software, platform, demo, or any related services ("Service"), you agree to be bound by these Terms of Service ("Terms").
                                If you do not agree, do not use the Service.
                            </p>
                            <p className="text-cyan-400 font-semibold">
                                This is not optional. Continued usage = acceptance.
                            </p>
                        </div>

                        {/* Section 2 */}
                        <div className="mb-12 p-8 bg-zinc-900/50 rounded-2xl border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-cyan-400">2.</span> Nature of the Service (Critical Clause)
                            </h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                We provide AI-powered market analysis software that generates probability-based predictions for financial markets, including but not limited to stocks, forex, and cryptocurrencies.
                            </p>
                            <div className="bg-red-950/20 border border-red-500/20 rounded-xl p-6 mb-4">
                                <h3 className="text-lg font-bold text-red-400 mb-3">We DO NOT:</h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1">✗</span>
                                        <span>Provide buy or sell signals</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1">✗</span>
                                        <span>Provide trading tips or calls</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1">✗</span>
                                        <span>Provide personalized recommendations</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1">✗</span>
                                        <span>Act as a financial advisor, broker, or signal provider</span>
                                    </li>
                                </ul>
                            </div>
                            <p className="text-white font-semibold">
                                You make all trading decisions independently.<br />
                                We sell software tools — not trading advice.
                            </p>
                        </div>

                        {/* Section 3 */}
                        <div className="mb-12 p-8 bg-zinc-900/50 rounded-2xl border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-cyan-400">3.</span> No Investment Advice
                            </h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                All information provided through the Service is for educational and informational purposes only.
                            </p>
                            <div className="bg-yellow-950/20 border border-yellow-500/20 rounded-xl p-6 mb-4">
                                <h3 className="text-lg font-bold text-yellow-400 mb-3">Nothing on the platform constitutes:</h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li>• Financial advice</li>
                                    <li>• Investment advice</li>
                                    <li>• Trading advice</li>
                                    <li>• Portfolio management</li>
                                    <li>• A solicitation to buy or sell any financial instrument</li>
                                </ul>
                            </div>
                            <p className="text-yellow-400 font-semibold italic">
                                If you treat this as advice, that's your misuse, not our liability.
                            </p>
                        </div>

                        {/* Section 4 */}
                        <div className="mb-12 p-8 bg-zinc-900/50 rounded-2xl border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-cyan-400">4.</span> Eligibility
                            </h2>
                            <p className="text-gray-300 leading-relaxed mb-3">You must:</p>
                            <ul className="space-y-2 text-gray-300 mb-4">
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400">✓</span>
                                    <span>Be at least 18 years old</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400">✓</span>
                                    <span>Have legal capacity to enter a binding agreement</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400">✓</span>
                                    <span>Comply with all applicable local laws and regulations</span>
                                </li>
                            </ul>
                            <p className="text-gray-400 italic">
                                If trading is restricted in your jurisdiction, you are responsible, not us.
                            </p>
                        </div>

                        {/* Section 5 */}
                        <div className="mb-12 p-8 bg-zinc-900/50 rounded-2xl border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-cyan-400">5.</span> Accuracy & Performance Disclaimer
                            </h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                Any accuracy metrics, probability scores, backtests, or historical results shown:
                            </p>
                            <ul className="space-y-2 text-gray-300 mb-4">
                                <li className="flex items-start gap-2">
                                    <span className="text-gray-500">•</span>
                                    <span>Are not guarantees</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-gray-500">•</span>
                                    <span>Vary by market conditions, timeframe, and asset</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-gray-500">•</span>
                                    <span>May differ between live and historical data</span>
                                </li>
                            </ul>
                            <p className="text-white font-semibold">
                                Past performance does not predict future results.
                            </p>
                            <p className="text-gray-400 italic mt-2">
                                If you expect certainty, this product is not for you.
                            </p>
                        </div>

                        {/* Section 6 */}
                        <div className="mb-12 p-8 bg-zinc-900/50 rounded-2xl border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-cyan-400">6.</span> User Responsibilities
                            </h2>
                            <p className="text-gray-300 leading-relaxed mb-4">You agree that:</p>
                            <ul className="space-y-3 text-gray-300 mb-4">
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400 font-bold">→</span>
                                    <span>You are solely responsible for your trades</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400 font-bold">→</span>
                                    <span>You understand the risks of financial markets</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400 font-bold">→</span>
                                    <span>You will not rely on the Service as a sole decision-making tool</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400 font-bold">→</span>
                                    <span>You will not claim reliance on the Service for losses</span>
                                </li>
                            </ul>
                            <p className="text-red-400 font-semibold">
                                Failure to understand risk is not our responsibility.
                            </p>
                        </div>

                        {/* Section 7 */}
                        <div className="mb-12 p-8 bg-zinc-900/50 rounded-2xl border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-cyan-400">7.</span> Payments & Access
                            </h2>
                            <ul className="space-y-2 text-gray-300">
                                <li>• Fees are for software access only</li>
                                <li>• No profit sharing, performance fees, or commissions</li>
                                <li>• Demo access does not guarantee future availability</li>
                                <li>• Pricing may change without prior notice</li>
                                <li>• Refunds, if any, are governed strictly by the stated refund policy</li>
                            </ul>
                        </div>

                        {/* Section 8 */}
                        <div className="mb-12 p-8 bg-zinc-900/50 rounded-2xl border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-cyan-400">8.</span> Intellectual Property
                            </h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                All content, software, algorithms, UI, data structures, and branding are our intellectual property.
                            </p>
                            <div className="bg-red-950/20 border border-red-500/20 rounded-xl p-6 mb-4">
                                <h3 className="text-lg font-bold text-red-400 mb-3">You may not:</h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li>• Copy</li>
                                    <li>• Reverse engineer</li>
                                    <li>• Resell</li>
                                    <li>• White-label (unless explicitly permitted)</li>
                                    <li>• Redistribute</li>
                                </ul>
                            </div>
                            <p className="text-red-400 font-bold">
                                Violation = immediate termination.
                            </p>
                        </div>

                        {/* Section 9 */}
                        <div className="mb-12 p-8 bg-zinc-900/50 rounded-2xl border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-cyan-400">9.</span> Limitation of Liability
                            </h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                To the maximum extent permitted by law, we are not liable for:
                            </p>
                            <ul className="space-y-2 text-gray-300 mb-4">
                                <li>• Trading losses</li>
                                <li>• Missed opportunities</li>
                                <li>• Data delays or inaccuracies</li>
                                <li>• Market volatility</li>
                                <li>• Emotional or financial distress</li>
                            </ul>
                            <p className="text-white font-bold text-lg">
                                You use the Service entirely at your own risk.
                            </p>
                        </div>

                        {/* Section 10 */}
                        <div className="mb-12 p-8 bg-zinc-900/50 rounded-2xl border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-cyan-400">10.</span> Termination
                            </h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                We may suspend or terminate access at any time if:
                            </p>
                            <ul className="space-y-2 text-gray-300 mb-4">
                                <li>• Terms are violated</li>
                                <li>• Abuse or misuse is detected</li>
                                <li>• Legal or compliance risks arise</li>
                            </ul>
                            <p className="text-gray-400 font-semibold">
                                No explanations required.
                            </p>
                        </div>

                        {/* Section 11 */}
                        <div className="mb-12 p-8 bg-zinc-900/50 rounded-2xl border border-cyan-500/20">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-cyan-400">11.</span> Governing Law
                            </h2>
                            <p className="text-gray-300 leading-relaxed">
                                These Terms shall be governed by the laws of <span className="text-cyan-400 font-semibold">India</span>, without regard to conflict of law principles.
                            </p>
                        </div>

                        {/* Final Notice */}
                        <div className="p-8 bg-gradient-to-r from-cyan-950/30 to-blue-950/30 rounded-2xl border border-cyan-500/30">
                            <p className="text-center text-gray-300 text-sm leading-relaxed">
                                By using our Service, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                                If you have any questions, please contact us before using the Service.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <AiPredictionFooter />
        </div>
    );
};

export default TermsOfService;
