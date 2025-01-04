'use client';

import {useState} from 'react';
import {Card} from '@/components/ui/card';
import Image from "next/image";

type SubmissionState = 'idle' | 'loading' | 'success' | 'error';

const LandingPage = () => {
    const [email, setEmail] = useState('');
    const [state, setState] = useState<SubmissionState>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState('loading');

        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email})
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setState('success');
            setMessage('Thanks for joining our waitlist!');
            setEmail('');
        } catch (error) {
            setState('error');
            setMessage(error instanceof Error ? error.message : 'Something went wrong');
        }
    };

    return (
        <div className="min-h-screen bg-white relative">
            {/* Logo */}
            <div className="w-24 mx-auto pt-8">
                <svg width="105" height="54" viewBox="0 0 105 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M42.7771 34.9975C45.6999 36.7211 49.3865 37.1676 53.8377 36.3361L53.7424 36.3581C56.2306 35.677 57.8188 33.9967 58.5077 31.3156L58.4802 31.4542C58.8613 28.5826 57.3778 26.9243 54.0306 26.4802C51.2306 26.1094 47.2613 26.4999 42.122 27.6527C41.5307 27.7857 40.9354 27.4487 40.7441 26.8739C40.5535 26.2983 40.8291 25.6724 41.3818 25.4251C47.6141 22.6354 51.4235 18.7756 52.8109 13.8457L52.8022 13.8764C54.0274 9.02601 52.4794 5.55911 48.1566 3.47644L48.2235 3.50636C42.9551 1.35756 37.9307 2.29299 33.1496 6.31265L33.1441 6.31737C31.1126 8.00555 28.7804 10.7811 26.1473 14.6433L26.1623 14.6205C24.6379 16.9748 22.752 20.7708 20.5064 26.0078C20.4946 26.0338 20.4828 26.0598 20.4694 26.085C19.9261 27.1346 19.3954 28.0235 18.8765 28.7511L18.8828 28.7424C17.3891 30.8763 15.7198 32.3739 13.8749 33.2361L13.8545 33.2455C10.5214 34.7274 7.25924 34.5967 4.06792 32.8542C4.04351 32.84 4.01831 32.8259 3.99469 32.8101C0.921485 30.8282 -0.378507 28.0818 0.0947186 24.5724L0.0978682 24.5527C0.629361 21.0622 2.5325 18.6385 5.80807 17.2811C5.83563 17.2693 5.86397 17.259 5.89232 17.2496C9.89859 15.9378 13.3419 16.2212 16.223 18.1015L16.2048 18.0897C17.6135 18.974 18.6686 20.4913 19.3702 22.6417L19.2749 22.4259C19.2954 22.4621 19.3159 22.5007 19.3355 22.5409V22.5401C19.8387 23.5677 20.3631 27.5511 20.908 34.4912L20.8969 34.3975C21.1284 35.844 21.4143 37.1998 21.7544 38.466L21.7497 38.4487C22.5324 41.1935 23.6371 43.4006 25.0654 45.0683H25.0662C29.0355 49.7069 34.8945 51.5753 42.6417 50.673L41.7401 51.2856C42.3133 50.221 41.9826 47.9202 40.7472 44.3825L40.7385 44.3565C39.5756 40.7589 38.1008 37.866 36.3142 35.677C36.3071 35.6676 36.2992 35.6581 36.2921 35.6487C33.4039 31.8794 28.941 29.6511 22.9032 28.9653C22.2552 28.892 21.7906 28.307 21.8639 27.6598C21.9371 27.0125 22.5221 26.5472 23.1694 26.6212C29.8717 27.3826 34.8709 29.9133 38.1653 34.214L38.1425 34.1849C40.1157 36.603 41.7299 39.7518 42.9842 43.6305L42.9755 43.6045C44.4393 47.7974 44.7196 50.7305 43.8165 52.4053C43.6338 52.7438 43.2976 52.9722 42.9149 53.0171C34.3347 54.0155 27.7874 51.8777 23.2733 46.6029C21.6213 44.6738 20.3568 42.1707 19.4804 39.0951L19.4757 39.0778C19.1143 37.7329 18.8119 36.2975 18.567 34.7707C18.5623 34.7392 18.5584 34.7077 18.556 34.6762C18.034 28.0353 17.5875 24.3362 17.2167 23.5787C17.2174 23.581 17.2198 23.585 17.2222 23.5889C17.1828 23.5204 17.1513 23.448 17.1269 23.3732C16.6025 21.7645 15.8765 20.67 14.9505 20.0889L14.9332 20.0771C12.6844 18.6102 9.91591 18.4149 6.62696 19.4921L6.71121 19.4606C4.25532 20.4787 2.82856 22.2944 2.43014 24.9078L2.43329 24.8881C2.09313 27.407 3.04037 29.3865 5.27342 30.8274L5.19941 30.7834C7.70805 32.1534 10.2734 32.255 12.8962 31.0889L12.8765 31.0983C14.3395 30.4149 15.6978 29.1786 16.9497 27.3897L16.9552 27.381C17.4096 26.7448 17.882 25.9511 18.3741 24.9999L18.3379 25.0779C20.6363 19.7181 22.5843 15.8047 24.182 13.3378L24.1969 13.315C26.9544 9.26932 29.4347 6.33154 31.6362 4.50242L31.6307 4.50636C37.1394 -0.12432 42.9669 -1.18652 49.1149 1.32134C49.1369 1.33079 49.159 1.34024 49.181 1.35126C54.6605 3.99061 56.6298 8.3583 55.0904 14.4543C55.0881 14.4646 55.0849 14.4748 55.0826 14.4842C53.4959 20.1236 49.2503 24.4881 42.3456 27.5786L41.6055 25.3503C47.018 24.1362 51.2637 23.733 54.3408 24.1417C59.2479 24.7921 61.4077 27.333 60.8195 31.7645C60.8132 31.8109 60.8046 31.8574 60.7927 31.903C59.877 35.4684 57.7345 37.7124 54.3652 38.6337C54.3337 38.6424 54.3022 38.6494 54.2707 38.6557C49.2401 39.5951 45.0094 39.0534 41.5787 37.0306C41.0173 36.6991 40.8307 35.9762 41.1614 35.4148C41.4921 34.8534 42.2157 34.6668 42.7771 34.9975Z"
                        fill="black"/>
                    <path
                        d="M20.8032 38.6841C21.4379 38.5085 22.3631 37.8117 23.5788 36.5944L23.5678 36.6054C24.6221 35.5219 25.3796 34.3959 25.841 33.2282C26.0804 32.6219 26.7662 32.3251 27.3717 32.5645C27.978 32.8038 28.2748 33.4896 28.0355 34.0952C27.4583 35.5566 26.5331 36.9416 25.2599 38.251L25.2489 38.2621C23.7394 39.7731 22.4678 40.6715 21.4332 40.9581C20.8056 41.1321 20.1552 40.7644 19.9812 40.1361C19.8072 39.5085 20.1757 38.8581 20.8032 38.6841Z"
                        fill="black"/>
                    <path
                        d="M27.1402 47.8021C28.5181 47.1777 29.7953 46.1824 30.974 44.8163L30.9748 44.8155C31.8669 43.7832 32.4472 42.5895 32.7142 41.2344C32.8409 40.5951 33.4614 40.1793 34.1 40.3053C34.7394 40.4313 35.1559 41.0518 35.0291 41.6911C34.6819 43.4549 33.9252 45.0108 32.7598 46.3588L32.7606 46.358C31.3559 47.9864 29.8071 49.184 28.115 49.9509C27.5213 50.2202 26.8221 49.9572 26.5528 49.3635C26.2843 48.7706 26.5473 48.0714 27.1402 47.8021Z"
                        fill="black"/>
                    <path
                        d="M8.81749 18.8204C7.69782 18.4354 6.63719 17.5425 5.6372 16.1417L5.62775 16.1291C4.36634 14.3142 3.45532 12.5646 2.8947 10.8811C2.68919 10.263 3.02383 9.5945 3.64194 9.38899C4.26004 9.18348 4.92776 9.51734 5.13405 10.1354C5.62303 11.6047 6.43326 13.1535 7.56553 14.7827L7.55687 14.7708C8.26474 15.7614 8.94033 16.3677 9.58442 16.5889C10.2009 16.8008 10.5285 17.4724 10.3167 18.0881C10.1049 18.7047 9.43403 19.0322 8.81749 18.8204Z"
                        fill="black"/>
                    <path
                        d="M63 6.399C65.7495 3.07941 74.5 -1.5 79.0117 6.399C83.8023 14.7862 72.9257 20.2857 65.4593 22.6863C65.3438 22.7234 65.3813 22.9065 65.502 22.8952C71.9201 22.2954 81.923 21.8827 81.923 28.6877C81.923 36.4137 74.6449 39.1207 64.4556 35.3269"
                        stroke="black" strokeWidth="2.5" strokeLinecap="round"/>
                    <path
                        d="M84 6.399C86.7495 3.07941 95.5 -1.5 100.012 6.399C104.802 14.7862 93.9257 20.2857 86.4593 22.6863C86.3438 22.7234 86.3813 22.9065 86.502 22.8952C92.9201 22.2954 102.923 21.8827 102.923 28.6877C102.923 36.4137 95.6449 39.1207 85.4556 35.3269"
                        stroke="black" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
            </div>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-6 py-24 relative">
                {/* Left Image */}

                <Image
                    src="/images/left-image.png"
                    alt="Left Decorative Image"
                    width={300}
                    height={400}
                    priority
                    className="absolute left-0 top-1/2 -translate-y-1/2"
                />


                {/* Right Image */}

                <Image
                    src="/images/right-image.png"
                    alt="Right Decorative Image"
                    width={300}
                    height={400}
                    priority
                    className="absolute right-0 top-1/2 -translate-y-1/2"
                />


                {/* Center Content */}
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-6xl font-bold mb-8">
                        Cinema, Reimagined.
                    </h1>

                    <p className="text-xl text-gray-600 mb-12">
                        {"Access blockbuster and independent films you can't see in your\
                        local theater. Experience exclusive releases from anywhere in\
                        the world—all in one virtual cinema."}
                    </p>

                    {/* Email Input */}
                    <div className="flex max-w-lg mx-auto">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@email.com"
                            className="flex-1 p-3 rounded-l-full border-y border-l focus:outline-none focus:border-black"
                            disabled={state === 'loading'}
                            required
                        />
                        <button
                            type="submit"
                            disabled={state === 'loading'}
                            className="bg-black text-white px-6 py-3 rounded-r-full hover:bg-gray-800 disabled:opacity-50"
                            onClick={handleSubmit}
                        >
                            {state === 'loading' ? 'Joining...' : 'Join the waitlist'}
                        </button>
                    </div>

                    {message && (
                        <p className={`mt-4 text-center ${state === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                            {message}
                        </p>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="absolute bottom-0 w-full border-t border-gray-200">
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                            PROJECT X 2025. ALL RIGHTS RESERVED
                        </div>
                        <div className="flex gap-8">
                            <a href="#" className="text-sm text-gray-600 hover:text-black">INSTAGRAM</a>
                            <a href="#" className="text-sm text-gray-600 hover:text-black">TWITTER</a>
                            <a href="#" className="text-sm text-gray-600 hover:text-black">FILMMAKER? PARTNER WITH
                                US</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;