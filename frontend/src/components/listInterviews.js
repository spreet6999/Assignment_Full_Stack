//React Imports
import React from 'react';
import { Component } from 'react';

//Material UI Imports
import { Grid, Button, Modal, Backdrop, Fade, Paper } from '@material-ui/core';


//React-DateTime-Picker Imports
import DateTimePicker from 'react-datetime-picker/dist/DateTimePicker';


import { getInterviewList, updateInterview } from '../api/interviewsApi';

class listInterview extends Component{
    constructor(){
        super();

        this.state={
            Interviews: [],
            reSchedule: [],
            startDateValue: new Date(), endDateValue: new Date(),
            OpenModal: false
        }
        
        this.handleOpeningOfEditMenu.bind(this);
        this.handleClosingOfEditMenu.bind(this);
        this.handleScheduleInterview.bind(this);
        this.getStartDateValue.bind(this);
        this.getEndDateValue.bind(this);

    }

    componentDidMount(){
        getInterviewList()
        .then((response) => {
            let temp = [...response]
            this.setState({
            Interviews: temp
            });
        })
        .catch((err) => console.log(err));
        }

    getStartDateValue(props){
        if(props)
            return new Date(props);
        return new Date(this.state.reSchedule.start_time);
    }

    getEndDateValue(props){
        if(props)
            return new Date(props)
        return new Date(this.state.reSchedule.end_time);
    }

    handleStartDateChange(value){
        this.setState({startDateValue: value});
    }

    handleEndDateChange(value){
        this.setState({endDateValue: value});
    }

    handleOpeningOfEditMenu(e, Interview){
        this.setState({OpenModal: true, reSchedule: Interview});
    }

    handleClosingOfEditMenu(e){
        this.setState({OpenModal: false, reSchedule: []});
    }

    handleScheduleInterview(e){
            const participant_names = this.state.reSchedule.participant_names;
            const _id = this.state.reSchedule._id;
            const start_time = this.state.startDateValue;
            const end_time = this.state.endDateValue;
            console.log(participant_names);
            updateInterview(_id,participant_names,start_time,end_time)
            .then(
                (response) => {
                    if(response.error !== undefined){
                      
                      window.alert(response.error)
                    }
                    else if(response.text !== undefined)
                    {
                      window.alert("Interview Scheduled");
                      window.location.reload();
                    }
                }).catch((err) => console.log(err));
        }

    render(){

        return(
            <div className="listInterview">

            <Grid container 
                direction="row"
                spacing={3}
            >                            
                <Grid item xs={12}>
                    List of Upcoming Interviews
                </Grid>
                <Grid item xs={12}>
                    <Grid
                        container
                        direction="row"
                        spacing={1}
                    >
                        <Grid item xs={12} sm={4}>
                            <h4>Participants</h4>
                        </Grid >
                        <Grid item xs={12} sm={4}>
                            <h4>Timings</h4>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <h4>Re-Schedule</h4>
                        </Grid>
                    </Grid>
                </Grid>

                {this.state.Interviews.map( Interview =>
                <Grid item xs={12} key={Interview._id}>
                    <Grid container 
                        direction="row"
                        spacing={1}
                    >
                        <Grid item xs={12}>

                            <Grid 
                                container
                                direction="row"
                                spacing={1}
                            >
                                <Grid item xs={12} sm={4}>
                                    {Interview.participant_names.map(element => 
                                        (
                                            <p key={Interview.participant_names.indexOf(element)}>{element}</p>
                                        )
                                    )}
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    {"On: "}
                                    {this.getStartDateValue(Interview.start_time).getDate()} 
                                    / {this.getStartDateValue(Interview.start_time).getMonth()}
                                    / {this.getStartDateValue(Interview.start_time).getFullYear()}
                                    <br></br>
                                    {this.getStartDateValue(Interview.start_time).getHours()} : 
                                    {this.getStartDateValue(Interview.start_time).getMinutes()}
                                    {" to "}
                                    {this.getStartDateValue(Interview.end_time).getHours()} : 
                                    {this.getStartDateValue(Interview.start_time).getMinutes()}
                                </Grid>
                                
                                <Grid item xs={12} sm={4}>
                                    <Grid 
                                        container
                                        direction = "column"
                                        spacing={2}
                                    >
                                        <Grid item xs={12}>
                                            <Button 
                                                variant="contained"
                                                style={{
                                                    backgroundColor: "#36096d", 
                                                    backgroundImage: "linear-gradient(315deg, #36096d 0%, #37d5d6 74%)",
                                                    color: "whitesmoke",
                                                    fontWeight: "bolder"
                                                }}
                                                onClick={(e)=>this.handleOpeningOfEditMenu(e, Interview)}
                                            >
                                                Re-Schedule
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        
                        </Grid>
                        
                        
                    </Grid>
                </Grid>)}
            </Grid>

            {this.state.OpenModal && 
                <Modal
                open={this.state.OpenModal}
                onClose={(e) => this.handleClosingOfEditMenu(e)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}

                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
              >

                <Fade in={this.state.OpenModal}>
                        <Paper elevation={3}
                            style={{
                                margin: "20%",
                                width: "35%",
                                
                            }}>
                        <Grid 
                            container
                            direction="column"
                            style={{
                                padding: "5%"
                            }}
                            spacing={2}
                        >    
                            <Grid item xs={12}>
                                {this.state.reSchedule.participant_names.map(element => 
                                        (
                                            <h3 key={this.state.reSchedule.participant_names.indexOf(element)}>{element}</h3>
                                        )
                                    )}
                            </Grid>
                            <Grid item xs={12}>
                                <p id="transition-modal-description">
                                    Date: {this.getEndDateValue().getDate()} 
                                    / {this.getEndDateValue().getUTCMonth()} 
                                    / {this.getEndDateValue().getFullYear()}
                                    <br></br>
                                    Timing: {this.getStartDateValue().getHours()}:{this.getStartDateValue().getMinutes()}  to 
                                    {this.getEndDateValue().getHours()}:{this.getEndDateValue().getMinutes()}
                                </p>
                            </Grid>

                            <Grid item xs={12}>
                                <DateTimePicker 
                                    value={this.state.startDateValue} 
                                    onChange={this.handleStartDateChange.bind(this)}
                                    clearIcon={null}
                                    minDate={new Date()}
                                />
                                <DateTimePicker 
                                    value={this.state.endDateValue} 
                                    onChange={this.handleEndDateChange.bind(this)}
                                    clearIcon={null}
                                    minDate={new Date()}
                                />

                            </Grid>

                            <Grid item xs={12}>
                            <Button 
                                type="submit"
                                variant="contained"
                                style={{
                                    backgroundColor: "#36096d", 
                                    backgroundImage: "linear-gradient(315deg, #36096d 0%, #37d5d6 74%)",
                                    color: "whitesmoke",
                                    fontSize: "18px",
                                    fontWeight: "bolder"
                                }}
                                onClick={(e)=>this.handleScheduleInterview(e)}
                            >
                                Re-Schedule
                            </Button>
                    </Grid>
                        </Grid>
                    </Paper>

                </Fade>

              </Modal>
            }
            </div>
        );
    }
}

export default listInterview;