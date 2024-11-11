import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import NavBar from "../components/navbar";
import CommonFaqs from "../components/commonfaqs";
import LoanBanner from '../images/loan.png';
import ChevronRight from '../images/chevron-right.svg';
import Help from "../components/needhelp";
import Footer from "../components/footer"
import Modal from "../components/popup";
import Chatbot from '../components/chatbot';

function LoansFaq() {

    useEffect(() => {
        document.title = "Loans | Help & Support | OCBC Singapore";
    }, []);

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
                    src={LoanBanner}
                    alt="Loan Banner"
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
                    Loans
                </div>
                {/* Bottom border */}
                <div className="w-full h-[2px] bg-red-500 absolute bottom-0"></div>
            </div>

            {/* Text Section */}
            <div className="text-center mt-8 text-5xl font-geomanist font-bold">How can we help?</div>

            {/* Top 4 square buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8 mx-auto max-w-[1280px]">
                {/* Full Loan Repayment */}
                <div 
                    onClick={() => openModal(
                        <div>
                            <ul>
                            <p className="font-bold">Full Redemption of Loans for Mortgaged Property: </p>
                                <ul>
                                <li>Submit an application with the Home Loan Service Form <strong>2 months</strong> before the intended prepayment date for local properties.</li>
                                <li>For overseas properties, submit an application with the Home Loan Service Form <strong>3 months</strong> before the intended prepayment date.</li>
                                <li>If your loan is tagged to Singapore Inter-Bank Offer Rate (SIBOR), Singapore Overnight Rate (SOR), or Cost of Funds, the prepayment date will be the first Rate Review Date (RRD) after the notice period.</li>
                                <li>You will need to pay interest in lieu if insufficient notice is given.</li>
                                </ul>

                            <p className="mt-4 font-bold">Clawback of Cash Reward and Prepayment Penalty: </p>
                                <ul>
                                <li>Any cash reward you received may be clawed back.</li>
                                <li>Clawback of cash reward and any prepayment penalty will be indicated in the Letter of Offer (LO) or the latest Supplementary Letter of Offer (SLO).</li>
                                </ul>

                            <p className="mt-4 font-bold">Redemption Payment Options: </p>
                                <ul>
                                <li>Deduct the full redemption amount from the OCBC account used for monthly instalments.</li>
                                <li>Alternatively, arrange with your appointed law firm to write to the Bank to facilitate your request.</li>
                                <li>If you appoint a law firm that is not on the OCBC panel, OCBC Bank has the right to appoint a panel firm to act for the Bank, and you will be charged legal fees by both firms.</li>
                                </ul>

                            <p className="mt-4 font-bold">Processing Issues: </p>
                                <ul>
                                <li>If there are issues processing your request, you will receive an email with more details.</li>
                                </ul>
                            </ul>
                        </div>, 
                        "Full Loan Repayment"
                    )} 
                    className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
                >
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xl max-w-[10rem]">Full Loan Repayment</h3>
                        <img src={require('../images/loan-repayment.svg').default} alt="Card Activation" className="w-10 h-10" />
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center">
                        <p className="text-lg mr-1">Learn more</p>
                        <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                    </div>
                </div>

                {/* Partial Loan Repayment} */}
                <div 
                    onClick={() => openModal(
                        <div>
                            <ul>
                            <p className="font-bold">Ad-Hoc Payment to Reduce Outstanding Loan Balance: </p>
                                <ul>
                                <li>You can make an ad-hoc payment via cash, CPF, or a combination of both for your Private Home Loan or HDB Home Loan by submitting a request with the Home Loan Service Form.</li>
                                <li>Submit an application with the Home Loan Service Form <strong>1 month</strong> before the intended prepayment date.</li>
                                <li>If your loan is tagged to Singapore Inter-Bank Offer Rate (SIBOR), Singapore Overnight Rate (SOR), or Cost of Funds, the prepayment date will be the first Rate Review Date (RRD) after the required 1-month notice period.</li>
                                <li>You will need to pay interest in lieu if insufficient notice is given.</li>
                                </ul>

                            <p class="mt-4 font-bold">Prepayment Requirements and Penalties: </p>
                                <ul>
                                <li>Your intended prepayment amount should be a minimum of S$5,000 and in multiples of S$1,000.</li>
                                <li>Prepayment penalty (if any) will depend on your interest rate package and whether your loan is still within the lock-in period.</li>
                                <li>Any prepayment penalty will be indicated in the Letter of Offer (LO) or the latest Supplementary Letter of Offer (SLO).</li>
                                </ul>

                            <p className="mt-4 font-bold">Options After Full Loan Disbursement: </p>
                                <ul>
                                <li>You can choose to keep the instalment amount unchanged or revise it accordingly.</li>
                                <li>If using CPF funds for monthly instalments, inform CPF Board to adjust the monthly deduction from your CPF account to the Bank.</li>
                                </ul>

                            <p className="mt-4 font-bold">System-Generated Advice from the Bank: </p>
                                <ul>
                                <li>Confirmation of receipt of notice</li>
                                <li>Amount of prepayment</li>
                                <li>Effective date of prepayment</li>
                                </ul>

                            <p className="mt-4 font-bold">Instructing CPF Board for Funds Remittance or Cash Credit: </p>
                                <ul>
                                <li>Complete CPF Form 4B (for Private Home Loan) or CPF Form HBL4 (for HDB Loan) at <a href="https://www.cpf.gov.sg" target="_blank">www.cpf.gov.sg</a> (log in with your Singpass).</li>
                                <li>You will receive a system-generated advice with the effective date and revised instalment amount after the prepayment is processed.</li>
                                </ul>

                            <p className="mt-4 font-bold">Processing Issues: </p>
                                <ul>
                                <li>If there are issues processing your request, you will receive an email with more details.</li>
                                </ul>
                            </ul>

                        </div>, 
                        "Partial Loan Repayment"
                    )} 
                    className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
                >
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xl max-w-[10rem]">Partial Loan Repayment</h3>
                        <img src={require('../images/loan-repayment.svg').default} alt="Partial Loan Repayment" className="w-10 h-10" />
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center">
                        <p className="text-lg mr-1">Learn more</p>
                        <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                    </div>
                </div>

                {/* Cancel Partial Prepayment */}
                <div 
                    onClick={() => openModal(
                        <div>
                            <ul>
                        <li class="font-bold mt-4">Notice Requirement:
                            <ul>
                            <li>We need to receive your notice at least 1 week before the proposed deduction date.</li>
                            </ul>
                        </li>

                        <li class="font-bold mt-4">Please Include in Your Notice:
                            <ul>
                            <li>Date of the letter from the Bank confirming your partial repayment instruction</li>
                            <li>Loan account number and mortgage property details</li>
                            <li>Instructions to cancel the repayment (indicate the amount)</li>
                            <li>Your signature on the letter</li>
                            </ul>
                        </li>

                        <li class="font-bold mt-4">Submit Your Notice:
                            <ul>
                            <li>Bring the signed letter to any OCBC Bank branch</li>
                            <li>Or mail it to:
                                <div className="mt-2">
                                <li>Loan Operations (Secured Loan)</li>
                                <li>Bras Basah Post Office</li>
                                <li>Locked Bag Service No. 8</li>
                                Singapore 911886
                                </div>
                            </li>
                            </ul>
                        </li>
                        </ul>

                        </div>, 
                        "Cancel Partial Prepayment"
                    )}
                    className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
                >
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xl max-w-[10rem]">Cancel Partial Prepayment</h3>
                        <img src={require('../images/form.svg').default} alt="Cancel Partial Prepayment" className="w-10 h-10" />
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center">
                        <p className="text-lg mr-1">Learn more</p>
                        <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                    </div>
                </div>

                {/* Change Loan Interest Rate Package*/}
                <div 
                    onClick={() => openModal(
                        <div>
                            <ul>
                            <p className="font-bold">Learn More About Repricing: </p>
                                <ul>
                                <li>To learn more about repricing your home loan, visit our <a className='text-blue-500'href="https://www.ocbc.com/personal-banking/loans/home-loan-repricing" target="_blank">Home Loan Repricing page</a>.</li>
                                </ul>

                            <p className="font-bold mt-4">Request to Reprice Your Home Loan: </p>
                                <ul>
                                <li>Use the <a className="text-blue-500" href="https://www.ocbc.com/personal-banking/loans/mortgage-form-repricing/#/" target="_blank">application form</a> to submit a request to reprice your home loan.</li>
                                <li>We will inform you of the outcome or request more information within two weeks of your application date.</li>
                                </ul>
                            </ul>
                        </div>, 
                        "Change Loan Interest Rate Package"
                    )}
                    className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
                >
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xl max-w-[12rem]">Change Loan Interest Rate Package</h3>
                        <img src={require('../images/loan-change.svg').default} alt="Change Loan Interest Rate Package" className="w-10 h-10" />
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center">
                        <p className="text-lg mr-1">Learn more</p>
                        <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* Bottom 4 Squares */}
            <div id="extraButtons" className={isExpanded ? "grid grid-cols-2 md:grid-cols-4 gap-8 mt-8 mx-auto max-w-[1280px]" : "hidden"}>
            {/* Change Insurance Tenure Length */}
            <div 
                onClick={() => openModal(
                    <div>
                        <ul>
                        <p className="font-bold">Submitting a Request:</p>
                        <ul>
                            <li>Submit an application with the Home Loan Service Form.</li>
                            <li>There will be a processing fee of S$500 for your request.</li>
                        </ul>

                        <p className="font-bold mt-4">Review and Processing:</p>
                        <ul>
                            <li>Your request is subject to review by the Bank.</li>
                            <li>The request can only be processed if there are sufficient funds in your account for the deduction of relevant fees (if any).</li>
                            <li>Your monthly instalment amount will be revised thereafter.</li>
                            <li>You will receive a system-generated advice once your request is processed.</li>
                        </ul>

                        <p className="font-bold mt-4">Loan Tenure Adjustment Requests:</p>
                        <ul>
                            <li><strong>Lengthening Loan Tenure:</strong> The Bank will contact you within 2 working days after your application is submitted.</li>
                            <li><strong>Shortening Loan Tenure:</strong> You will receive a system-generated advice once the request is processed.</li>
                        </ul>

                        <p className="font-bold mt-4">Processing Issues:</p>
                        <ul>
                            <li>If there are issues processing your request, you will receive an email with more details.</li>
                        </ul>
                        </ul>
                    </div>, 
                    "Change Loan Tenure Length"
                )} 
                className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
            >
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl max-w-[10rem]">
                        Change Loan Tenure Length
                    </h3>
                    <img src={require('../images/loan-changelength.svg').default} alt="Change Loan Tenure Length" className="w-10 h-10" />
                </div>
                <div className="absolute bottom-4 right-4 flex items-center">
                    <p className="text-lg mr-1">Learn more</p>
                    <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                </div>
            </div>
            
            {/* Change Debiting Account */}
            <div 
                onClick={() => openModal(
                    <div>
                    <p className="font-bold">Changing the Debiting Account for Your Home Loan:</p>
                    <ul>
                        <li>You can submit a Home Loan Service Form application to change the debiting account of your loan.</li>
                        <li>If you intend to change the debiting account to:
                        <ul>
                            <li>A joint account operated with joint signing authority</li>
                            <li>A third-party account</li>
                        </ul>
                        You may submit the appropriate consent form:
                        <ul>
                            <li>Consent Form for Direct Debit Authorisation (First Party)</li>
                            <li>Consent Form for Direct Debit Authorisation (Third-Party)</li>
                        </ul>
                        Submit the form at any OCBC Bank branch or mail it to:
                        <div className="mt-2 font-bold">
                                <li>Loan Operations (Secured Loan)</li>
                                <li>Bras Basah Post Office</li>
                                <li>Locked Bag Service No. 8</li>
                                Singapore 911886
                                </div>
                        </li>
                    </ul>

                    <p className="font-bold mt-4">After Processing:</p>
                    <ul>
                        <li>Once the request is processed, your monthly instalment and any fees relating to your home loan will be deducted from the new direct debiting account.</li>
                    </ul>

                    </div>, 
                    "Change Debiting Account"
                )} 
                className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
            >
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl max-w-[10rem]">
                        Change Debiting Account
                    </h3>
                    <img src={require('../images/loan-changeaccount.svg').default} alt="Change Debiting Account" className="w-10 h-10" />
                </div>
                <div className="absolute bottom-4 right-4 flex items-center">
                    <p className="text-lg mr-1">Learn more</p>
                    <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                </div>
            </div>
            
            {/* Card Replacement */}
            <div 
                onClick={() => openModal(
                    <div>
                        <ul>
                    <p className="font-bold">Automatic Cancellation of Fire Insurance Upon Full Redemption of Housing Loan:</p>
                    <ul>
                        <li>The fire insurance will be automatically cancelled if:
                        <ul>
                            <li>An early full redemption is performed, and a lawyer was engaged to complete the redemption and discharging of the title deed; or</li>
                            <li>The fire insurance was arranged by the Bank (e.g., through Great Eastern General).</li>
                        </ul>
                        </li>
                    </ul>
                    </ul>
                    </div>, 
                    "Cancel Fire Insurance Policy"
                )}  
                className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
            >
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl max-w-[12rem]">
                    Cancel Fire Insurance Policy
                    </h3>
                    <img src={require('../images/loan-delete.svg').default} alt="Cancel Fire Insurance Policy" className="w-10 h-10" />
                </div>
                <div className="absolute bottom-4 right-4 flex items-center">
                    <p className="text-lg mr-1">Learn more</p>
                    <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                </div>
            </div>

            {/* Retrieve Statements */}
            <div 
                onClick={() => openModal(
                    <div>
                        <ul>
                        <p className="font-bold">Annual Home Loan Account Statement:</p>
                        <ul>
                            <li>You will receive a home loan account statement every year, dated 31 December.</li>
                            <li>If your property is in Australia, you will receive an additional statement dated 30 June.</li>
                            <li>If your property is in the United Kingdom, you will receive an additional statement dated 30 April.</li>
                        </ul>

                        <p className="font-bold mt-4">Requesting Home Loan Account Statements:</p>
                        <ul>
                            <li>You can request home loan account statements by submitting the Account Information Update/Request form.</li>
                            <li>This form is available in the Accounts section at <strong>OCBC Help and Support → Banking forms</strong>.</li>
                            <li>There is no charge for retrieving your loan statement for the current year.</li>
                            <li>A fee of S$50 plus Goods & Services Tax (GST) per statement applies for retrieving previous years’ statements.</li>
                        </ul>
                        </ul>
                    </div>, 
                    "Request Home Loan Statements"
                )} 
                className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
            >
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl max-w-[10rem]">
                    Request Home Loan Statements
                    </h3>
                    <img src={require('../images/BankStatement.png')} alt="Request Home Loan Statements" className="w-10 h-10" />
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

export default LoansFaq;
