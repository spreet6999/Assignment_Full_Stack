//React Imports
import React from 'react';
import { Component } from 'react';

//Materia UI Imports
import { Grid, Button, Chip, Paper } from '@material-ui/core';

//React-Date-Picker Imports
import DateTimePicker from 'react-datetime-picker';

//API Imports
import { getUsers } from '../api/getUsersApi';
import * as api from '../api/interviewsApi'

class scheduleInterview extends Component{
    constructor(props){
        super(props);
        this.state = {users: [], participants: [], startDateValue: new Date(), endDateValue: new Date(new Date().getTime() + 100000)};

        this.handleAddParticipants.bind(this);
        this.handleRemoveParticipants.bind(this);
        this.handleScheduleInterview.bind(this);
    }

    componentDidMount(){
        this.getUsers();
    }

    async getUsers(){
        const data = await getUsers()
        console.log(data)
        this.setState({users: data})
    }

    handleStartDateChange(value){
        this.setState({startDateValue: value});
    }

    handleEndDateChange(value){
        this.setState({endDateValue: value});
    }

    handleAddParticipants(e, newUser){
        let temp = [...this.state.participants, newUser];
        this.setState({participants: temp})
    } 

    handleRemoveParticipants(e, newUser){
        let temp = this.state.participants.filter((user)=>newUser.userId!==user.userId)
        this.setState({participants: temp})
    }

    handleScheduleInterview(e){
        let countCandidates = this.state.participants.reduce((c,user)=>{
            if(user.roles.includes(0)) c+=1
            return c;
        },0);
        let countInstructors = this.state.participants.reduce((c,user)=>{
            if(user.roles.includes(1)) c+=1
            return c;
        },0);
        
        if(!countCandidates) window.alert("Minimum Candidates must be 1");
        
        else if (!countInstructors) window.alert("Minimum Instructors must be 1");
        
        else{
            const participant_names = this.state.participants.map((user)=>user.name);
            const start_time = this.state.startDateValue;
            const end_time = this.state.endDateValue;
            api.createInterview(participant_names,start_time,end_time)
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
    }

    render(){
        return(
            <div className="scheduleInterview">
            <Grid container 
                direction="row"
                spacing={2}
            >
                {this.state.users.length>0 && this.state.users.map( User =>
                <Grid item xs={12} key={User._id}>
                    <Grid container 
                        direction="row"
                        spacing={1}
                    >
                        <Grid item xs={8}>

                            <Grid 
                                container
                                direction="row"
                                spacing={1}
                            >
                                <Grid item xs={12} sm={4}>{User.name}</Grid>
                                <Grid item xs={12} sm={4}>{User.email}</Grid>
                                {User.roles.includes(1) && <Grid item xs={12} sm={4}> 
                                    <Chip 
                                        label="Interviewer"                                     
                                        style={{background: "#90EE90", color: "#707B7C"}}
                                    />
                                </Grid>
                                }
                                {User.roles.includes(0) && <Grid item xs={12} sm={4}> 
                                    <Chip 
                                        label="Candidate"
                                        style={{background: "#FFC1FF", color: "white"}}
                                    >
                                    </Chip>
                                </Grid>}
                            </Grid>

                        </Grid>
                        
                        <Grid item xs={4}>
                            { !this.state.participants.includes(User) &&
                                <Button 
                                variant="contained"
                                style={{
                                    backgroundColor: "#36096d", 
                                    backgroundImage: "linear-gradient(315deg, #36096d 0%, #37d5d6 74%)",
                                    color: "whitesmoke"}}
                                onClick={(e)=>this.handleAddParticipants(e,User)}
                            >
                                Add
                            </Button>}

                            { this.state.participants.includes(User) &&
                                <Button 
                                variant="contained"
                                style={{
                                    backgroundColor: "#f5f5f1", 
                                    backgroundImage: "linear-gradient(315deg, #f5f5f1 0%, #e50914 74%)", 
                                    color: "whitesmoke"}}
                                onClick={(e)=>this.handleRemoveParticipants(e,User)}
                            >
                                Remove
                            </Button>}

                        </Grid>
                    </Grid>
                </Grid>)}
            </Grid>
            {this.state.participants.length ?
            
            <Paper 
                variant="outlined"
                elevation={4}
                style={{background: "#DEECF7",
                    margin:"100px",
                }}
            >
                <Grid container 
                    direction="row"
                    spacing={3}
                    style={{ background: "white", margin:"20px" }}
                >
                    {this.state.participants.map((participant)=>{
                        return (
                            <Grid item xs={12} sm={2} key={this.state.participants.indexOf(participant)}><Chip label={participant.name} variant="outlined"/></Grid>
                        )
                    })}
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
                            Schedule
                        </Button>
                    </Grid>
            
                </Grid> 
            </Paper> : 
            <Grid container 
                direction="row"
                style={{margin: "50px"}}
            >
                <Grid item 
                    xs={8}
                    m={6}
                    style={{padding:"20px"}}
                ><p>Please Select a minimum of 2 participants (Atleast one Candidate and one Interviewer) :-)</p></Grid>
            </Grid>
            }
            </div>
        );
    }
}

export default scheduleInterview;