import React from "react";

function CommonFaqs() {
    return (
        <div className="mt-8">
            {/* Title */}
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold">Common Topics</h2>
            </div>

            {/* Container for topics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mx-auto max-w-[1280px]">
                {/* Topic 1: Accounts */}
                <div className="relative border-2 border-gray-800 rounded-md overflow-hidden shadow-md hover:shadow-lg">
                    <img
                        src={require('../images/account.png')} 
                        alt="Accounts"
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4 flex justify-between items-center">
                        <h3 className="font-bold text-lg">Accounts</h3>
                        <img
                            src={require('../images/chevron-right.svg').default}
                            alt="Chevron Right"
                            className="w-6 h-6 text-red-500"
                        />
                    </div>
                </div>

                {/* Topic 2: Cards */}
                <div className="relative border-2 border-gray-800 rounded-md overflow-hidden shadow-md hover:shadow-lg">
                    <img
                        src={require('../images/CardBanner.png')} 
                        alt="Cards"
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4 flex justify-between items-center">
                        <h3 className="font-bold text-lg">Cards</h3>
                        <img
                            src={require('../images/chevron-right.svg').default}
                            alt="Chevron Right"
                            className="w-6 h-6 text-red-500"
                        />
                    </div>
                </div>

                {/* Topic 3: Loans */}
                <div className="relative border-2 border-gray-800 rounded-md overflow-hidden shadow-md hover:shadow-lg">
                    <img
                        src={require('../images/loan.png')} 
                        alt="Loans"
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4 flex justify-between items-center">
                        <h3 className="font-bold text-lg">Loans</h3>
                        <img
                            src={require('../images/chevron-right.svg').default}
                            alt="Chevron Right"
                            className="w-6 h-6 text-red-500"
                        />
                    </div>
                </div>

                {/* Topic 4: Investments */}
                <div className="relative border-2 border-gray-800 rounded-md overflow-hidden shadow-md hover:shadow-lg">
                    <img
                        src={require('../images/investment.png')} 
                        alt="Investments"
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4 flex justify-between items-center">
                        <h3 className="font-bold text-lg">Investments</h3>
                        <img
                            src={require('../images/chevron-right.svg').default}
                            alt="Chevron Right"
                            className="w-6 h-6 text-red-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommonFaqs;