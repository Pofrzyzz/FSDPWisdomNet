import React from "react";
import { useState } from "react";
import NavBar from "../components/navbar";
import CommonFaqs from "../components/commonfaqs";
import CardBanner from '../images/CardBanner.png';
import ChevronRight from '../images/chevron-right.svg';

function CardsFaq() {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleVisibility = () => {
        const element = document.getElementById('extraSquares');
        element.classList.toggle('max-h-0');
        element.classList.toggle('max-h-screen');
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="font-opensans">
            <div>
                <NavBar />
            </div>
            <div className="relative w-full h-[450px] overflow-hidden">
                <img
                    src={CardBanner}
                    alt="Card Banner"
                    className="w-full h-full object-cover"
                />
                {/* Back button */}
                <div className="absolute top-4 left-4 text-white text-lg font-semibold cursor-pointer">
                    <span>&larr; Back to Help & Support</span>
                </div>
                {/* Centered title */}
                <div className="font-geomanist absolute inset-0 flex items-center justify-center text-white text-[80px] font-bold transform -translate-y-[-15%]">
                    Cards
                </div>
                {/* Bottom border */}
                <div className="w-full h-[2px] bg-red-500 absolute bottom-0"></div>
            </div>

            {/* Text Section */}
            <div className="text-center mt-8 text-5xl font-geomanist font-bold">How can we help?</div>




            {/* Top 4 square buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8 mx-auto max-w-[1280px]">
            <div className="bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg  hover:bg-[#E0E0E0] w-[300px] h-[150px] relative">
            <div className="flex justify-between items-start">
                <h3 className="font-bold text-xl max-w-[10rem]">
                    Card Activation
                </h3>
                <img src={require('../images/CardActivation.webp')} alt="Card Activation" className="w-10 h-10" />
            </div>
            <div className="absolute bottom-4 right-4 flex items-center">
                <p className="text-lg mr-1">Learn more</p>
                <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
            </div>
            </div>
            <div className="bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg  hover:bg-[#E0E0E0] w-[300px] h-[150px] relative">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl max-w-[10rem]">
                        Overseas Card Usage
                    </h3>
                    <img src={require('../images/globe.svg').default} alt="OverseasCard" className="w-10 h-10" />

                </div>
                <div className="absolute bottom-4 right-4 flex items-center">
                    <p className="text-lg mr-1">Learn more</p>
                    <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                </div>
            </div>
            <div className="bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg  hover:bg-[#E0E0E0] w-[300px] h-[150px] relative">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl max-w-[10rem]">
                        Apply for Card
                    </h3>
                    <img src={require('../images/form.svg').default} alt="OverseasCard" className="w-10 h-10" />
                </div>
                <div className="absolute bottom-4 right-4 flex items-center">
                    <p className="text-lg mr-1">Learn more</p>
                    <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                </div>
            </div>
            <div className="bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg  hover:bg-[#E0E0E0] w-[300px] h-[150px] relative">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl max-w-[10rem]">
                        Card Cancellation
                    </h3>
                    <img src={require('../images/CardCancel.png')} alt="Card Cancellation" className="w-10 h-10" />
                </div>
                <div className="absolute bottom-4 right-4 flex items-center">
                    <p className="text-lg mr-1">Learn more</p>
                    <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                </div>
            </div>
            </div>
            {/* Bottom 4 Squares */}
            <div id="extraSquares" className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8 mx-auto max-w-[1280px] overflow-hidden transition-max-height duration-500 ease-in-out max-h-0">
            <div className="bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg  hover:bg-[#E0E0E0] w-[300px] h-[150px] relative">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl max-w-[10rem]">
                        Balance
                    </h3>
                    <img src={require('../images/dollar.svg').default} alt="Balance" className="w-10 h-10" />
                </div>
                <div className="absolute bottom-4 right-4 flex items-center">
                    <p className="text-lg mr-1">Learn more</p>
                    <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                </div>
            </div>
            <div className="bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg  hover:bg-[#E0E0E0] w-[300px] h-[150px] relative">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl max-w-[10rem]">
                        Transaction
                    </h3>
                    <img src={require('../images/transaction.svg').default} alt="Transcations" className="w-10 h-10" />
                </div>
                <div className="absolute bottom-4 right-4 flex items-center">
                    <p className="text-lg mr-1">Learn more</p>
                    <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                </div>
            </div>
            <div className="bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg  hover:bg-[#E0E0E0] w-[300px] h-[150px] relative">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl max-w-[10rem]">
                        Card Replacement
                    </h3>
                    <img src={require('../images/CardReplacement.png')} alt="Card Replacement" className="w-10 h-10" />
                </div>
                <div className="absolute bottom-4 right-4 flex items-center">
                    <p className="text-lg mr-1">Learn more</p>
                    <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                </div>
            </div>
            <div className="bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg  hover:bg-[#E0E0E0] w-[300px] h-[150px] relative">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl max-w-[10rem]">
                        Statements
                    </h3>
                    <img src={require('../images/BankStatement.png')} alt="Bank Statement" className="w-10 h-10" />
                </div>
                <div className="absolute bottom-4 right-4 flex items-center">
                    <p className="text-lg mr-1">Learn more</p>
                    <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                </div>
            </div>
        </div>

        <div className="mt-8">
            {/* View More/ Less button */}
            <div className="flex justify-center mt-8">
                <button
                    onClick={toggleVisibility}
                    className="bg-red-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-red-600"
                >
                    {isExpanded ? 'View Less' : 'View More'}
                </button>
            </div>

        {/* Help section */}
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
    <div className="mb-16">
        <CommonFaqs />
    </div>    

        </div>
        </div>
    );
}

export default CardsFaq;
