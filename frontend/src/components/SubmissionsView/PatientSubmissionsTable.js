import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Stack, Button } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

import Table from "../utils/Table";
import { AuthContext } from "../../context/auth";

// Takes a list of submissions and shows them in the table and timeline view
const PatientSubmissionsTable = ({ data }) => {
  const { user } = useContext(AuthContext);

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
        const id = row.id;
        row.createdAt = Date.parse(row.createdAt)
          ? row.createdAt
          : new Date(parseInt(row.createdAt));

        const route_link =
          user.accountType === "PATIENT"
            ? `/my/submissions/show/${id}`
            : `/my/submissions/show/${id}`;

        return (
          <Stack direction="row" spacing={4}>
            <Link to={route_link}>
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

  return <Table data={data} cols={cols} />;
};

export default PatientSubmissionsTable;
