import { Link } from "react-router-dom";
import { Stack, Button } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import Table from "../utils/Table";

// Takes a list of submissions and shows them in the table and timeline view
const PatientSubmissionsTable = ({ data }) => {
  return <Table data={data} cols={cols} />;
};

export default PatientSubmissionsTable;

const cols = [
  {
    field: "id",
    type: "number",
    headerName: "ID",
    flex: 0.3,
    hide: true,
  },
  {
    field: "createdAt",
    type: "date",
    headerName: "Date submitted",
    sortable: true,
    flex: 1,
  },
  {
    field: "",
    headerName: "Type",
    flex: 1,
  },
  {
    field: "",
    headerName: "Actions",
    sortable: false,
    disableClickEventBubbling: true,
    renderCell: ({ row }) => {
      let id = row.id;

      return (
        //would the link be different for doctor?
        <Stack direction="row" spacing={4}>
          <Link to={`my/submissions/show/${id}`}>
            <Button leftIcon={<ViewIcon />} colorScheme="blue">
              View
            </Button>
          </Link>
        </Stack>
      );
    },
    flex: 0.7,
  },
];
