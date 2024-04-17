import { Oval } from "react-loader-spinner";
const OvalLoader = () => {
  return (
    <>
      <Oval
        visible={true}
        height="20"
        width="20"
        color="green"
        ariaLabel="oval-loading"
        wrapperStyle={{ marginLeft: "10px" }}
      />
    </>
  );
};

export default OvalLoader;
