import { XCircle } from "lucide-react";

const PaymentFailedModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[50] flex items-center justify-center backdrop-blur-sm bg-black/60 transition-opacity duration-300">
      <div className="bg-[#121212] border border-red-500/30 text-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md text-center animate-fade-in">
        <XCircle className="w-14 h-14 text-red-500 mx-auto" />
        <h2 className="text-2xl font-bold mt-4 text-red-400">Payment Failed</h2>
        <p className="text-gray-400 mt-2">
          Your transaction couldn’t be completed. Please try again.
        </p>
        <button
          className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-200 font-medium"
          onClick={onClose}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default PaymentFailedModal;
