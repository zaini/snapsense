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

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

//The rows will be an array of the submissions by the patient
//passed from the submissions page

const PatientsPersonalLogTimeline = ({ rows }) => {
  const classes = useStyles();

  if (rows.length === 0) {
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
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6" component="h1" align="center">
                  Submission {index}
                </Typography>
                {/* TODO: Add image/questionnaire answers from real data */}
                <Typography>Image/questionnaire</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    );
  }
};

export default PatientsPersonalLogTimeline;
