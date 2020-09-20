import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  WeatherData:any;
  lat;
  lon;


  constructor() {}

  ngOnInit() {
    this.WeatherData = {
      main: {},
      isDay:true
    }
    this.getUserLocation();
  }

  getUserLocation() {
    // get Users current position

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        this.getWeatherData();


      });
    }
  }

  getWeatherData(){
   // fetch('https://api.openweathermap.org/data/2.5/weather?lat='+this.lat+'&lon='+this.lon+'&appid=c7958779c34aab59e1acc49db1df7160')
     fetch('https://fyr26kos9c.execute-api.us-east-1.amazonaws.com/default/Weather?lat='+this.lat+'&lon='+this.lon)
      .then(response=>response.json())
      .then(data=>{this.setWeatherData(data);})
  }

  setWeatherData(data){
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset*1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp -273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min -273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max -273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like -273.15).toFixed(0);


  }


}
