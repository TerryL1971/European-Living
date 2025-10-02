export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-300">&copy; {new Date().getFullYear()} European Living. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#home" className="hover:text-brand-gold">Home</a>
          <a href="#destinations" className="hover:text-brand-gold">Destinations</a>
          <a href="#tips" className="hover:text-brand-gold">Travel Tips</a>
          <a href="#phrases" className="hover:text-brand-gold">Phrases</a>
          <a href="#services" className="hover:text-brand-gold">Services</a>
        </div>
      </div>
    </footer>
  );
}
