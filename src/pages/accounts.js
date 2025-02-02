import React from "react";
import { useState } from "react";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavBar from "../components/navbar";
import CommonFaqs from "../components/commonfaqs";
import AccountBanner from '../images/account.png';
import ChevronRight from '../images/chevron-right.svg';
import Help from "../components/needhelp";
import Footer from "../components/footer"
import Modal from "../components/popup";
import Chatbot from '../components/aichatbot/aichatbot';


function AccountFaq() {

    const location = useLocation();
    useEffect(() => {
        // Retrieve the popupId from the URL
        const queryParams = new URLSearchParams(location.search);
        const popupId = queryParams.get('popupButton');
        
        // Directly find the button by ID and trigger a click if the popupId exists
        if (popupId) {
          const button = document.getElementById(popupId);
          if (button) {
            button.click();
          }
        }
      }, [location]);

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
                    src={AccountBanner}
                    alt="Account Banner"
                    className="w-full h-full object-cover"
                />
                {/* Back button */}
                <Link to="/HomePage">
                    <div className="absolute top-40 left-16 text-lg font-semibold cursor-pointer z-10 flex items-center hover:underline hover:decoration-white">
                        <img src={require('../images/arrow-left-red.svg').default} alt="Back" className="w-5 h-5 mr-2" />
                        <span className="text-white">Back to Help & Support</span>
                    </div>
                </Link>

                {/* Centered title */}
                <div className="font-geomanist text-7xl font-bold absolute inset-0 flex items-center justify-center text-white font-bold transform -translate-y-[-18%]">
                    Accounts
                </div>
                {/* Bottom border */}
                <div className="w-full h-[2px] bg-red-500 absolute bottom-0"></div>
            </div>

            {/* Text Section */}
            <div className="text-center mt-8 text-5xl font-geomanist font-bold">How can we help?</div>

            {/* Top 4 square buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8 mx-auto max-w-[1280px]">
                {/* Apply for Cheque Book */}
                <div id="applyCheque"
                    onClick={() => openModal(
                        <div>
                            <ul>
                                <p className="font-bold">How to Apply for a Cheque Book via OCBC Internet Banking or OCBC App</p>

                                <p className="mt-4 font-semibold">Processing Times:</p>
                                    <ul>
                                    <li>Requests submitted <strong>before 7pm (Monday to Friday)</strong> and <strong>5pm (Saturday)</strong> will take immediate effect.</li>
                                    <li>Requests submitted <strong>after these timings</strong> will be processed on the <strong>next working day</strong>.</li>
                                    </ul>

                                <p className="mt-4 font-bold">Via OCBC Internet Banking:</p>
                                    <ul>
                                    <li>Log in to Internet banking with your <strong>Access Code and PIN</strong>.</li>
                                    <li>At the top menu, click on <strong>Customer service → Cheque services → Request cheque book</strong>.</li>
                                    </ul>

                                <p className="mt-4 font-bold">Via OCBC App:</p>
                                    <ul>
                                    <li>Log in to the <strong>OCBC app</strong>.</li>
                                    <li>Tap on the <strong>"More" icon</strong> on the bottom navigation bar.</li>
                                    <li>Tap on <strong>Deposit account settings → View cheque services → Request for cheque book</strong>.</li>
                                    <li>Follow the on-screen instructions.</li>
                                    </ul>

                                <p className="mt-4 font-bold">Important Notes:</p>
                                    <ul>
                                    <li><strong>Fee:</strong> S$10 per cheque book for SGD accounts.</li>
                                    <li><strong>Waiver:</strong> Fee is waived for all <strong>Premier and Private Bank EasiSave accounts</strong>.</li>
                                    <li><strong>Delivery:</strong> Cheque books will be delivered to your account's mailing address via normal mail in <strong>5 working days</strong>.</li>
                                    </ul>

                                <p className="mt-4 font-bold">For Urgent Requests:</p>
                                    <ul>
                                    <li><strong>Same-day delivery:</strong> Call <strong>1800 363 3333</strong> before <strong>10am</strong> for delivery between <strong>2:30pm and 6pm</strong>.</li>
                                    <li><strong>Next-day delivery:</strong> Call before <strong>3:30pm</strong> for delivery between <strong>9am and 6pm</strong> the following day.</li>
                                    <li><strong>Available:</strong> Mondays to Fridays, excluding public holidays.</li>
                                    </ul>
                                <p className="mt-4 font-bold">Additional Option:</p> You can also apply for an <strong>OCBC Deposit Account</strong> by completing the <strong>cheque book request form</strong>.
                                </ul>
                        </div>, 
                        "Apply for Cheque Book"
                    )} 
                    className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
                >
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xl max-w-[10rem]">Apply for Cheque Book</h3>
                        <img src={require('../images/cheque-application.svg').default} alt="Apply for Cheque Book" className="w-12 h-10" />
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center">
                        <p className="text-lg mr-1">Learn more</p>
                        <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                    </div>
                </div>

                {/* Lost Cheque */}
                <div id="lostCheque"
                    onClick={() => openModal(
                        <div>
                            <ul>
                            <p className="font-bold">How to Apply for a Cheque Book on OCBC Deposit Account</p>

                            <p className="mt-2 font-bold">Complete the Cheque Book Request Form</p>

                            <p className="mt-2 font-bold">Via OCBC Internet Banking:</p>
                                <ul>
                                <li>Login to OCBC Internet banking</li>
                                <li>Enter your access code, PIN, and one-time password</li>
                                <li>Scroll over “Customer Service” and under “Accounts & cheques” → “Cheque services”</li>
                                <li>Select “Stop Cheque Request” from the left side menu</li>
                                <p className="mt-2 font-bold">Processing Times:</p>
                                    <ul>
                                    <li>Requests submitted before 7pm (Mondays to Fridays) and 5pm (Saturdays) will take immediate effect.</li>
                                    <li>Requests submitted after these times will take effect on the next working day.</li>
                                    </ul>
                                </ul>

                            <p className="mt-2 font-bold">Via Phone Banking:</p>
                                <ul>
                                <li>Dial 1800 363 3333 or (65) 6363 3333 if overseas</li>
                                <li>Select language</li>
                                <li>Press *3 and enter your phone banking access code and PIN followed by #</li>
                                <li>Select 1 for Balance and transaction</li>
                                <li>Select 1 for Balance</li>
                                <li>Select 2 for Banking Accounts and select account</li>
                                <li>Select 3 for Cheque Transaction</li>
                                <li>Select 3 for Stop Cheque</li>
                                <li>Enter cheque number</li>
                                <p className="mt-2 font-bold">Processing Times:</p>
                                    <ul>
                                    <li>Requests submitted before 7pm (Mondays to Fridays) and 5pm (Saturdays) will take immediate effect.</li>
                                    <li>Requests submitted after these times will take effect on the next working day.</li>
                                    </ul>
                                </ul>


                            <p className="mt-2 font-bold">Via Customer Service Centre:</p>
                                <ul>
                                <li>Dial 1800 363 3333 or (65) 6363 3333 if overseas</li>
                                <li>Select language</li>
                                <li>Press 0 and select 2 for Banking</li>
                                <p className="mt-2 font-bold">Processing Times:</p>
                                    <ul>
                                    <li>Requests submitted before 10pm daily will take immediate effect.</li>
                                    <li>Requests submitted after 10pm will take effect on the next working day.</li>
                                    </ul>
                                </ul>
                            </ul>

                        </div>, 
                        "Lost Cheque"
                    )} 
                    className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
                >
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xl max-w-[10rem]">Lost Cheque</h3>
                        <img src={require('../images/cheque-lost.svg').default} alt="Lost Cheque" className="w-10 h-10" />
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center">
                        <p className="text-lg mr-1">Learn more</p>
                        <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                    </div>
                </div>

                {/* Cheque Status */}
                <div id="chequeStatus"
                    onClick={() => openModal(
                        <div>
                            <ul>
                            <p className="font-bold">OCBC Internet Banking:</p>
                                <ul>
                                <li>Log in to OCBC Internet Banking</li>
                                <li>Enter your access code, PIN, and one-time password</li>
                                <li>Scroll over “Customer Service” and select “Cheque services”</li>
                                <li>Select “Cheque Status Inquiry” and click on the respective account</li>
                                </ul>

                            <p className="mt-4 font-bold">OCBC App:</p>
                                <ul>
                                <li>Log in to the OCBC app</li>
                                <li>Tap on the “More” icon in the bottom navigation bar</li>
                                <li>Tap on “Deposit account settings” → “Access cheque services”</li>
                                <li>Select “Check cheque status”</li>
                                <li>Follow the OCBC app instructions</li>
                                </ul>

                            <p className="mt-4 font-bold">Important Note:</p>
                                <ul>
                                <li>To stop a cheque today, submit your request before 7pm from Mondays to Fridays, and before 5pm on Saturdays.</li>
                                <li>Requests submitted after these times will be completed the next business day.</li>
                                <li><strong>Fees:</strong> S$15 to stop a cheque and S$30 to stop a series of cheques.</li>
                                </ul>

                            <p className="mt-4 font-bold">OCBC Internet Banking Secured Email:</p>
                                <ul>
                                <li>Log in to OCBC Internet Banking</li>
                                <li>Enter your access code, PIN, and one-time password</li>
                                <li>Scroll over “Mailbox” and click on “Compose Mail”</li>
                                <li>Receive information on cheque status after the cheque has been presented to the bank.</li>
                                </ul>

                            <p className="mt-4 font-bold">Customer Service Centre:</p>
                                <ul>
                                <li>Dial 1800 363 3333 or (65) 6363 3333 if overseas</li>
                                <li>Select language</li>
                                <li>Press 0 and select 2 for Banking</li>
                                <li>Receive information on cheque status after the cheque has been presented to the bank.</li>
                                </ul>
                            </ul>

                        </div>, 
                        "Status of Issued Cheque"
                    )}
                    className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
                >
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xl max-w-[10rem]">Status of Issued Cheque</h3>
                        <img src={require('../images/cheque-status.svg').default} alt="Status of Issued Cheque" className="w-10 h-10" />
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center">
                        <p className="text-lg mr-1">Learn more</p>
                        <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                    </div>
                </div>

                {/* Stop Cheque Payment */}
                <div id="stopCheque"
                    onClick={() => openModal(
                        <div>
                            <ul>
                            <p class="font-bold">You can stop your cheque payment through OCBC Internet Banking or the OCBC app.</p>

                            <p class="mt-4 font-bold">OCBC Internet Banking: </p>
                                <ul>
                                <li>Log in to OCBC Internet Banking</li>
                                <li>Enter your access code, PIN, and one-time password</li>
                                <li>Scroll over “Customer Service” and under “Accounts & cheques” → “Cheque services”</li>
                                <li>Select “Stop Cheque Request” from the left side menu</li>
                                <li>Be informed on cheque status after the cheque has been presented to the bank.</li>
                                </ul>

                            <p class="mt-4 font-bold">OCBC Digital: </p>
                                <ul>
                                <li>Log in to OCBC app</li>
                                <li>Tap on the “More” icon in the bottom navigation bar</li>
                                <li>Tap on “Deposit account settings” → “Access cheque services”</li>
                                <li>Select “Stop cheque payment”</li>
                                <li>Follow the OCBC app instructions</li>
                                </ul>
                            </ul>

                        </div>, 
                        "Stop Cheque Payment"
                    )}
                    className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
                >
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xl max-w-[10rem]">Stop Cheque Payment</h3>
                        <img src={require('../images/cheque-stop.webp')} alt="Stop Cheque Payment" className="w-10 h-10" />
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center">
                        <p className="text-lg mr-1">Learn more</p>
                        <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* Bottom 4 Squares */}
            <div id="extraButtons" className={isExpanded ? "grid grid-cols-2 md:grid-cols-4 gap-8 mt-8 mx-auto max-w-[1280px]" : "hidden"}>
            {/* Request Bank Statement */}
            <div id="reqBankStatement"
                onClick={() => openModal(
                    <div>
                        <ul>
                        <p className="font-bold mt-4">OCBC Internet Banking: </p>
                            <ul>
                            <li>Log in to OCBC Internet Banking</li>
                            <li>Enter your access code, PIN, and one-time password</li>
                            <li>Click on “View Account” and select “Overview”</li>
                            <li>Scroll down to “Deposits” and click on the required account number</li>
                            <li>Select “Documents”</li>
                            <li>Select “Account Type,” “From,” and “To” date to view</li>
                            </ul>

                        <p className="mt-4"><strong>Note:</strong> The account is required to be tagged to your OCBC Internet Banking service.</p>

                        <p className="font-bold mt-4">OCBC Internet Banking Secured Email: </p>
                            <ul>
                            <li>Log in to OCBC Internet Banking with your Access Code and PIN</li>
                            <li>Select “View accounts” in the top navigation bar</li>
                            <li>Select “Manage Documents”</li>
                            <li>Uncheck the boxes for the corresponding account(s) to receive paper statements</li>
                            </ul>

                        <p className="font-bold mt-4">Branch: </p>
                            <ul>
                            <li>Locate branch</li>
                            <li>You will receive the banking statement within 7 working days via mail.</li>
                            </ul>
                        </ul>

                    </div>, 
                    "Request Bank Statement"
                )} 
                className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
            >
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl max-w-[10rem]">
                        Request Bank Statement
                    </h3>
                    <img src={require('../images/BankStatement.png')} alt="Request Bank Statement" className="w-10 h-10" />
                </div>
                <div className="absolute bottom-4 right-4 flex items-center">
                    <p className="text-lg mr-1">Learn more</p>
                    <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                </div>
            </div>
            
            {/* SGD Fixed Deposit */}
            <div id="sgdFixedDep"
                onClick={() => openModal(
                    <div>
                        <ul>
                        <p className="font-bold">Branch: </p>
                            <ul>
                            <li>Locate branch</li>
                            <li>Placements will be processed immediately.</li>
                            </ul>

                        <p class="font-bold mt-4">Online Banking: </p>
                            <ul>
                            <li>To place a fixed deposit online, you need an existing savings or chequing account, as well as a fixed deposit account with the bank.</li>
                            <li>Login to online banking</li>
                            <li>Enter your access code, PIN, and one-time password</li>
                            <li>Select “Time Deposit” and on the tooltip, select "Place new deposit"</li>
                            <li>Select the Time Deposit account number for the new placement</li>
                            <li>Select the currency and indicate the amount</li>
                            <li>Select the term</li>
                            <li>Select the funding amount</li>
                            <li>Read and agree to the terms and conditions</li>
                            <li>Preview the placement details and indicative interest rate, then click “Next”</li>
                            <li>The placement will be processed and indicated in the Time Deposit Account</li>
                            </ul>

                        <p className="font-bold mt-4">Fixed Deposit Placement Hours: </p>
                            <ul>
                            <li>Monday to Friday, 9.20am to 6pm</li>
                            <li>Instructions received outside these hours will be processed on the next working day (public and currency holidays excluded).</li>
                            </ul>


                        <p className="font-bold mt-4">Foreign Currency Fixed Deposit: </p>
                            <ul>
                            <li>Your fixed deposit will be placed within 2 working days (public and currency holidays excluded) after we receive your instructions.</li>
                            <li>If you withdraw your time deposit before it matures, you may incur an early withdrawal fee (depending on the remaining tenor and prevailing penalty rate) and earn no or lower interest.</li>
                            </ul>

                        <p class="font-bold mt-4">Customer Service Centre: </p>
                            <ul>
                            <li>Dial 1800 363 3333 or (65) 6363 3333 if overseas</li>
                            <li>Select language</li>
                            <li>Press 0 and select 2 for Banking</li>
                            <li>For the fixed deposit to be valued on the same day, submit your request before 4pm (Mondays to Fridays).</li>
                            <li>Requests submitted after these times will be completed the next business day.</li>
                            </ul>
                        </ul>
                    </div>, 
                    "SGD Fixed Deposit"
                )} 
                className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
            >
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl max-w-[12rem]">
                        SGD Fixed Deposit
                    </h3>
                    <img src={require('../images/account-deposit.svg').default} alt="SGD Fixed Deposit" className="w-10 h-10" />
                </div>
                <div className="absolute bottom-4 right-4 flex items-center">
                    <p className="text-lg mr-1">Learn more</p>
                    <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                </div>
            </div>
            
            {/* Withdraw Fixed Deposit */}
            <div id="withdrawFixedDep"
                onClick={() => openModal(
                    <div>
                        <ul>
                        <p class="font-bold">Branch: </p>
                            <ul>
                            <li>Locate branch</li>
                            <li>Withdrawals will take immediate effect.</li>
                            </ul>

                        <p class="font-bold mt-4">Customer Service Centre: </p>
                            <ul>
                            <li>To withdraw an SGD Fixed Deposit, you need an existing savings or chequing account.</li>
                            <li>Dial 1800 363 3333 or (65) 6363 3333 if overseas</li>
                            <li>Select language</li>
                            <li>Press 0 and select 2 for Banking</li>
                            <li>Withdrawals will take effect in 1 working day.</li>
                            </ul>

                        <p class="font-bold mt-4">Online Banking: </p>
                            <ul>
                            <li>To withdraw a fixed deposit online, you need to submit the Time Deposit Instruction form via Internet Banking.</li>
                            <li>Log in to online banking</li>
                            <li>Enter your access code, PIN, and one-time password</li>
                            <li>Select “Time Deposit” and click on “Change of Maturity Instruction” or “Terminating Time Deposit” to submit the request via the online form</li>
                            <li>Key in the details</li>
                            <li>Read and agree to the terms and conditions</li>
                            <li>Preview the placement details and click “Next”</li>
                            <li>The request will be processed.</li>
                            </ul>
                        </ul>
                    </div>, 
                    "Withdraw Fixed Deposit"
                )}  
                className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
            >
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl max-w-[10rem]">
                        Withdraw Fixed Deposit
                    </h3>
                    <img src={require('../images/account-withdraw.svg').default} alt="Withdraw Fixed Deposit" className="w-10 h-10" />
                </div>
                <div className="absolute bottom-4 right-4 flex items-center">
                    <p className="text-lg mr-1">Learn more</p>
                    <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                </div>
            </div>

            {/* Retrieve Statements */}
            <div id="retrieveStatements"
                onClick={() => openModal(
                    <div>
                        <p className="text-lg font-semibold">OCBC Internet Banking</p>
                        <ul className="list-disc pl-6">
                            <li>Log in to OCBC Internet Banking.</li>
                            <li>Click on “View accounts”.</li>
                            <li>From the drop-down menu, click “Overview”.</li>
                            <li>Scroll down to view “What you owe (Liabilities)” under Credit Cards.</li>
                            <li>Click on the specific card type.</li>
                            <li>From the drop-down menu, click “Documents”.</li>
                        </ul>

                        <p className="text-lg font-semibold mt-8">OCBC App</p>
                        <ul className="list-disc pl-6">
                            <li>Log in to the OCBC app.</li>
                            <li>Tap on the “More” icon in the bottom navigation bar.</li>
                            <li>Select “Documents – Statements & Letters”.</li>
                            <li>Select “View documents”.</li>
                        </ul>
                    </div>, 
                    "Retrieve Statements"
                )} 
                className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
            >
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl max-w-[10rem]">
                        Retrieve Statements
                    </h3>
                    <img src={require('../images/BankStatement.png')} alt="Retrieve Statements" className="w-10 h-10" />
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

            {/* Chatbot Button and Interface */}
            <Chatbot />
        </div>
    );
}

export default AccountFaq;
