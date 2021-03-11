import { DownloadIcon } from "@chakra-ui/icons";
import { Button, Center } from "@chakra-ui/react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const PdfDownload = () => {
  const randomData = [
    { name: "Keanu Reeves", profession: "Actor", age: 24 },
    { name: "Lionel Messi", profession: "Football Player", age: 24 },
    { name: "Cristiano Ronaldo", profession: "Football Player", age: 24 },
    { name: "Jack Nicklaus", profession: "Golf Player", age: 24 },
  ];

  const handlePDF = () => {
    const unit = "pt";
    const size = "A4"; //  A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "My Awesome Report";
    const headers = [["NAME", "PROFESSION", "AGE"]];
    const data = randomData.map((e) => [e.name, e.profession, e.age]);

    let content = {
      startY: 50, // basically a margin top value only for the first page
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf");
  };

  return (
    <Center>
      <Button
        w={16}
        colorScheme="red"
        rightIcon={<DownloadIcon />}
        onClick={() => handlePDF()}
      >
        PDF
      </Button>
    </Center>
  );
};

export default PdfDownload;
