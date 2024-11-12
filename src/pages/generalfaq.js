import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavBar from "../components/navbar";
import CommonFaqs from "../components/commonfaqs";
import GeneralBanner from '../images/generalfaq.png';
import ChevronRight from '../images/chevron-right.svg';
import Help from "../components/needhelp";
import Footer from "../components/footer"
import Modal from "../components/popup";
import Chatbot from '../components/chatbot';

function GeneralFaq() {


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
                    src={GeneralBanner}
                    alt="General Banner"
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
                    General
                </div>
                {/* Bottom border */}
                <div className="w-full h-[2px] bg-red-500 absolute bottom-0"></div>
            </div>

            {/* Text Section */}
            <div className="text-center mt-8 text-5xl font-geomanist font-bold">How can we help?</div>

            {/* Top 4 square buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8 mx-auto max-w-[1280px]">
                {/* Change Contact Details */}
                <div id="contactDetails"
                    onClick={() => openModal(
                        <div>
                            <ul>
                            <p className="font-bold font-geomanist text-2xl">OCBC Internet Banking</p>

                            <p className="font-bold mt-2">What details can you change?</p>
                            <ul>
                                <li>Mailing Address</li>
                                <li>Email and phone number (including SMS OTPs)</li>
                            </ul>

                            <p className="font-bold mt-4">What accounts can the changes be applied to?</p>
                            <ul>
                                <li>Current, savings, and credit cards</li>
                                <li>Other Accounts:
                                <ul>
                                    <li>Loans</li>
                                    <li>Unit trust</li>
                                    <li>CPF-SRS</li>
                                    <li>Foreign Exchange</li>
                                    <li>Nominees</li>
                                    <li>Bills</li>
                                    <li>Treasury products</li>
                                    <li>Safe deposit box</li>
                                    <li>iOCBC</li>
                                    <li>OAC/Great Eastern</li>
                                </ul>
                                </li>
                            </ul>

                            <p className="font-bold mt-4">How long will it take for the changes to be effective?</p>
                            <ul>
                                <li>Update of mailing address for current and savings accounts and OCBC credit cards will take effect immediately. For other accounts and products, it will take 7 working days.</li>
                                <li>Update of email and phone number (including SMS OTPs) will take at least 12 hours to be effective.</li>
                            </ul>

                            <p className="font-bold mt-4">Steps to Update Details:</p>
                            <ul>
                                <li>Log in to OCBC Internet Banking</li>
                                <li>Click "Customer Service" in the top navigation bar</li>
                                <li>Select "Change mailing address" or "Change personal details"</li>
                                <li>Provide details you would like to change in the relevant fields</li>
                                <li>Click "Next" to proceed</li>
                                <li>Check that your details are correct</li>
                                <li>Click "Submit" and authorize the transaction using your hardware token or *OCBC OneToken to complete the transaction</li>
                            </ul>

                            <p className="font-bold mt-4">Note:</p>
                            <ul>
                                <li>To update the address for a suspended credit card, enter the card number under "Other account(s) not listed above" in the “Account No.” field. The address will be updated within 7 working days.</li>
                            </ul>

                            <p className="font-bold font-geomanist mt-4 text-2xl">OCBC App</p>

                            <p className="font-bold mt-2">What details can you change?</p>
                            <ul>
                                <li>Email and phone number (including SMS OTP)</li>
                            </ul>

                            <p className="font-bold mt-4">How long will it take for the changes to be effective?</p>
                            <ul>
                                <li>It will take at least 12 hours for the changes to be effective.</li>
                            </ul>

                            <p className="font-bold mt-4">Steps to Update Details:</p>
                            <ul>
                                <li>Log in to OCBC app</li>
                                <li>Tap on the "More" icon in the bottom navigation bar</li>
                                <li>Tap on "Profile & app settings"</li>
                                <li>Select "Update phone number/email"</li>
                                <li>Enter details you would like to change in the relevant fields (fields left blank will not be changed)</li>
                                <li>Tap on "Save" to proceed</li>
                                <li>Check that your details are correct</li>
                                <li>Click "Confirm" and authorize the transaction using your hardware token or *OCBC OneToken to complete the transaction</li>
                            </ul>

                            <p className="font-bold mt-4">Do not have OCBC Internet Banking/OCBC App?</p>
                            <ul>
                                <li>Apply with your ATM Card number and PIN.</li>
                            </ul>

                            <p className="font-bold mt-4">Note on OCBC OneToken:</p>
                            <ul>
                                <li>If you have activated OCBC OneToken, you will not be required to enter OTPs for the OCBC app as authentications will occur seamlessly in the background.</li>
                                <li>For OCBC Internet Banking, click "Accept" on the OneToken push notification sent to your mobile device to authenticate your transaction.</li>
                                <li>For more information, visit <a href="https://ocbc.com/onetoken" target="_blank">ocbc.com/onetoken</a>.</li>
                            </ul>
                            </ul>

                        </div>, 
                        "Change Contact Details"
                    )} 
                    className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
                >
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xl max-w-[12rem]">Change Contact Details</h3>
                        <img src={require('../images/general-edituser.svg').default} alt="Change Contact Details" className="w-10 h-10" />
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center">
                        <p className="text-lg mr-1">Learn more</p>
                        <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                    </div>
                </div>

                {/* Retrieve Access Code */}
                <div id="accessCode"
                    onClick={() => openModal(
                        <div>
                            <ul>
                            <p className="font-bold font-geomanist text-2xl">OCBC Internet Banking</p>

                            <p className="font-bold mt-2">What details can you change?</p>
                            <ul>
                                <li>Mailing Address</li>
                                <li>Email and phone number (including SMS OTPs)</li>
                            </ul>

                            <p className="font-bold mt-4">What accounts can the changes be applied to?</p>
                            <ul>
                                <li>Current, savings, and credit cards</li>
                                <li>Other Accounts:
                                <ul>
                                    <li>Loans</li>
                                    <li>Unit trust</li>
                                    <li>CPF-SRS</li>
                                    <li>Foreign Exchange</li>
                                    <li>Nominees</li>
                                    <li>Bills</li>
                                    <li>Treasury products</li>
                                    <li>Safe deposit box</li>
                                    <li>iOCBC</li>
                                    <li>OAC/Great Eastern</li>
                                </ul>
                                </li>
                            </ul>

                            <p className="font-bold mt-4">How long will it take for the changes to be effective?</p>
                            <ul>
                                <li>Update of mailing address for current and savings accounts and OCBC credit cards will take effect immediately. For other accounts and products, it will take 7 working days.</li>
                                <li>Update of email and phone number (including SMS OTPs) will take at least 12 hours to be effective.</li>
                            </ul>

                            <p className="font-bold mt-4">Steps to Update Details:</p>
                            <ul>
                                <li>Log in to OCBC Internet Banking</li>
                                <li>Click "Customer Service" in the top navigation bar</li>
                                <li>Select "Change mailing address" or "Change personal details"</li>
                                <li>Provide details you would like to change in the relevant fields</li>
                                <li>Click "Next" to proceed</li>
                                <li>Check that your details are correct</li>
                                <li>Click "Submit" and authorize the transaction using your hardware token or *OCBC OneToken to complete the transaction</li>
                            </ul>

                            <p className="font-bold mt-4">Note:</p>
                            <ul>
                                <li>To update the address for a suspended credit card, enter the card number under "Other account(s) not listed above" in the “Account No.” field. The address will be updated within 7 working days.</li>
                            </ul>

                            <p className="font-bold font-geomanist mt-8 text-2xl">OCBC App</p>

                            <p className="font-bold mt-2">What details can you change?</p>
                            <ul>
                                <li>Email and phone number (including SMS OTP)</li>
                            </ul>

                            <p className="font-bold mt-4">How long will it take for the changes to be effective?</p>
                            <ul>
                                <li>It will take at least 12 hours for the changes to be effective.</li>
                            </ul>

                            <p className="font-bold mt-4">Steps to Update Details:</p>
                            <ul>
                                <li>Log in to OCBC app</li>
                                <li>Tap on the "More" icon in the bottom navigation bar</li>
                                <li>Tap on "Profile & app settings"</li>
                                <li>Select "Update phone number/email"</li>
                                <li>Enter details you would like to change in the relevant fields (fields left blank will not be changed)</li>
                                <li>Tap on "Save" to proceed</li>
                                <li>Check that your details are correct</li>
                                <li>Click "Confirm" and authorize the transaction using your hardware token or *OCBC OneToken to complete the transaction</li>
                            </ul>

                            <p className="font-bold mt-4">Do not have OCBC Internet Banking/OCBC App?</p>
                            <ul>
                                <li>Apply with your ATM Card number and PIN.</li>
                            </ul>

                            <p className="font-bold mt-4">Note on OCBC OneToken:</p>
                            <ul>
                                <li>If you have activated OCBC OneToken, you will not be required to enter OTPs for the OCBC app as authentications will occur seamlessly in the background.</li>
                                <li>For OCBC Internet Banking, click "Accept" on the OneToken push notification sent to your mobile device to authenticate your transaction.</li>
                                <li>For more information, visit <a href="https://ocbc.com/onetoken" target="_blank">ocbc.com/onetoken</a>.</li>
                            </ul>
                            </ul>
                        </div>, 
                        "Retrieve Access Code"
                    )} 
                    className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
                >
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xl max-w-[10rem]">Retrieve Access Code</h3>
                        <img src={require('../images/general-code.svg').default} alt="Retrieve Access Code" className="w-10 h-10" />
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center">
                        <p className="text-lg mr-1">Learn more</p>
                        <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                    </div>
                </div>

                {/* Fee Waiver */}
                <div id="feeWaiver"
                    onClick={() => openModal(
                        <div>
                            <ul>
                            <p className="font-bold text-xl">Important Note:</p>
                            <ul>
                                <li class='text-lg'>Please do not submit fee waiver requests via our feedback form or secured email as we are unable to take instructions from these channels.</li>
                            </ul>

                            <p className="font-bold mt-4">Credit Card Fee Waiver:</p>
                            <ul>
                                <li>To submit a credit card fee waiver request, please use any of the following options:</li>
                            </ul>

                            <p className="font-bold mt-4">Via OCBC Internet Banking:</p>
                            <ul>
                                <li>Log in to OCBC Internet Banking.</li>
                                <li>Go to “Request credit card fee waiver”.</li>
                                <li>Select "Credit card fee waiver".</li>
                            </ul>

                            <p className="font-bold mt-4">Via OCBC App:</p>
                            <ul>
                                <li>Log in to OCBC app.</li>
                                <li>Tap on the "More" icon in the bottom navigation bar.</li>
                                <li>Tap on "Card services" → "Request fee waiver".</li>
                            </ul>

                            <p className="font-bold mt-4">Via Phone Banking:</p>
                            <ul>
                                <li>Have your credit card ready.</li>
                                <li>Call OCBC and, when prompted, say "credit card fee waiver".</li>
                                <li>Key in your 16-digit card number when prompted.</li>
                            </ul>

                            <ul>
                                <li>Your waiver request is subject to approval. You will be notified of the outcome immediately.</li>
                            </ul>

                            <p className="font-bold mt-4">EasiCredit Fee Waiver:</p>
                            <ul>
                                <li>To submit an EasiCredit waiver request, follow these instructions in our Phone Banking system:</li>
                                <ul>
                                <li>Press <strong>1</strong> for English.</li>
                                <li>Press <strong>1</strong> for phone banking menu.</li>
                                <li>Press <strong>0</strong>.</li>
                                <li>Press <strong>2</strong> for EasiCredit.</li>
                                <li>Press <strong>1</strong> for EasiCredit fee waiver.</li>
                                <li>Key in your NRIC number, followed by the "#" key.</li>
                                <li>Press <strong>1</strong> to confirm NRIC.</li>
                                <li>Customer will be prompted to key in mobile number.</li>
                                <li>Press <strong>1</strong> to confirm mobile number.</li>
                                </ul>
                            </ul>

                            <ul>
                                <li>Your waiver request is subject to approval. You will be notified of the outcome via SMS in 5 business days.</li>
                            </ul>
                            </ul>

                        </div>, 
                        "Fee Waiver"
                    )}
                    className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
                >
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xl max-w-[10rem]">Fee Waiver</h3>
                        <img src={require('../images/general-feewaiver.svg').default} alt="Fee Waiver" className="w-10 h-10" />
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center">
                        <p className="text-lg mr-1">Learn more</p>
                        <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                    </div>
                </div>

                {/* Withdrawal Activation */}
                <div id="withdrawalActivation"
                    onClick={() => openModal(
                        <div>
                            <ul>
                            <p className="font-bold text-xl">SMS Request Instructions:</p>
                            <ul>
                                <li>Please send the SMS request from the mobile number registered with us.</li>
                                <li>Send the request to:
                                <ul>
                                    <li><strong>Local:</strong> 72323</li>
                                    <li><strong>Overseas:</strong> +65 9327 2323</li>
                                </ul>
                                </li>
                            </ul>

                            <p className="font-bold mt-4">Credit and Debit Card Activation:</p>
                            <ul>
                                <li>Format: <strong>ACT&lt;space&gt;NRIC/Passport&lt;space&gt;Last 4 digits of card number</strong></li>
                                <li>Example: <strong>ACT S7637838X 1234</strong></li>
                            </ul>

                            <p className="font-bold mt-4">Overseas ATM Withdrawal Activation:</p>
                            <ul>
                                <li>Format: <strong>ATM&lt;space&gt;NRIC/Passport&lt;space&gt;Last 4 digits of card number&lt;space&gt;start date in DDMMYY&lt;space&gt;end date in DDMMYY&lt;space&gt;activate</strong></li>
                                <li>Example: <strong>ATM S7637838X 1234 011216 311216 activate</strong></li>
                            </ul>

                            <p className="font-bold mt-4">EasiCredit and ATM Card Activation:</p>
                            <ul>
                                <li>Format: <strong>AEC&lt;space&gt;NRIC/Passport&lt;space&gt;Last 4 digits of card number</strong></li>
                                <li>Example: <strong>AEC S7637838X 1234</strong></li>
                            </ul>
                            </ul>
                        </div>, 
                        "Withdrawal Activation"
                    )}
                    className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
                >
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xl max-w-[10rem]">Withdrawal Activation</h3>
                        <img src={require('../images/account-withdraw.svg').default} alt="Withdrawal Activation" className="w-10 h-8" />
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center">
                        <p className="text-lg mr-1">Learn more</p>
                        <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* Bottom 4 Squares */}
            <div id="extraButtons" className={isExpanded ? "grid grid-cols-2 md:grid-cols-4 gap-8 mt-8 mx-auto max-w-[1280px]" : "hidden"}>
            {/* Bank Code */}
            <div 
                onClick={() => openModal(
                    <div>
                        <ul>
                        <p className="font-bold">Bank Code:</p>
                        <ul>
                            <li>7339</li>
                        </ul>

                        <p className="font-bold mt-4">Branch Codes in OCBC Account Numbers:</p>
                        <ul>
                            <li>The first three numbers of your OCBC account number are branch codes.</li>
                            <li>Your OCBC account number should be either 10 or 12 digits.</li>
                        </ul>

                        <p className="font-bold mt-4">Examples of OCBC Bank Account Numbers:</p>
                        <ul>
                            <li><strong>555-1-234567</strong> where <strong>555</strong> is the branch code</li>
                            <li><strong>501-123956-001</strong> where <strong>501</strong> is the branch code</li>
                        </ul>
                        </ul>

                    </div>, 
                    "Bank Code"
                )} 
                className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
            >
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl max-w-[10rem]">
                        Bank Code
                    </h3>
                    <img src={require('../images/general-bank.svg').default} alt="Bank Code" className="w-10 h-10" />
                </div>
                <div className="absolute bottom-4 right-4 flex items-center">
                    <p className="text-lg mr-1">Learn more</p>
                    <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                </div>
            </div>
            
            {/* MyInfo Information */}
            <div 
                onClick={() => openModal(
                    <div>
                        <ul>
                        <p className="font-bold">1. What is MyInfo?</p>
                        <ul>
                            <li>MyInfo is a consent-based data platform that pulls your personal data across participating Government agencies to fill out e-forms.</li>
                        </ul>

                        <p className="font-bold mt-4">2. How does MyInfo work?</p>
                        <ul>
                            <li><strong>Retrieve MyInfo & Provide Consent:</strong>
                            <ul>
                                <li>Your personal data can be pre-filled on the online application form for the OCBC 360/FRANK/Monthly Savings/Bonus+ Savings/Statement Savings Account by simply clicking on the "Use MyInfo" icon. Your consent will be sought before any data is transferred from MyInfo.</li>
                            </ul>
                            </li>
                            <li><strong>Online application form for 360/FRANK/Monthly Savings/Bonus+ Savings/Statement Savings Account is pre-filled:</strong>
                            <ul>
                                <li>The online form will be populated with your personal data from MyInfo for you to verify before completing the account application.</li>
                            </ul>
                            </li>
                        </ul>

                        <p className="font-bold mt-4">3. Why can’t I log in to MyInfo?</p>
                        <ul>
                            <li>Ensure you have entered the correct SingPass ID and password.</li>
                            <li>If still unable to log in, your MyInfo profile may be inactivated due to security and data privacy concerns. Please contact MyInfo Helpdesk for assistance.</li>
                            <li><strong>MyInfo Helpdesk hotline:</strong> +65 6335 3534</li>
                            <li><strong>Operating hours:</strong> 8.00 am to 8.00 pm (Mondays to Fridays), 8.00 am to 2.00 pm (Saturdays). Closed on Sundays and Public Holidays.</li>
                        </ul>

                        <p className="font-bold mt-4">4. Why are some of the fields retrieved from MyInfo non-editable?</p>
                        <ul>
                            <li>Some personal data fields are validated by relevant government agencies. Changes to these fields would need re-validation, so they are non-editable.</li>
                        </ul>

                        <p className="font-bold mt-4">5. What should I do if my Government-verified information on the application form is incorrect?</p>
                        <ul>
                            <li>Government-verified fields are validated by various public sector agencies.</li>
                            <li>Contact the relevant public sector agency to update your Government-verified fields if they are incorrect.</li>
                            <li>Refer to <a href="https://www.singpass.gov.sg/myinfo/intro" target="_blank">https://www.singpass.gov.sg/myinfo/intro</a> for the relevant agencies for each field.</li>
                        </ul>

                        <p className="font-bold mt-4">6. What are the benefits of using MyInfo?</p>
                        <ul>
                            <li>Open your account instantly and faster form filling for 360/FRANK/Monthly Savings/Bonus+ Savings/Statement Savings Account application.</li>
                            <li>No supporting documents, such as an NRIC copy, are required.</li>
                        </ul>

                        <p className="font-bold mt-4">7. Where do I register for MyInfo?</p>
                        <ul>
                            <li>From the end of 2017, all SingPass users automatically receive a MyInfo profile. No need to create a profile before using MyInfo to apply for a bank account.</li>
                        </ul>
                        </ul>

                    </div>, 
                    "About MyInfo"
                )} 
                className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
            >
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl max-w-[10rem]">
                        About MyInfo
                    </h3>
                    <img src={require('../images/general-info.svg').default} alt="About MyInfo" className="w-10 h-10" />
                </div>
                <div className="absolute bottom-4 right-4 flex items-center">
                    <p className="text-lg mr-1">Learn more</p>
                    <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                </div>
            </div>
            
            {/* Apply through MyInfo */}
            <div 
                onClick={() => openModal(
                    <div>
                        <ul>
                        <p className="font-bold text-xl mb-2">Benefits of Using MyInfo in the Online Account Application:</p>
                        <ul>
                            <li><strong>Convenience:</strong> The online application form is pre-filled with required personal data. You only need to verify the information and complete the application.</li>
                            <li><strong>No Supporting Documents:</strong> You only need to provide an image of your signature to complete the application. No need to submit documents such as NRIC or other identity proofs.</li>
                            <li><strong>Instant:</strong> Receive your account number immediately upon successful completion and approval of the application.</li>
                        </ul>

                        <p className="font-bold mt-4">How to Use MyInfo for the CASA Account Application:</p>
                        <ul>
                            <li>Select an account and click on the “Apply online” button.</li>
                            <li>Select “Use MyInfo”.</li>
                            <li>Login using your SingPass credentials and OTP from SingPass.</li>
                            <li>Provide consent for OCBC to pre-fill your application.</li>
                            <li>Complete the additional fields on the form.</li>
                            <li>Submit an image of your signature (max 2MB for .jpg or .png, or 50KB for .pdf).</li>
                            <li>On the acknowledgement screen, you will see your account number if your account is opened successfully.</li>
                        </ul>

                        <p className="font-bold mt-4">What Happens After My Account is Opened?</p>
                        <ul>
                            <li>You will receive a letter with account details within 3 working days.</li>
                            <li>If you are a new OCBC customer or do not have OCBC Online Banking, you will receive your Online Banking access code and PIN within 8 working days.</li>
                            <li>If you applied for a debit card, you will receive the debit card and PIN within 9 working days.</li>
                        </ul>

                        <p className="font-bold mt-4">Why Are Some of the Fields Retrieved from MyInfo Non-Editable?</p>
                        <ul>
                            <li>Some personal data fields are validated by government agencies. Changes to these fields would need re-validation, so they are made non-editable.</li>
                        </ul>

                        <p className="font-bold mt-4">I Used MyInfo but Did Not Receive an Account Number Upon Completion:</p>
                        <ul>
                            <li>Your account will be opened instantly if all checks are successfully completed.</li>
                            <li>If you have submitted your application, OCBC will update you within 3 working days on the application status.</li>
                        </ul>
                        </ul>
                    </div>, 
                    "Apply through MyInfo"
                )}  
                className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
            >
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl max-w-[10rem]">
                        Apply through MyInfo
                    </h3>
                    <img src={require('../images/form.svg').default} alt="Apply through MyInfo" className="w-10 h-10" />
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
                        <p className="font-bold text-xl">What is openaccount.ocbc.com?</p>
                        <ul>
                            <li>Openaccount.ocbc.com is an online platform that allows customers to open a current or savings account remotely, without visiting any OCBC branch.</li>
                        </ul>

                        <p className="font-bold mt-4">Who Can Use openaccount.ocbc.com?</p>
                        <ul>
                            <li>All Singaporeans and Permanent Residents can use this platform.</li>
                            <li>Please ensure you meet the minimum age requirement for the product (e.g., 18 years for the 360 Account).</li>
                        </ul>

                        <p className="font-bold mt-4">How to Use the Online Remote Account Opening Capability:</p>
                        <ul>
                            <li>Select the account you wish to apply for and click on the "Apply online" button.</li>
                            <li>The application is accessible via a desktop or mobile browser.</li>
                            <li>To enable faster account opening, MyInfo is integrated to pull your personal data, with your consent, to fill out the application.</li>
                        </ul>

                        <p className="font-bold mt-4">What Products Can I Apply for Online?</p>
                        <ul>
                            <li>Currently, the OCBC 360/FRANK/Monthly Savings/Bonus+ Savings/Statement Savings Account is available for remote online account opening.</li>
                            <li>OCBC is working to make more products available for online application.</li>
                        </ul>

                        <p className="font-bold mt-4">Can Existing OCBC Customers Use the Remote Online Account Opening Capability?</p>
                        <ul>
                            <li>Yes, both new and existing customers can use this platform, provided they are Singaporeans or Permanent Residents.</li>
                        </ul>

                        <p className="font-bold mt-4">Difference Between Account Opening on Internet Banking and openaccount.ocbc.com:</p>
                        <ul>
                            <li>Both options offer online account opening.</li>
                            <li>Internet Banking account opening is for existing OCBC customers with internet banking access and a valid OCBC account.</li>
                            <li>Openaccount.ocbc.com allows both existing and new customers to apply for an account online (for Singaporeans and Permanent Residents).</li>
                        </ul>
                        </ul>

                    </div>, 
                    "About Remote Account Opening"
                )} 
                className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
            >
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl max-w-[12rem]">
                        About Remote Account Opening
                    </h3>
                    <img src={require('../images/globe.svg').default} alt="About Remote Account Opening" className="w-10 h-10" />
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

export default GeneralFaq;
