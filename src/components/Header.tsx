import { Home, Phone, Mail } from 'lucide-react';

interface HeaderProps {
  onContactClick: () => void;
}

export function Header({ onContactClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Home size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Premier Estates</h1>
              <p className="text-sm text-gray-600">Luxury Real Estate</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#properties" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Properties
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              About
            </a>
            <button
              onClick={onContactClick}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Phone size={18} />
              Contact Us
            </button>
          </nav>

          <button
            onClick={onContactClick}
            className="md:hidden bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Mail size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
