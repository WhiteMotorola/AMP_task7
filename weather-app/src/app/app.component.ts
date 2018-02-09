import { Component } from '@angular/core';
import { Response, Request, RequestOptions, RequestMethod, Http, Headers } from '@angular/http';
import { Subscription } from 'rxjs';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loc = {
    country: '',
    city: ''
  };

  weather = '';

  dataSubscription: Subscription;
  title = 'Weather!!';
  url = 'https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="minsk, by")&format=json';

  constructor (private http: Http) {
    this.getData().subscribe((data: any) => {
      this.loc = data.query.results.channel.location;
      this.weather = data.query.results.channel.item.forecast[0].text;
    });
  }

  getData () {
    return this.http.get(this.url)
      .map((response: Response) => response.json());
  }
}
