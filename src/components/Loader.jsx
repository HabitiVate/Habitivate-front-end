import { ColorRing } from "react-loader-spinner";

const Loader = ({ size }) => {
  return (
    <ColorRing
      visible={true}
      height={size}
      width={size}
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
    />
  );
};

export default Loader;
