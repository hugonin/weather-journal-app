
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Global Variables */
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const API_KEY = "40920e96f6692cfaf039f8ea5bcbcf68";




// Event listener to add function to existing HTML DOM element 
document.getElementById('generate').addEventListener('click', performAction);

// Function called by event listener
function performAction(e) {
    let newZipCode = document.getElementById("zip").value;
    let newContent = document.getElementById("feelings").value;

    if (newZipCode == "" ) {
        alert("Please provide a zip code");
        return false;
      }
    
    
    getData(baseUrl, newZipCode, API_KEY)
        .then(function(data) {
            console.log(data);
            //Add data to POST request
            postData('/add', {date: newDate, temp: data.main.temp, content: newContent});
        }) 
        .then(()=> {
            updateUI();
        })
}


// asynchronous function to fetch the data from the app endpoint  
const getData = async (url, zip, key) => {

    const res = await fetch(url + `${zip}&appid=${key}&units=metric`)
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log("error", error)
    }
}

// Post Route
const postData = async ( url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)  
    });
    
    try {
        const newData = await response.json();
        console.log('Data received:', newData);
        console.log(newData);
        return newData;
      } catch(error) {
      console.log("error", error);
      }
};


// Update UI function
const updateUI = async () => {
  
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData.temp} °C`;
        document.getElementById('content').innerHTML = `I feel: ${allData.content}`;
  
    }catch(error){
      console.log("error", error);
    }
  }

