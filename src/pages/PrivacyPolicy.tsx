import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaShieldAlt } from 'react-icons/fa';
import AiPredictionHeader from '../components/AiPredictionHeader';
import AiPredictionFooter from '../components/AiPredictionFooter';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-black">
            <Helmet>
                <title>Privacy Policy | AI Stock Prediction</title>
                <meta name="description" content="Privacy Policy for AI Stock Prediction platform. Learn how we collect, use, and protect your data." />
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
                            <h1 className="text-4xl md:text-6xl font-black tracking-tight">Privacy Policy</h1>
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
                                <span className="text-cyan-400">1.</span> Information We Collect
                            </h2>
                            <p className="text-gray-300 leading-relaxed mb-4">We may collect:</p>
                            <ul className="space-y-2 text-gray-300 mb-4">
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400">•</span>
                                    <span>Name, email, and account details</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400">•</span>
                                    <span>Device, browser, IP address</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400">•</span>
                                    <span>Usage behavior inside the software</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400">•</span>
                                    <span>Payment metadata (processed by third-party providers)</span>
                                </li>
                            </ul>
                            <div className="bg-green-950/20 border border-green-500/20 rounded-xl p-4">
                                <p className="text-green-400 font-semibold">
                                    We do not collect brokerage credentials or trading account passwords.
                                </p>
                            </div>
                        </div>

                        {/* Section 2 */}
                        <div className="mb-12 p-8 bg-zinc-900/50 rounded-2xl border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-cyan-400">2.</span> How We Use Data
                            </h2>
                            <p className="text-gray-300 leading-relaxed mb-4">Your data is used to:</p>
                            <ul className="space-y-2 text-gray-300 mb-4">
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400">✓</span>
                                    <span>Provide and improve the Service</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400">✓</span>
                                    <span>Maintain security and prevent abuse</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400">✓</span>
                                    <span>Analyze usage patterns</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400">✓</span>
                                    <span>Communicate updates and service notices</span>
                                </li>
                            </ul>
                            <p className="text-white font-semibold">
                                We do not sell your personal data.
                            </p>
                        </div>

                        {/* Section 3 */}
                        <div className="mb-12 p-8 bg-zinc-900/50 rounded-2xl border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-cyan-400">3.</span> Cookies & Tracking
                            </h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                We use cookies and analytics tools to:
                            </p>
                            <ul className="space-y-2 text-gray-300 mb-4">
                                <li className="flex items-start gap-2">
                                    <span className="text-gray-500">•</span>
                                    <span>Improve performance</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-gray-500">•</span>
                                    <span>Track usage trends</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-gray-500">•</span>
                                    <span>Optimize the user experience</span>
                                </li>
                            </ul>
                            <p className="text-gray-400 italic">
                                You can disable cookies, but functionality may degrade.
                            </p>
                        </div>

                        {/* Section 4 */}
                        <div className="mb-12 p-8 bg-zinc-900/50 rounded-2xl border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-cyan-400">4.</span> Data Sharing
                            </h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                We may share limited data with:
                            </p>
                            <ul className="space-y-2 text-gray-300 mb-4">
                                <li className="flex items-start gap-2">
                                    <span className="text-yellow-400">→</span>
                                    <span>Payment processors</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-yellow-400">→</span>
                                    <span>Analytics providers</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-yellow-400">→</span>
                                    <span>Legal authorities (if required by law)</span>
                                </li>
                            </ul>
                            <p className="text-white font-semibold">
                                We do not share data with brokers, funds, or signal groups.
                            </p>
                        </div>

                        {/* Section 5 */}
                        <div className="mb-12 p-8 bg-zinc-900/50 rounded-2xl border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-cyan-400">5.</span> Data Security
                            </h2>
                            <p className="text-gray-300 leading-relaxed mb-3">
                                We use industry-standard safeguards.
                            </p>
                            <div className="bg-yellow-950/20 border border-yellow-500/20 rounded-xl p-4">
                                <p className="text-yellow-400 font-semibold">
                                    However, no system is 100% secure. Use at your own risk.
                                </p>
                            </div>
                        </div>

                        {/* Section 6 */}
                        <div className="mb-12 p-8 bg-zinc-900/50 rounded-2xl border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-cyan-400">6.</span> User Rights
                            </h2>
                            <p className="text-gray-300 leading-relaxed mb-4">You may request:</p>
                            <ul className="space-y-2 text-gray-300 mb-4">
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400">✓</span>
                                    <span>Access to your data</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400">✓</span>
                                    <span>Correction or deletion</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400">✓</span>
                                    <span>Account closure</span>
                                </li>
                            </ul>
                            <p className="text-gray-400 italic">
                                Some data may be retained for legal or compliance reasons.
                            </p>
                        </div>

                        {/* Section 7 */}
                        <div className="mb-12 p-8 bg-zinc-900/50 rounded-2xl border border-cyan-500/20">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-cyan-400">7.</span> Policy Updates
                            </h2>
                            <p className="text-gray-300 leading-relaxed">
                                We may update this policy at any time. <span className="text-cyan-400 font-semibold">Continued use = acceptance.</span>
                            </p>
                        </div>

                        {/* Final Notice */}
                        <div className="p-8 bg-gradient-to-r from-cyan-950/30 to-blue-950/30 rounded-2xl border border-cyan-500/30">
                            <p className="text-center text-gray-300 text-sm leading-relaxed">
                                By using our Service, you acknowledge that you have read and understood this Privacy Policy.
                                If you have any questions about how we handle your data, please contact us.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <AiPredictionFooter />
        </div>
    );
};

export default PrivacyPolicy;
