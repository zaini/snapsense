import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DescriptionIcon from '@material-ui/icons/Description';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Alert, AlertIcon, Spinner } from "@chakra-ui/react";
import { Center} from "@chakra-ui/layout";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

// This component should take in an array of submissions by the patient
// passed from the susmissions page
const PatientsPersonalLogTimeline = ({rows}) => {
  const classes = useStyles();

  const QUERY = GET_IMAGES_BY_PATIENT;

  const { loading, data, error } = useQuery(QUERY);
  
  let markup;

  if (loading) {
    markup = (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  } else if (error) {
    console.log(error);
    markup = (
      <Alert status="error">
        <AlertIcon />
        {/* {error.graphQLErrors[0].message} */}
      </Alert>
    );
  } 

  if (rows.length === 0) {
    return (
      <Timeline>
          <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary">
              <DescriptionIcon />
            </TimelineDot >
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1" align="center">
                No submissions have been made yet!
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    )
  }
  else{
    return (

      <Timeline>
          {rows.map((row, index) => (
            <TimelineItem>
            <TimelineOppositeContent>
              <Typography variant="body2" color="textSecondary">
                {row[index].createdAt}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary">
                <DescriptionIcon />
              </TimelineDot >
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6" component="h1" align="center">
                  Submission {index}
                </Typography>
                {/* TODO: Add image/questionnaire answers from real data */}
                <Typography>
                  {/* {data.getImages({variables: {submission_id: row.id}}).map((subImg, index) (
                    (<img src=""></img>)))} */}
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          ))}
      </Timeline>
    );
  }
};

export default PatientsPersonalLogTimeline;

const GET_IMAGES = gql`
  query {
    getImages {
      id
      image
    }
  }
`;

const GET_IMAGES_BY_PATIENT = gql`
  query GetSubmissions($submission_id: String!) {
    getSubmissions(submission_id: $submission_id) {
      id
      image
    }
  }
`;