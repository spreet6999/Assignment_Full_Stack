//Api to get the all Interviews
export const getInterviewList = () => {
    return fetch(`http://localhost:5000/interview/interviewgetall`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((err) => console.log(err));
};

//Api call to get a particular Interview
export const getInterview = (eventId) => {
    return fetch(`http://165.22.222.118:8000/interviewget/${eventId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((err) => console.log(err));
  };


//Api to Create Interview
export const createInterview = (participant_names, start_time, end_time) => {
  const data = {
    start_time: start_time.getTime(),
    end_time: end_time.getTime(),
    participant_names: participant_names
  };
  console.log(data);
  return fetch(`http://localhost:5000/interview/interviewpost/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
      return response;
    })
    .catch((err) => console.log(err));
};


//Api to Update Interview
export const updateInterview = (_id ,participant_names, start_time, end_time) => {
  const data = {
    start_time: start_time.getTime(),
    end_time: end_time.getTime(),
    participant_names: participant_names
  };
  console.log(data);
  return fetch(`http://localhost:5000/interview/interviewupdate/${_id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
      return response;
    })
    .catch((err) => console.log(err));
};




//Api to Delete Interview
  export const removeInterview = (eventId) => {
    return fetch(`http://165.22.222.118:8000/removeInterview/${eventId}`, {
      method: "DELETE",
      dataType: "json",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((err) => console.log(err));
  };