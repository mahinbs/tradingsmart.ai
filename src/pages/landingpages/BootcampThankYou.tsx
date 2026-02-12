import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";

const BootcampThankYou = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <Helmet>
                <title>Application Received | Tradingsmart.AI</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            {/* Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black"></div>
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
            </div>

            <div className="relative z-10 max-w-lg w-full text-center space-y-8">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-cyan-500/10 text-cyan-500 mb-6 border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.3)] animate-scale-in">
                    <CheckCircle className="w-12 h-12" />
                </div>

                <div className="space-y-4 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
                        Application Received
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 font-medium">
                        Shortlisting in progress.
                    </p>
                    <p className="text-gray-400">
                        You’ll receive WhatsApp confirmation.
                    </p>
                </div>

                <div className="pt-8 animate-fade-in-up animation-delay-200">
                    <Link to="/">
                        <Button className="bg-white text-black hover:bg-gray-200 font-bold px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                            <ArrowLeft className="mr-2 w-5 h-5" /> Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BootcampThankYou;
