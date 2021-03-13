import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DescriptionIcon from '@material-ui/icons/Description';
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const PatientsPersonalLogTimeline = ({rows}) => {
  const classes = useStyles();

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
                {row[index-1].createdAt}
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
                {/* TODO: Update link to view the details of submission */}
                <Typography align="center"><Button><Link to="/">View</Link></Button></Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          ))}
      </Timeline>
    );
  }
};

export default PatientsPersonalLogTimeline;