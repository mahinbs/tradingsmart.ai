import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';

interface BootcampFormData {
    name: string;
    phone: string;
    age: string;
    hasTraded: string;
    markets: string;
    biggestLoss: string;
    capital: string;
    reason: string;
    attendLive: boolean;
    seriousInvest: string;
}

const AiTradingBootcamp = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<BootcampFormData>({
        defaultValues: {
            name: '',
            phone: '',
            age: '',
            hasTraded: 'no',
            markets: '',
            biggestLoss: '',
            capital: '',
            reason: '',
            attendLive: false,
            // seriousInvest is radio, no default selected or 'maybe' if preferred, but validation requires selection if checked
        }
    });

    const hasTraded = watch('hasTraded');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data: BootcampFormData) => {
        // Double check attendLive just in case, though validation handles it
        if (!data.attendLive) return;

        setIsSubmitting(true);

        try {
            const emailBody = `
Name: ${data.name} \n
Phone: ${data.phone} \n
Age: ${data.age} \n
Has Traded: ${data.hasTraded} \n
Markets: ${data.markets || 'N/A'} \n
Biggest Loss: ${data.biggestLoss} \n
Capital Available: ${data.capital} \n
Reason: ${data.reason} \n
Attend Live: ${data.attendLive ? 'Yes' : 'No'} \n
Serious about investing in tools: ${data.seriousInvest} \n
            `.trim();

            const response = await fetch('https://send-mail-redirect-boostmysites.vercel.app/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    body: emailBody,
                    name: 'Tradingsmart.AI',
                    subject: `New Bootcamp Application from ${data.name}`,
                    to: 'mpranavprem@gmail.com'
                    // to: 'partnerships@tradingsmart.ai'
                })
            });

            if (response.ok) {
                navigate('/ai-trading-bootcamp/thank-you');
            } else {
                alert('Failed to submit application. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-black">
            <Helmet>
                <title>AI Trading Bootcamp Application | Tradingsmart.AI</title>
                <meta name="description" content="Apply for the AI Trading Bootcamp. Only serious learners will be shortlisted." />
            </Helmet>

            <div className="absolute top-6 left-6 z-50">
                <Link to="/">
                    <Button variant="ghost" className="text-gray-400 hover:text-white flex items-center gap-2 hover:bg-white/10 transition-all">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Home
                    </Button>
                </Link>
            </div>

            <main className="relative pt-32 pb-20 px-4 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-linear-to-b from-black via-gray-900 to-black z-0"></div>
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse animation-delay-2000"></div>
                </div>

                <div className="container mx-auto z-10 relative max-w-3xl">
                    <div className="text-center mb-12">
                        <span className="inline-block py-1 px-3 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 font-bold tracking-wider uppercase text-sm mb-4 animate-pulse">
                            Only serious learners will be shortlisted
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black mb-6 text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 pb-3">
                            AI Trading Bootcamp Application
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Fill out the form below to apply for a spot.
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 md:p-10 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                            {/* Personal Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-300">Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        className={`w-full bg-black/50 border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 focus:outline-hidden focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-white placeholder:text-gray-600`}
                                        placeholder="John Doe"
                                        {...register('name', { required: 'Name is required' })}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-300">Phone <span className="text-red-500">*</span></label>
                                    <input
                                        type="tel"
                                        className={`w-full bg-black/50 border ${errors.phone ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 focus:outline-hidden focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-white placeholder:text-gray-600`}
                                        placeholder="+91 98765 43210"
                                        {...register('phone', {
                                            required: 'Phone is required',
                                            pattern: {
                                                value: /^\+?[0-9\s-]{10,}$/,
                                                message: 'Invalid phone number'
                                            }
                                        })}
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-300">Age <span className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    className={`w-full bg-black/50 border ${errors.age ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 focus:outline-hidden focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-white placeholder:text-gray-600`}
                                    placeholder="25"
                                    {...register('age', {
                                        required: 'Age is required',
                                        min: { value: 18, message: 'You must be at least 18 years old' }
                                    })}
                                />
                                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
                            </div>

                            {/* Trading Experience */}
                            <div className="space-y-4 pt-4 border-t border-gray-800">
                                <label className="text-sm font-semibold text-gray-300 block">Have you traded before? <span className="text-red-500">*</span></label>
                                <div className="flex gap-6">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            value="yes"
                                            className="accent-cyan-500 w-5 h-5"
                                            {...register('hasTraded', { required: 'Please select an option' })}
                                        />
                                        <span className="text-gray-300">Yes</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            value="no"
                                            className="accent-cyan-500 w-5 h-5"
                                            {...register('hasTraded', { required: 'Please select an option' })}
                                        />
                                        <span className="text-gray-300">No</span>
                                    </label>
                                </div>
                                {errors.hasTraded && <p className="text-red-500 text-xs mt-1">{errors.hasTraded.message}</p>}
                            </div>

                            {hasTraded === 'yes' && (
                                <div className="space-y-2 animate-fade-in-mobile">
                                    <label className="text-sm font-semibold text-gray-300">If yes, what markets? <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        className={`w-full bg-black/50 border ${errors.markets ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 focus:outline-hidden focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-white placeholder:text-gray-600`}
                                        placeholder="Stocks, Foreman, Crypto, etc."
                                        {...register('markets', { required: 'Please specify the markets' })}
                                    />
                                    {errors.markets && <p className="text-red-500 text-xs mt-1">{errors.markets.message}</p>}
                                </div>
                            )}

                            {/* Financial Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-300">Biggest loss till date <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        className={`w-full bg-black/50 border ${errors.biggestLoss ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 focus:outline-hidden focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-white placeholder:text-gray-600`}
                                        placeholder="e.g. ₹50,000"
                                        {...register('biggestLoss', { required: 'This field is required' })}
                                    />
                                    {errors.biggestLoss && <p className="text-red-500 text-xs mt-1">{errors.biggestLoss.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-300">Current capital available <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        className={`w-full bg-black/50 border ${errors.capital ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 focus:outline-hidden focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-white placeholder:text-gray-600`}
                                        placeholder="e.g. ₹1,00,000"
                                        {...register('capital', { required: 'This field is required' })}
                                    />
                                    {errors.capital && <p className="text-red-500 text-xs mt-1">{errors.capital.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-300">Why do you want to learn AI trading? <span className="text-red-500">*</span></label>
                                <textarea
                                    rows={3}
                                    className={`w-full bg-black/50 border ${errors.reason ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 focus:outline-hidden focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-white placeholder:text-gray-600`}
                                    placeholder="Briefly explain your motivation..."
                                    {...register('reason', { required: 'Please explain your reason' })}
                                />
                                {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason.message}</p>}
                            </div>

                            {/* Commitments */}
                            <div className="space-y-4 pt-4 border-t border-gray-800">
                                <div className="space-y-2">
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                className="peer sr-only"
                                                {...register('attendLive', { required: 'You must agree to attend live' })}
                                            />
                                            <div className={`w-6 h-6 border-2 ${errors.attendLive ? 'border-red-500' : 'border-gray-600'} rounded-md peer-checked:bg-cyan-500 peer-checked:border-cyan-500 transition-all`}></div>
                                            <svg className="absolute w-4 h-4 text-white left-1 top-1 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <span className={`font-medium ${errors.attendLive ? 'text-red-400' : 'text-gray-200'}`}>Are you willing to attend all 7 days live?</span>
                                            <p className="text-xs text-cyan-400 mt-1">* Mandatory requirement</p>
                                        </div>
                                    </label>
                                    {errors.attendLive && <p className="text-red-500 text-xs mt-1 ml-9">{errors.attendLive.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-3 pt-2">
                                <label className="text-sm font-semibold text-gray-300 block">Are you serious about investing in tools if it makes sense? <span className="text-red-500">*</span></label>
                                <div className="space-y-2">
                                    {['Yes', 'Maybe', 'Just exploring'].map((option) => (
                                        <label key={option} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-gray-800 hover:border-gray-700 hover:bg-white/5 transition-all">
                                            <input
                                                type="radio"
                                                value={option.toLowerCase()}
                                                className="accent-cyan-500 w-4 h-4"
                                                {...register('seriousInvest', { required: 'Please select an option' })}
                                            />
                                            <span className="text-gray-300">{option}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.seriousInvest && <p className="text-red-500 text-xs mt-1">{errors.seriousInvest.message}</p>}
                            </div>

                            <div className="pt-6">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 text-lg rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed">
                                    {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                                </Button>
                            </div>

                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AiTradingBootcamp;
