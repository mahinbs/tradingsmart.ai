import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';
import AiPredictionHeader from '../components/AiPredictionHeader';
import AiPredictionFooter from '../components/AiPredictionFooter';

const RiskDisclaimer = () => {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-black">
            <Helmet>
                <title>Risk Disclaimer | AI Stock Prediction</title>
                <meta name="description" content="Risk Disclaimer for AI Stock Prediction platform. Understand the risks involved in trading financial instruments." />
            </Helmet>

            <AiPredictionHeader />

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-4 overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 to-black"></div>
                <div className="container mx-auto relative z-10">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors"
                    >
                        <FaArrowLeft /> Back to Home
                    </Link>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
                            <FaExclamationTriangle className="text-4xl text-red-400" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tight">Risk Disclaimer</h1>
                            <p className="text-red-400 mt-2 font-semibold">READ THIS CAREFULLY. IGNORING THIS IS YOUR RESPONSIBILITY.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Warning Banner */}
            <section className="py-8 px-4 bg-red-950/30 border-y border-red-500/20">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center">
                        <p className="text-red-300 text-lg font-bold leading-relaxed">
                            Trading financial instruments involves substantial risk, including the possible loss of your entire capital.
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="prose prose-invert prose-cyan max-w-none">

                        {/* Section 1 */}
                        <div className="mb-12 p-8 bg-zinc-900/50 rounded-2xl border border-red-500/20">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-red-400">1.</span> Market Risk
                            </h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                Stocks, forex, and crypto markets are:
                            </p>
                            <ul className="space-y-2 text-gray-300 mb-4">
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">⚠</span>
                                    <span>Highly volatile</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">⚠</span>
                                    <span>Influenced by unpredictable events</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">⚠</span>
                                    <span>Subject to sudden price swings</span>
                                </li>
                            </ul>
                            <div className="bg-red-950/40 border border-red-500/30 rounded-xl p-6">
                                <p className="text-red-300 font-bold text-lg">
                                    No AI, algorithm, or software can eliminate risk.
                                </p>
                            </div>
                        </div>

                        {/* Section 2 */}
                        <div className="mb-12 p-8 bg-zinc-900/50 rounded-2xl border border-yellow-500/20">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-yellow-400">2.</span> No Guarantees
                            </h2>
                            <p className="text-gray-300 leading-relaxed mb-4">We do not guarantee:</p>
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-yellow-950/20 border border-yellow-500/20 rounded-xl p-4">
                                    <p className="text-yellow-300 font-semibold">✗ Profits</p>
                                </div>
                                <div className="bg-yellow-950/20 border border-yellow-500/20 rounded-xl p-4">
                                    <p className="text-yellow-300 font-semibold">✗ Accuracy</p>
                                </div>
                                <div className="bg-yellow-950/20 border border-yellow-500/20 rounded-xl p-4">
                                    <p className="text-yellow-300 font-semibold">✗ Win rates</p>
                                </div>
                                <div className="bg-yellow-950/20 border border-yellow-500/20 rounded-xl p-4">
                                    <p className="text-yellow-300 font-semibold">✗ Consistent performance</p>
                                </div>
                            </div>
                            <p className="text-white font-bold">
                                Any displayed probabilities or historical results are not promises.
                            </p>
                        </div>

                        {/* Section 3 */}
                        <div className="mb-12 p-8 bg-zinc-900/50 rounded-2xl border border-red-500/20">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-red-400">3.</span> User Accountability
                            </h2>
                            <p className="text-gray-300 leading-relaxed mb-4">You acknowledge that:</p>
                            <ul className="space-y-3 text-gray-300 mb-4">
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400 font-bold text-xl">→</span>
                                    <span className="font-semibold">You are responsible for all trading decisions</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400 font-bold text-xl">→</span>
                                    <span className="font-semibold">Losses are your sole responsibility</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400 font-bold text-xl">→</span>
                                    <span className="font-semibold">The Service is only a decision-support tool</span>
                                </li>
                            </ul>
                            <div className="bg-red-950/40 border border-red-500/30 rounded-xl p-6">
                                <p className="text-red-300 font-bold text-lg text-center">
                                    If you cannot accept losses, do not trade.
                                </p>
                            </div>
                        </div>

                        {/* Section 4 */}
                        <div className="mb-12 p-8 bg-zinc-900/50 rounded-2xl border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-cyan-400">4.</span> Regulatory Disclaimer
                            </h2>
                            <p className="text-gray-300 leading-relaxed mb-4">We are not registered as:</p>
                            <div className="space-y-3 mb-4">
                                <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-white/5">
                                    <span className="text-red-500 text-xl">✗</span>
                                    <span className="text-gray-300">A SEBI investment advisor</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-white/5">
                                    <span className="text-red-500 text-xl">✗</span>
                                    <span className="text-gray-300">A SEC-registered advisor</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-white/5">
                                    <span className="text-red-500 text-xl">✗</span>
                                    <span className="text-gray-300">A broker or dealer</span>
                                </div>
                            </div>
                            <p className="text-white font-bold text-lg">
                                We provide software, not regulated financial services.
                            </p>
                        </div>

                        {/* Section 5 - Final Warning */}
                        <div className="mb-12 p-8 bg-gradient-to-br from-red-950/40 to-orange-950/40 rounded-2xl border-2 border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="text-red-400">5.</span> Final Warning
                            </h2>
                            <div className="bg-black/40 rounded-xl p-6 border border-red-500/20">
                                <p className="text-red-300 font-semibold mb-4 text-lg">
                                    If you are:
                                </p>
                                <ul className="space-y-3 text-gray-300 mb-6">
                                    <li className="flex items-start gap-3">
                                        <span className="text-red-400 text-2xl">⚠</span>
                                        <span className="text-lg">Emotionally reactive</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-red-400 text-2xl">⚠</span>
                                        <span className="text-lg">Financially dependent on trading income</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-red-400 text-2xl">⚠</span>
                                        <span className="text-lg">Looking for guaranteed profits</span>
                                    </li>
                                </ul>
                                <div className="text-center pt-4 border-t border-red-500/20">
                                    <p className="text-red-400 font-black text-2xl uppercase tracking-wider">
                                        This product is not suitable for you.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Final Notice */}
                        <div className="p-8 bg-gradient-to-r from-red-950/30 to-orange-950/30 rounded-2xl border border-red-500/30">
                            <p className="text-center text-gray-300 text-sm leading-relaxed">
                                By using our Service, you acknowledge that you have read, understood, and accept all risks outlined in this disclaimer.
                                <span className="block mt-2 text-red-400 font-semibold">
                                    You trade entirely at your own risk and responsibility.
                                </span>
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <AiPredictionFooter />
        </div>
    );
};

export default RiskDisclaimer;
