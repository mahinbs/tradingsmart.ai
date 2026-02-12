import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import AiPredictionHeader from '../../components/AiPredictionHeader';
import AiPredictionFooter from '../../components/AiPredictionFooter';

const ThankYou = () => {
    const location = useLocation();
    const { title, message } = location.state || {}; // Destructure dynamic data

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden">
            <Helmet>
                <title>Thank You | Tradingsmart.AI</title>
                <meta name="description" content="Thank you for your enquiry. Our team will get back to you shortly." />
            </Helmet>

            <AiPredictionHeader />

            <main className="relative min-h-[80vh] flex items-center justify-center pt-40 pb-20 px-4 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/50 to-black z-10"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent z-10"></div>

                    {/* Animated Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
                </div>

                <div className="container mx-auto z-10 text-center relative max-w-2xl px-4">
                    {/* Success Icon */}
                    <div className="mb-10 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl animate-pulse"></div>
                            <div className="relative w-28 h-28 bg-linear-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center border-4 border-cyan-400/30 shadow-[0_0_50px_rgba(6,182,212,0.4)] transition-transform hover:scale-105 duration-500">
                                <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Thank You Message */}
                    <h1 className="text-5xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 leading-tight">
                        {title || "Thank You!"}
                    </h1>

                    <div className="space-y-6 mb-12">
                        {message ? (
                            <p className="text-2xl text-gray-200 font-bold">
                                {message}
                            </p>
                        ) : (
                            <>
                                <p className="text-2xl text-gray-200 font-bold">
                                    Your request has been submitted successfully.
                                </p>
                                <p className="text-gray-400 text-lg leading-relaxed max-w-lg mx-auto">
                                    We've received your enquiry and our team will get back to you within <span className="text-cyan-400 font-semibold">24 hours</span>
                                </p>
                            </>
                        )}
                    </div>

                    {/* Return Home Button */}
                    <Link to="/">
                        <Button className="group relative bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black px-12 py-8 rounded-full shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:-translate-y-1">
                            <span className="relative z-10 flex items-center gap-2 text-lg">
                                Back to Home
                                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                        </Button>
                    </Link>
                </div>
            </main>

            <AiPredictionFooter />
        </div>
    );
};

export default ThankYou;
