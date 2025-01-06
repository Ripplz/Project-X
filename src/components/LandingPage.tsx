'use client';

import {useState} from 'react';
import Image from "next/image";
import './LandingPage.css';  // Add this at the top with other imports


type SubmissionState = 'idle' | 'loading' | 'success' | 'error';

const LandingPage = () => {
    const [email, setEmail] = useState('');
    const [state, setState] = useState<SubmissionState>('idle');
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [waitlistPosition, setWaitlistPosition] = useState<number | null>(null);


    const BASE_WAITLIST_COUNT = 50; // Starting point for waitlist numbers

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState('loading');

        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            // Calculate position by adding a small random increment to base count
            const randomIncrement = Math.floor(Math.random() * 10) + 1;
            const position = BASE_WAITLIST_COUNT + randomIncrement;

            setState('success');
            setMessage('Thanks for joining our waitlist!');
            setEmail('');
            setWaitlistPosition(position);
            setShowModal(true);
        } catch (error) {
            setState('error');
            setMessage(error instanceof Error ? error.message : 'Something went wrong');
        }
    };

    const shareMessage = `Join me on Bea Films - a reimagined cinema experience! I'm #${waitlistPosition?.toLocaleString()} on the waitlist.`;
    const shareUrl = "https://beafilms.com"; // Replace with your actual URL

    const handleWhatsAppShare = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage + ' ' + shareUrl)}`, '_blank');
    };

    const handleTwitterShare = () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            // Optionally add visual feedback for successful copy
            alert("Link copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy link:", err);
        }
    };


    return (
        <>
            {/*{ -- header -- }*/}
            <section
                className="section h-screen flex flex-col justify-between py-8 lg:py-16"
            >
                {/*{ -- logo -- }*/}
                <div className="container flex items-center justify-center">
                    <Image
                        src="/images/BeaFilmsLogo.svg"
                        alt=""
                        className="w-36 h-auto"
                        width={576}
                        height={180}
                    />
                </div>

                {/*{ -- header text container -- }*/}
                <div className="container flex flex-col items-center justify-center gap-16">
                    {/*{ -- header text -- }*/}
                    <div
                        className="flex flex-col items-center justify-center lg:w-[800px] gap-4 md:gap-6"
                    >
                        <h1
                            className="text-5xl text-center md:text-6xl lg:text-7xl text-[#202020]"
                        >
                            Cinema, Reimagined.
                        </h1>
                        <p className="text-center md:text-xl text-[#6b6b6b] lg:w-[650px]">
                            Access blockbuster and independent films from anywhere in the world
                            that you can’t see in your local theater.
                        </p>
                    </div>
                    {/*{ -- input field and button on mobile -- }*/}
                    <div
                        className="flex flex-col md:hidden flex-col md:flex-row gap-2 md:border md:border-[#F5F5F5] rounded-full p-2 pl-6 w-full">
                        {/* input */}
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@email.com"
                            className="md:w-56 focus:outline-none border border-[#F5F5F5] rounded-full px-5 py-4 p-2 pl-6 w-full text-center font-regular"
                            disabled={state === 'loading'}
                            required
                        />

                        {/* button */}
                        <button
                            type="submit"
                            disabled={state === 'loading'}
                            className="px-5 py-4 bg-[#202020] text-white rounded-full w-full md:w-fit"
                            onClick={handleSubmit}
                        >
                            {state === 'loading' ? 'Joining...' : 'Join the waitlist'}
                        </button>

                        {/* Status message below form elements */}
                        {message && (
                            <p className={`mt-4 text-center ${state === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                                {message}
                            </p>
                        )}
                    </div>
                    {/*{ -- input field and button on web -- }*/}
                    <div className="hidden md:flex flex-col gap-2">
                        <div className="flex flex-row gap-2 border border-[#F5F5F5] rounded-full p-2 pl-6">
                            {/* input */}
                            <input
                                type="email"
                                value={email}
                                placeholder="name@email.com"
                                onChange={(e) => setEmail(e.target.value)}
                                className="text-lg w-56 focus:outline-none rounded-full p-2 pl-3 font-regular"
                                disabled={state === 'loading'}
                                required
                            />

                            {/* button */}
                            <button
                                type="submit"
                                disabled={state === 'loading'}
                                onClick={handleSubmit}
                                className="text-lg px-5 py-5 bg-[#202020] text-white rounded-full w-full md:w-fit hover:bg-black"
                            >
                                {state === 'loading' ? 'Joining...' : 'Join the waitlist'}
                            </button>
                        </div>

                        {/* Status message below form elements */}
                        {message && (
                            <p className={`mt-4 text-center ${state === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                                {message}
                            </p>
                        )}
                    </div>
                </div>


                <footer
                    className="container flex flex-col md:flex-row justify-between items-center"
                >
                    <p className="text-[#686868]">Bea Films 2025. All rights reserved</p>

                    <div className="flex flex-row gap-5 items-center pt-4 md:pt-0">
                        <a href="#" className="text-[#686868] hover:text-black">Inst</a>

                        <div>&#x2022;</div>
                        <a href="#" className="text-[#686868] hover:text-black">Twt</a>
                        <div>&#x2022;</div>
                        <a
                            target={"_blank"}
                            href="https://docs.google.com/forms/d/e/1FAIpQLSelNOwJpNwZ_u5fPrpWfBvipOwb_x0uXF2qS-qP6AMtLZJUAA/viewform?usp=preview"
                            className="decoration underline underline-offset-2 text-[#686868] hover:text-black"
                        >Get in touch</a
                        >
                    </div>
                </footer>
                {showModal && (
                    <div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setShowModal(false)} // Close when clicking overlay
                    >
                        <div
                            className="flex flex-col bg-white rounded-xl w-fit p-4 items-center justify-center gap-8"
                            onClick={e => e.stopPropagation()} // Prevent closing when clicking modal content
                        >
                            {/* image */}
                            <img src="/images/Congratulations.png" alt="" className="w-24 h-auto"/>

                            {/* text */}
                            <div className="flex flex-col w-[320px] text-center items-center justify-center gap-2">
                                <p className="text-xl">
                                    You&apos;re <span className="font-parkinsSemiBold">#{waitlistPosition}</span> on the
                                    waitlist!
                                </p>
                                <p className="text-[#6B6B6B]">
                                    Want to move up on the list? Just get your friends to sign up.
                                </p>
                            </div>

                            {/* social share icons */}
                            <div className="flex gap-3">
                            {/* whatsapp */}
                                <button
                                    onClick={handleWhatsAppShare}
                                    className="w-12 h-12 pt-1 rounded-full bg-[#F9F9F9] hover:bg-[#EFEFEF]"
                                >
                                    <i className="fi fi-brands-whatsapp text-[#141B34] text-xl"></i>
                                </button>

                                {/* twitter */}
                                <button
                                    onClick={handleTwitterShare}
                                    className="w-12 h-12 pt-1 rounded-full bg-[#F9F9F9] hover:bg-[#EFEFEF]"
                                >
                                    <i className="fi fi-brands-twitter text-[#141B34] text-xl"></i>
                                </button>

                                {/* copy link */}
                                <button
                                    onClick={handleCopyLink}
                                    className="w-12 h-12 pt-1 rounded-full bg-[#F9F9F9] hover:bg-[#EFEFEF]"
                                >
                                    <i className="fi fi-rr-link text-[#141B34] text-xl"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </section>

        </>
    );
};

export default LandingPage;
