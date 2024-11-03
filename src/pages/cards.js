import React from "react";
import { useState } from "react";
import NavBar from "../components/navbar";
import CommonFaqs from "../components/commonfaqs";
import CardBanner from '../images/CardBanner.png';
import ChevronRight from '../images/chevron-right.svg';
import Help from "../components/help";
import Footer from "../components/footer"
import Modal from "../components/popup";

function CardsFaq() {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleVisibility = () => {
        setIsExpanded(!isExpanded);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [modalTitle, setModalTitle] = useState(""); 

    const openModal = (content, title) => {
        setModalContent(content);
        setModalTitle(title); // Set the title in state
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="font-opensans">
            <div>
                <NavBar />
            </div>

            <section className="flex flex-col min-h-screen">
            <div className="relative w-full h-80 md:h-96 overflow-hidden">
                <img
                    src={CardBanner}
                    alt="Card Banner"
                    className="w-full h-full object-cover"
                />
                {/* Back button */}
                <div className="absolute top-40 left-16 text-lg font-semibold cursor-pointer z-10 flex items-center">
                    <img src={require('../images/arrow-left-red.svg').default} alt="Back" className="w-5 h-5 mr-2" />
                    <span className="text-white">Back to Help & Support</span>
                </div>

                {/* Centered title */}
                <div className="font-geomanist text-7xl font-bold absolute inset-0 flex items-center justify-center text-white font-bold transform -translate-y-[-18%]">
                    Cards
                </div>
                {/* Bottom border */}
                <div className="w-full h-[2px] bg-red-500 absolute bottom-0"></div>
            </div>

            {/* Text Section */}
            <div className="text-center mt-8 text-5xl font-geomanist font-bold">How can we help?</div>

            {/* Top 4 square buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8 mx-auto max-w-[1280px]">
                {/* Card Activation Button */}
                <div 
                    onClick={() => openModal("Card Activation Tutorial", "Card Activation")} 
                    className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
                >
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xl max-w-[10rem]">Card Activation</h3>
                        <img src={require('../images/CardActivation.webp')} alt="Card Activation" className="w-10 h-10" />
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center">
                        <p className="text-lg mr-1">Learn more</p>
                        <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                    </div>
                </div>

                {/* Overseas Card Usage Button */}
                <div 
                    onClick={() => openModal("Overseas Card Usage Content", "Overseas Card Usage")} 
                    className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
                >
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xl max-w-[10rem]">Overseas Card Usage</h3>
                        <img src={require('../images/globe.svg').default} alt="Overseas Card Usage" className="w-10 h-10" />
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center">
                        <p className="text-lg mr-1">Learn more</p>
                        <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                    </div>
                </div>

                {/* Apply for Card Button */}
                <div 
                    onClick={() => openModal("Apply for Card Content", "Apply for Card")} 
                    className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
                >
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xl max-w-[10rem]">Apply for Card</h3>
                        <img src={require('../images/form.svg').default} alt="Apply for Card" className="w-10 h-10" />
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center">
                        <p className="text-lg mr-1">Learn more</p>
                        <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                    </div>
                </div>

                {/* Card Cancellation Button */}
                <div 
                    onClick={() => openModal("Card Cancellation Content", "Card Cancellation")} 
                    className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
                >
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xl max-w-[10rem]">Card Cancellation</h3>
                        <img src={require('../images/CardCancel.png')} alt="Card Cancellation" className="w-10 h-10" />
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center">
                        <p className="text-lg mr-1">Learn more</p>
                        <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                    </div>
                </div>
            </div>
            {/* Bottom 4 Squares */}
            <div id="extraButtons" className={isExpanded ? "grid grid-cols-2 md:grid-cols-4 gap-8 mt-8 mx-auto max-w-[1280px]" : "hidden"}>
            <div 
                onClick={() => openModal("Balance Content", "Balance")} 
                className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
            >
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

            <div 
                onClick={() => openModal("Transaction Content", "Transaction")} 
                className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
            >
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl max-w-[10rem]">
                        Transaction
                    </h3>
                    <img src={require('../images/transaction.svg').default} alt="Transaction" className="w-10 h-10" />
                </div>
                <div className="absolute bottom-4 right-4 flex items-center">
                    <p className="text-lg mr-1">Learn more</p>
                    <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                </div>
            </div>

            <div 
                onClick={() => openModal("Card Replacement Content", "Card Replacement")} 
                className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
            >
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

            <div 
                onClick={() => openModal("Statements Content", "Statements")} 
                className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
            >
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl max-w-[10rem]">
                        Statements
                    </h3>
                    <img src={require('../images/BankStatement.png')} alt="Card Cancellation" className="w-10 h-10" />
                </div>
                <div className="absolute bottom-4 right-4 flex items-center">
                    <p className="text-lg mr-1">Learn more</p>
                    <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                </div>
            </div>
            </div>

        <div className="mt-2">
        {/* View More/ Less button */}
        <div className="flex justify-center">
            <button
                onClick={toggleVisibility}
                className="bg-red-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-red-600 mt-4"
            >
                {isExpanded ? 'View Less' : 'View More'}
            </button>
        </div>
        </div>

            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal} content={modalContent} title={modalTitle} />
        
        </section>




        <section className="flex flex-col min-h-screen">
        {/* Help section */}
        <Help/>

        <div className="mb-16">
            <CommonFaqs />
        </div>    
        </section>

        <section>
            {/* Footer Component */}
            <Footer /> 
            </section>
        </div>
    );
}

export default CardsFaq;
