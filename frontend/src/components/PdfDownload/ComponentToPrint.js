import { Document, Page, Text } from "@react-pdf/renderer";
import pdf from "./sample.pdf";

const ComponentToPrint = () => (
  <Document>
    <Page>
      <Text>Hello</Text>
    </Page>
  </Document>
);

export default ComponentToPrint;
