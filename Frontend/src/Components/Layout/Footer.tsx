

const Footer = () => {
  return (
    <footer className="bg-sky-700 text-white py-8 mt-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: About Us */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-sm">
              Sincere Educational Consultancy provides comprehensive guidance to students seeking to study abroad. Our mission is to help students achieve their academic and career goals through quality education.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a  className="hover:underline">About</a>
              </li>
              <li>
                <a className="hover:underline">Services</a>
              </li>
              <li>
                <a className="hover:underline">Contact Us</a>
              </li>
              <li>
                <a  className="hover:underline">FAQs</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-sm">Sincere Educational Consultancy</p>
            <p className="text-sm">1234 Education Street, Knowledge City, EduCountry</p>
            <p className="text-sm">Email: info@educonsultancy.com</p>
            <p className="text-sm">Phone: +123 456 7890</p>
          </div>
        </div>

        <div className="border-t border-gray-400 mt-8 pt-4 text-center text-sm">
          <p>&copy; 2024 Sincere Educational Consultancy. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
