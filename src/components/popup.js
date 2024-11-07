import React from 'react';

function Modal({ isOpen, onClose, content, title }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] rounded-lg shadow-2xl overflow-hidden">
                {/* Modal header */}
                <div className="bg-gray-800 text-white px-4 py-5 flex items-center justify-between border-b-2 border-red-500">
                    <button onClick={onClose} className="text-ms font-semibold hover:text-gray-300 flex items-center">
                        <span className="text-xl mr-2">&larr;</span> {/* Text-based left arrow */}
                        Back
                    </button>
                    <h2 className="text-4xl font-geomanist text-center flex-grow">{title}</h2>
                    <div className="w-8"></div>
                </div>

                {/* Scrollable content area */}
                <div className="p-6 text-gray-800 overflow-y-auto max-h-[70vh]">
                    {content}
                </div>
            </div>
        </div>
    );
}



export default Modal;
