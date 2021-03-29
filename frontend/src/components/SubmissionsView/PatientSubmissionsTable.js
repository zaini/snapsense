import React from "react";
import { Link } from "react-router-dom";
import { Stack, Button } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

import Table from "../utils/Table";
import getFlagText from "../../utils/Flags";

// Takes a list of submissions and shows them in the table and timeline view
const PatientSubmissionsTable = ({ data }) => {
  const cols = [
    {
      field: "id",
      type: "number",
      headerName: "ID",
      flex: 0.3,
      hide: true,
    },
    {
      field: "flag",
      headerName: "Flag",
      flex: 0.3,
      renderCell: ({ row }) => {
        const flag = row.flag;
        return <p>{getFlagText(flag)}</p>;
      },
    },
    {
      field: "createdAt",
      type: "date",
      headerName: "Date submitted",
      flex: 0.5,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <p>
            {row.Images && row.Images.length !== 0 && "📷"}
            {row.Answers && row.Answers.length !== 0 && "📝"}
          </p>
        );
      },
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

        const route_link = `/my/submissions/show/${id}`;

        return (
          <Stack direction="row" spacing={4}>
            <Link to={route_link}>
              <Button leftIcon={<ViewIcon />} colorScheme="blue">
                View Submission
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
