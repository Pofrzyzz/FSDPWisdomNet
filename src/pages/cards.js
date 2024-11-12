import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavBar from "../components/navbar";
import CommonFaqs from "../components/commonfaqs";
import CardBanner from '../images/CardBanner.png';
import ChevronRight from '../images/chevron-right.svg';
import Help from "../components/needhelp";
import Footer from "../components/footer"
import Modal from "../components/popup";
import Chatbot from '../components/chatbot';

function CardsFaq() {

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
                    src={CardBanner}
                    alt="Card Banner"
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
                <div id="cardActivation"
                    onClick={() => openModal(
                        <div>
                            <p className="text-lg font-semibold">Credit and Debit Card Activation</p>
                            <p>You can activate your credit or debit card via OCBC using one of the following channels:</p>

                            <p className="mt-4 font-semibold">Via OCBC App</p>
                            <ul className="list-disc pl-6">
                                <li>Log in to the OCBC app.</li>
                                <li>Tap on the “More” icon in the bottom navigation bar.</li>
                                <li>Tap on “Card services”.</li>
                                <li>Select "Activate card".</li>
                                <li>Select “Activate credit/debit card”.</li>
                                <li>Select your card and enter the expiry date to activate.</li>
                                <li>Tap on “Next”.</li>
                                <li>Tap on “Agree” after reviewing the Terms and Conditions.</li>
                                <li>Tap on “Submit” after reviewing the activation details.</li>
                            </ul>

                            <p className="mt-4 font-semibold">Via OCBC Internet Banking</p>
                            <ul className="list-disc pl-6">
                                <li>Log in to OCBC Internet Banking with your access code and PIN.</li>
                                <li>Navigate to “Customer Service” → “Card services” → “Activate credit/debit card”.</li>
                                <li>Select your card and enter the expiry date.</li>
                                <li>Review and check the Terms and Conditions.</li>
                                <li>Tap on “Next”.</li>
                                <li>Tap on “Submit” after reviewing the activation details.</li>
                            </ul>

                            <p className="mt-4">Alternatively, you can use the <a href="https://internet.ocbc.com/cardactivation/" className="text-blue-500 underline">card activation form</a> here.</p>
                        </div>, 
                        "Card Activation"
                    )} 
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

                {/* Overseas Card Activation Button */}
                <div id="overseasCardActivation"
                    onClick={() => openModal(
                        <div>
                            <p className="text-lg font-semibold">OCBC Internet Banking</p>
                            <ul className="list-disc pl-6">
                                <li>Log in to OCBC Online Banking with your access code and PIN or Singpass.</li>
                                <li>Scroll over “Customer Service” → “Cards” and select “Overseas card usage”.</li>
                                <li>Select the card to link/delink to an account for ATM transactions.</li>
                                <li>Select the account to link and tap on the "Next" button to confirm.</li>
                            </ul>
                            <p className="mt-4">Note: OCBC Business Debit Card customers without OCBC Online Banking access will not be able to activate the overseas ATM cash withdrawal on their card via Online Banking. To activate overseas cash withdrawal, please submit the OCBC Business Debit Card Maintenance form.</p>

                            <p className="text-lg font-semibold mt-8">OCBC Digital App</p>
                            <ul className="list-disc pl-6">
                                <li>Log in to the OCBC Digital app.</li>
                                <li>Tap on the menu bar on the top left of the screen.</li>
                                <li>Tap on “Card services”.</li>
                                <li>Select “Manage overseas usage”.</li>
                                <li>Select the card to enable/disable overseas cash withdrawal.</li>
                                <li>Indicate the period for overseas usage.</li>
                                <li>Tap on the “Next” and “Agree” buttons.</li>
                                <li>Tap on the “Submit” button after reviewing the changes.</li>
                            </ul>
                        </div>, 
                        "Overseas Card Activation"
                    )} 
                    className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
                >
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xl max-w-[10rem]">Overseas Card Activation</h3>
                        <img src={require('../images/globe.svg').default} alt="Overseas Card Usage" className="w-10 h-10" />
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center">
                        <p className="text-lg mr-1">Learn more</p>
                        <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                    </div>
                </div>

                {/* Apply for Card Button */}
                <div id="applyCard"
                    onClick={() => openModal(
                        <div>
                            <p className="text-lg font-semibold">Why should I use Myinfo to complete my application?</p>
                            <ul className="list-disc pl-6">
                                <li>Myinfo contains Singapore government-verified information on you, which you can allow banks to use to support your application.</li>
                                <li>Using Myinfo will auto-populate the majority of the fields in the application form, shortening the process and providing an almost immediate application outcome.</li>
                            </ul>

                            <p className="text-lg font-semibold mt-8">If I use Myinfo to make my application, is it possible to edit fields pre-filled by Myinfo? If so, what are the editable fields?</p>
                            <ul className="list-disc pl-6">
                                <li>As Myinfo contains verified information, only some fields are editable, including:
                                    <ul className="list-disc pl-6">
                                        <li>Mobile number</li>
                                        <li>Email address</li>
                                        <li>Name of employer (if you are a Singaporean or PR)</li>
                                        <li>Education level</li>
                                    </ul>
                                </li>
                                <li>To update non-editable fields, contact the relevant agencies as indicated in Myinfo.</li>
                                <li>If you are using a different mailing address from what is in Myinfo, please complete the other form instead.</li>
                            </ul>

                            <p className="text-lg font-semibold mt-8">I am an existing OCBC credit card holder. Can I apply for a 2nd credit card via this channel?</p>
                            <ul className="list-disc pl-6">
                                <li>If you wish to apply for a 2nd credit card and are satisfied with your current credit limit, apply via Internet Banking for instant approval.</li>
                                <li>You will receive your card details instantly through a link sent via SMS and email.</li>
                            </ul>

                            <p className="text-lg font-semibold mt-8">I am currently receiving the bank's one-time passwords through a mobile number that is different from the one I used in my application. Will this change with my application?</p>
                            <ul className="list-disc pl-6">
                                <li>No, your one-time passwords will continue to be sent to the original mobile number.</li>
                            </ul>

                            <p className="text-lg font-semibold mt-8">I completed my application at a roadshow. Is this different from applying through the bank's website?</p>
                            <ul className="list-disc pl-6">
                                <li>Your application is not processed immediately at a roadshow. After one hour, you will receive an SMS and email with a link to trigger instant processing.</li>
                            </ul>

                            <p className="text-lg font-semibold mt-8">When will I be required to use the hardcopy application form?</p>
                            <ul className="list-disc pl-6">
                                <li>You will need a hardcopy form if:
                                    <ul className="list-disc pl-6">
                                        <li>Applying for a supplementary card.</li>
                                        <li>Your mailing address is outside of Singapore.</li>
                                    </ul>
                                </li>
                                <li>Visit any OCBC branch for a hardcopy form.</li>
                            </ul>

                            <p className="text-lg font-semibold mt-8">What are the system downtimes and how will I be impacted by it?</p>
                            <ul className="list-disc pl-6">
                                <li>From 9:30 pm to 6 am daily, and on Sundays and Public Holidays (for ExtraCash Loans), you may receive an approval status but won’t receive SMS and email notifications with the link to product details.</li>
                                <li>From 12 am to 8 am daily, due to Credit Bureau maintenance, your unsecured credit card or loan/line application will not receive an instantaneous outcome.</li>
                            </ul>

                            <p className="text-lg font-semibold mt-8">How will I be contacted if my application requires pending documents or has been rejected?</p>
                            <ul className="list-disc pl-6">
                                <li>You will receive an email and a physical letter for each product applied for, informing you of any required documents or if your application has been rejected.</li>
                            </ul>
                        </div>, 
                        "Apply for Card"
                    )}
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

                {/* Credit Limit Button */}
                <div id="creditLimit"
                    onClick={() => openModal(
                        <div>
                            <p className="text-lg font-semibold">Why has my credit limit gone down when I cannot see the transaction in my Internet Banking?</p>
                            <ul className="list-disc pl-6">
                                <li>When you perform a transaction, the amount is earmarked from your credit limit first.</li>
                                <li>The transaction may not appear in Internet Banking immediately because it hasn’t been posted yet.</li>
                                <li>Once the merchant records and posts the transaction to your card, it will appear in Internet Banking, and the amount will be deducted from your credit limit.</li>
                            </ul>

                            <p className="text-lg font-semibold mt-8">Why doesn't the total available credit limit on my statement match with the spending on my cards?</p>
                            <ul className="list-disc pl-6">
                                <li>The total available credit limit on your statement considers the outstanding and earmarked amounts on all your cards.</li>
                                <li>Example breakdown:
                                    <table className="table-auto border-collapse border border-gray-300 mt-4">
                                        <thead>
                                            <tr>
                                                <th className="border border-gray-300 px-4 py-2">Card 1</th>
                                                <th className="border border-gray-300 px-4 py-2">Card 2</th>
                                                <th className="border border-gray-300 px-4 py-2">Card 3</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border border-gray-300 px-4 py-2">Outstanding amount: S$500</td>
                                                <td className="border border-gray-300 px-4 py-2">Outstanding amount: S$500</td>
                                                <td className="border border-gray-300 px-4 py-2">Outstanding amount: S$500</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-300 px-4 py-2">Earmarked amount: S$700</td>
                                                <td className="border border-gray-300 px-4 py-2">Earmarked amount: -</td>
                                                <td className="border border-gray-300 px-4 py-2">Earmarked amount: S$250</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3" className="border border-gray-300 px-4 py-2 text-center font-semibold">Total credit limit: S$10,000</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3" className="border border-gray-300 px-4 py-2 text-center font-semibold">Total available credit limit: S$7,550</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </li>
                                <li>The total available credit limit is based on the point in time your statement was generated, so it won’t include any transactions made afterward.</li>
                                <li>For a more accurate total available credit limit, log in to OCBC Internet Banking or the OCBC Digital app.</li>
                            </ul>
                        </div>, 
                        "Credit Limit"
                    )}
                    className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
                >
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xl max-w-[10rem]">Credit Limit</h3>
                        <img src={require('../images/CardCancel.png')} alt="Credit Limit" className="w-10 h-8" />
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center">
                        <p className="text-lg mr-1">Learn more</p>
                        <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* Bottom 4 Squares */}
            <div id="extraButtons" className={isExpanded ? "grid grid-cols-2 md:grid-cols-4 gap-8 mt-8 mx-auto max-w-[1280px]" : "hidden"}>
            {/* Check Balance */}
            <div id="checkBalance"
                onClick={() => openModal(
                    <div>
                        <p className="text-lg font-semibold">Internet Banking</p>
                        <ul className="list-disc pl-6">
                            <li>Log in to OCBC Online Banking.</li>
                            <li>Click on “Your Accounts”.</li>
                            <li>From the drop-down, click “Overview”.</li>
                            <li>Scroll down to view “What you owe (Liabilities)” under Credit Cards.</li>
                            <li>Look for “Amount Due” for the specific card type.</li>
                        </ul>

                        <p className="text-lg font-semibold mt-8">OCBC Digital</p>
                        <ul className="list-disc pl-6">
                            <li>Log in to the OCBC Digital app.</li>
                            <li>Select "What you owe".</li>
                            <li>Select the relevant Credit Card to view your Credit Card balance.</li>
                        </ul>

                        <p className="text-lg font-semibold mt-8">Phone Banking</p>
                        <ul className="list-disc pl-6">
                            <li>Dial 1800 363 3333 (local) or +65 6363 3333 (overseas).</li>
                            <li>Select your Language Preference.</li>
                            <li>Press *3 and enter your phone banking access code and PIN, followed by #.</li>
                            <li>Select 1 for Balance and transaction.</li>
                            <li>Select 1 for Balance.</li>
                            <li>Select 1 for Credit Card.</li>
                        </ul>
                        <p className="mt-4">Note: Your credit card balance does not include any payments or transactions made today.</p>
                    </div>, 
                    "Check Balance"
                )} 
                className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
            >
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl max-w-[10rem]">
                        Check Balance
                    </h3>
                    <img src={require('../images/dollar.svg').default} alt="Check Balance" className="w-10 h-10" />
                </div>
                <div className="absolute bottom-4 right-4 flex items-center">
                    <p className="text-lg mr-1">Learn more</p>
                    <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                </div>
            </div>
            
            {/* Check Transaction */}
            <div id="checkTransaction"
                onClick={() => openModal(
                    <div>
                        <p className="text-lg font-semibold">View Credit Card Details on Online Banking</p>
                        <ul className="list-disc pl-6">
                            <li>Log in to OCBC Online Banking.</li>
                            <li>Click on “Your Accounts”.</li>
                            <li>From the drop-down menu, click “Overview”.</li>
                            <li>Scroll down to view “What you owe (Liabilities)” under Credit Cards.</li>
                            <li>Click on the specific card type.</li>
                            <li>From the popout tooltip, select "Details / Transactions".</li>
                        </ul>
                    </div>, 
                    "Check Transaction"
                )} 
                className="cursor-pointer bg-[#F2F2F2] border-2 border-gray-600 p-4 text-left shadow-md rounded-md hover:shadow-lg hover:bg-[#E0E0E0] w-[300px] h-[150px] relative"
            >
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl max-w-[10rem]">
                        Check Transaction
                    </h3>
                    <img src={require('../images/transaction.svg').default} alt="Check Transaction" className="w-10 h-10" />
                </div>
                <div className="absolute bottom-4 right-4 flex items-center">
                    <p className="text-lg mr-1">Learn more</p>
                    <img src={ChevronRight} alt="Chevron Right" className="w-6 h-6" />
                </div>
            </div>
            
            {/* Card Replacement */}
            <div id="cardReplacement"
                onClick={() => openModal(
                    <div>
                        <p className="text-lg font-semibold">Request a Replacement Card via OCBC Online Banking</p>
                        <p>You can request a replacement card through OCBC Online Banking.</p>

                        <p className="text-lg font-semibold mt-8">Request a Replacement Card via OCBC Digital</p>
                        <ul className="list-disc pl-6">
                            <li>Log in to the OCBC Digital app.</li>
                            <li>Tap on the menu bar on the top left of the screen.</li>
                            <li>Tap on "Card services".</li>
                            <li>Select “Replace Card”.</li>
                            <li>Select the card you wish to replace.</li>
                            <li>Select the reason for replacing your card.</li>
                        </ul>
                    </div>, 
                    "Card Replacement"
                )}  
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

export default CardsFaq;
