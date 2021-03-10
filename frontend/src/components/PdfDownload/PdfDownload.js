import { DownloadIcon } from "@chakra-ui/icons";
import { Button, Center } from "@chakra-ui/react";

// PDF Libraries
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import ComponentToPrint from "./ComponentToPrint";

const PdfDownload = () => {
  const handlePDF = async () => {
    const doc = <ComponentToPrint />;
    const asPdf = pdf([]);
    asPdf.updateContainer(doc);
    const blob = await asPdf.toBlob();
    saveAs(blob, "document.pdf");
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
