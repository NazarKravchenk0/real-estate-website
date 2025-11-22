import { CheckCircle, X } from 'lucide-react';

interface SuccessMessageProps {
  onClose: () => void;
}

export function SuccessMessage({ onClose }: SuccessMessageProps) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Thank You!
          </h2>
          <p className="text-gray-600">
            Your inquiry has been successfully submitted. We'll get back to you within 24 hours.
          </p>
        </div>

        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
}
