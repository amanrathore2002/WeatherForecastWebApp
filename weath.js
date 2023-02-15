let loc=document.getElementById("location");
let tempicon=document.getElementById("temp-icon");
let tempvalue=document.getElementById("temp-value");
let climate=document.getElementById("climate");
let iconfile;
const searchInput=document.getElementById("cityInput");
const searchButton=document.getElementById("searchb");
const timeEl = document.getElementById('current-time');
const dateEl = document.getElementById('date');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];



searchButton.addEventListener('click', (e)=>{
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value=' ';



});

const getWeather=async (city)=>{
    try{

        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b4ecc64877692c6fdf39003b9cafee41`,

            {mode: 'cors'}
        );

        const weatherData=await response.json();
        console.log(weatherData);
        const{name}=weatherData;
        const{feels_like}=weatherData.main;
        const{id,main}=weatherData.weather[0];
        loc.textContent=name;
        climate.textContent=main;
        tempvalue.textContent=Math.round(feels_like-273);

        if(id<300 && id>200)
                    {
                        tempicon.src="weathicons/thunderstorm.svg"
                    }
                    else if(id<400 && id>300)
                    {
                        tempicon.src="weathicons/cloudy-weather.svg"
                    }
                    else if(id<600 && id>500)
                    {
                        tempicon.src="weathicons/rainy-day.svg"
                    }
                    else if(id<700 && id>600)
                    {
                        tempicon.src="weathicons/snowflake.svg"
                    }
                    else if(id<800 && id>700)
                    {
                        tempicon.src="weathicons/cloudy.svg"
                    }
                    else if(id==800){
                        tempicon.src="weathicons/cloudy-sun.svg"
                    }


    }

catch(error){
    alert('City Not Found');
}

};


window.addEventListener("load", ()=> {
    let lon;
    let lat;

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition((position)=>
        {
            lon=position.coords.longitude;
            lat=position.coords.latitude;
            const proxy="https://cors-anywhere.herokuapp.com/";

                const api=`${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b4ecc64877692c6fdf39003b9cafee41`

                fetch(api).then((response)=>{
                    return response.json();
                })

                .then (data=>{

                    const{name}=data;
                    const{feels_like}=data.main;
                    const{id,main}=data.weather[0];

                    loc.textContent=name;
                    climate.textContent=main;
                    tempvalue.textContent=Math.round(feels_like-273);
                    if(id<300 && id>200)
                    {
                        tempicon.src="weathicons/thunderstorm.svg"
                    }
                    else if(id<400 && id>300)
                    {
                        tempicon.src="weathicons/cloudy-weather.svg"
                    }
                    else if(id<600 && id>500)
                    {
                        tempicon.src="weathicons/rainy-day.svg"
                    }
                    else if(id<700 && id>600)
                    {
                        tempicon.src="weathicons/snowflake.svg"
                    }
                    else if(id<800 && id>700)
                    {
                        tempicon.src="weathicons/cloudy.svg"
                    }
                    else if(id==800){
                        tempicon.src="weathicons/cloudy-sun.svg"
                    }





                    console.log(data);
                })



        })
    }
})


setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat: hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes) + ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day]+ ','+date+' '+ months[month]

    // dateEl.innerHTML = Date();
}, 1000);


function GetInfo() {

    var newName = document.getElementById("cityInput");
    var cityName = document.getElementById("cityName");
    cityName.innerHTML = "--"+newName.value+"--";

fetch('https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid=32ba0bfed592484379e51106cef3f204')
.then(response => response.json())
.then(data => {

    //Getting the min and max values for each day
    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1)+ "°";
        //Number(1.3450001).toFixed(2); // 1.35
    }

    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
    }
    //------------------------------------------------------------

    //Getting Weather Icons
     for(i = 0; i<5; i++){
        document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
        data.list[i].weather[0].icon
        +".png";
    }
    //------------------------------------------------------------
    console.log(data)


})

.catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton"))
}