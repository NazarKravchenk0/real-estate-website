import { Search } from 'lucide-react';

interface HeroProps {
  onSearch: (query: string) => void;
}

export function Hero({ onSearch }: HeroProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    onSearch(query);
  };

  return (
    <div className="relative h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          opacity: 0.6,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          Find Your Dream Home
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-12 font-light">
          Discover exceptional properties in prime locations
        </p>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="bg-white rounded-full shadow-2xl p-2 flex items-center transition-all hover:shadow-3xl">
            <input
              type="text"
              name="search"
              placeholder="Search by city, neighborhood, or property type..."
              className="flex-1 px-6 py-3 text-gray-800 bg-transparent outline-none placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-full px-8 py-3 font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Search size={20} />
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
