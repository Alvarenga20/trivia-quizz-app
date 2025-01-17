export const Footer = () => {
  return (
    <div>
      <footer className="text-center py-4 bg-gray-900 text-gray-300 shadow-inner mt-auto relative z-50">
        <p className="text-sm sm:text-base">
          &copy; {new Date().getFullYear()} Trivia Quiz. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Footer;