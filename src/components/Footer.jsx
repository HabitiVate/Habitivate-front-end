import Logo from "./Logo";

const Footer = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center text-sm sm:text-base gap-4 p-4 bg-gray-800 text-white">
      <p className="text-center sm:text-left">© 2024 Habitica. All rights reserved.</p>
      <div className="flex justify-center">
        <Logo />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 text-center">
        <p>Privacy Policy</p>
        <p>Terms and Conditions</p>
      </div>
    </div>
  );
};

export default Footer;
