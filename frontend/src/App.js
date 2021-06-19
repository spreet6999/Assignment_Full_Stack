//React Imports
import React from 'react';
import { Component } from 'react';

//Style Sheet Import
import './App.css';

//Material UI Imports
import { Paper, AppBar, Tabs, Tab} from '@material-ui/core';

//Components Imports
import ScheduleInterview from './components/scheduleInterviews';
import ListInterview from './components/listInterviews';


class InterviewApp extends Component {
  constructor(props){
    super(props);
    this.state = {tabSelect: 0};

    this.handleChange.bind(this);
  }


  handleChange = (event, newtabSelect) => {
    this.setState({tabSelect: newtabSelect});
  };

  render(){
    return(
      <div className="App" style={{ overflow: "hidden" }}>
      <AppBar position="static"
        style={{
          alignItems:"center",
          background:"linear-gradient(to right, orange , yellow, green, cyan, blue, violet)"
        }}  
      >
        <Tabs 
          value={this.state.tabSelect} 
          onChange={this.handleChange}
          aria-label="tabs"
        >
          <Tab label="Schedule Interviews" {...{id: 0}} style={{ fontWeight:"bolder", fontSize:"100%"}}/>
          <Tab label="Interviews" {...{id: 1}} style={{ fontWeight:"bolder", fontSize:"100%"}}/>
        </Tabs>
      </AppBar>
      <Paper 
          elevation={3}
          style={{
            margin:"20px",
          }}  
        >
          {this.state.tabSelect === 0 && <ScheduleInterview/>}
          {this.state.tabSelect === 1 && <ListInterview/>}
        </Paper>
    </div>
    );
  }
}

export default InterviewApp;
