import logo from '../images/logo_ocbc.svg';
import chevronDown from '../images/chevron-down.svg';

function NavBar() {
    return (
        <div className="font-opensans bg-white flex flex-col fixed top-0 left-0 right-0 z-50">
            {/* Main Navbar Content */}
            <div className="flex">
                {/* Red Line */}
                <div className="w-2 bg-red-600 h-28"></div>
                {/* Left Section with Logo */}
                <div className="flex items-center space-x-4">
                    <img src={logo} alt="OCBC Logo" className="h-10 ml-32" />
                </div>

                {/* Main Navbar Links */}
                <div className="container mx-auto flex flex-col justify-center py-2 px-6 pl-32 h-28">
                    {/* Top Row of Links */}
                    <div className="flex justify-start items-center py-1 space-x-20 h-20 text-sm">
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-500">You are in</span>
                            <button className="text-gray-600 font-bold flex items-center">
                                Personal Banking
                                <img src={chevronDown} alt="Chevron Down" className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                        <div className="flex space-x-12 pl-28">
                            <a href="#" className="text-pbanking hover:text-pbanking_hover">Premier Banking</a>
                            <a href="#" className="text-gray-500 hover:text-gray-900">Digital Banking</a>
                            <a href="#" className="text-gray-500 hover:text-gray-900">Security</a>
                            <a href="#" className="text-gray-500 hover:text-gray-900">Branches & ATMs</a>
                            <a href="#" className="text-gray-500 hover:text-gray-900">Get help</a>
                        </div>
                    </div>

                    {/* Bottom Row of Links */}
                    <div className="flex justify-between items-center py-1 border-t h-20">
                        <div className="flex space-x-20">
                            <a href="#" className="text-gray-500 hover:text-gray-900">Accounts</a>
                            <a href="#" className="text-gray-500 hover:text-gray-900">Cards</a>
                            <a href="#" className="text-gray-500 hover:text-gray-900">Loans</a>
                            <a href="#" className="text-gray-500 hover:text-gray-900">Insurance</a>
                            <a href="#" className="text-gray-500 hover:text-gray-900">Investments</a>
                            <a href="#" className="text-gray-500 hover:text-gray-900">Advisory</a>
                            <a href="#" className="text-gray-500 hover:text-gray-900">More</a>
                            <a href="#" className="text-red-500 font-bold hover:text-red-800">Login</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mini Nav Bar Below */}
            <div className="flex justify-center items-center py-2 border-t border-gray-300 bg-gray-300">
                <div className="flex space-x-20 text-sm">
                    <a href="HomePage" className="text-gray-500 hover:text-gray-900">FAQ</a>
                    <a href="ContactUsPage" className="text-gray-500 hover:text-gray-900">Contact Us</a>
                    <a href="BookingPage" className="text-gray-500 hover:text-gray-900">Book an Appointment</a>
                    <a href="LiveChat" className="text-gray-500 hover:text-gray-900">Live Chat</a>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
