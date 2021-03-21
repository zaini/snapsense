import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { Heading, Center } from "@chakra-ui/react";
import DoctorHomePanel from "../../components/HomePage/DoctorHomePanel";
import PatientHomePanel from "../../components/HomePage/PatientHomePanel";

// How useful analytics for patients and doctors
const MyHomePage = () => {
  const { user } = useContext(AuthContext);

  let markup;

  switch (user.accountType) {
    case "DOCTOR":
      markup = <DoctorHomePanel />;
      break;
    case "PATIENT":
      markup = <PatientHomePanel />;
      break;
    default:
      markup = <>You shouldn't be here...</>;
      break;
  }

  return (
    <>
      <Center>
        <Heading>My Home</Heading>
      </Center>

      <br />
      <hr />
      <br />

      {markup}
    </>
  );
};

export default MyHomePage;
