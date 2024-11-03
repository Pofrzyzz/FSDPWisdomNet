import React from 'react';

function Help() {
    return (
            <div className="bg-black text-white p-8 mt-8 rounded-md border-t-2 border-b-2 border-red-500">
            <h2 className="text-center text-2xl font-bold mb-8">Can’t Find What You Need?</h2>
            <div className="flex">
            <div className="w-[55%] px-16">
                <h3 className="text-2xl font-bold mb-4">AI Chatbot & Live Chat Agent</h3>
                <p className="mt-2 text-xl mb-4">To start, click on the “Need help?” button.</p>
                <p className="mt-2 text-xl mb-6">
                Please do not key in confidential information like your account or personal details, unless otherwise prompted. </p>
                <p className="mt-2 text-xl mb-6">
                    Your use of the service is subject to the <a href="#" className="underline">terms and conditions</a>.
                </p>
            </div>
            <div className="w-[1px] bg-gray-800 mx-4"></div>
            <div className="flex-1 flex justify-center items-center">
            <button
                onClick={() => window.location.href='/LiveChat'}
                className="bg-red-500 text-white font-semibold py-4 px-[4rem] rounded-full flex items-center text-2xl"
            >
                <img src={require('../images/chatbot.svg').default} alt="Chatbot Icon" className="w-10 h-10 mr-4" />
                Need help?
            </button>
            </div>
        </div>
        </div>
    );
}

export default Help;