import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DescriptionIcon from "@material-ui/icons/Description";
import SubmissionCard from "../SubmissionsView/SubmissionCards/SubmissionCard";

const PatientSubmissionsTimeline = ({ data }) => {
  const classes = useStyles();

  if (data.length === 0) {
    return (
      <Timeline>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary">
              <DescriptionIcon />
            </TimelineDot>
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
    );
  } else {
    return (
      <Timeline data-testid="timelineContainer" align="right">
        {data.map((submission, index) => {
          let createdAt = submission.createdAt;
          let createdAtDate = parseInt(createdAt);
          if (isNaN(createdAtDate)) {
            createdAtDate = createdAt;
          }

          const submission_date = new Date(createdAtDate);

          return (
            <TimelineItem data-testid={`tCard${index}`} key={index}>
              <TimelineOppositeContent>
                <Typography
                  data-testid={`tTypo${index}`}
                  variant="body2"
                  color="textSecondary"
                >
                  {submission_date.toDateString()}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary">
                  <DescriptionIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <SubmissionCard data={submission} />
                </Paper>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    );
  }
};

export default PatientSubmissionsTimeline;

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));
