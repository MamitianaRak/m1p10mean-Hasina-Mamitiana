import { Component, OnInit } from '@angular/core';
import { StatService } from 'src/app/services/stat/stat.service';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss'],
})
export class StatistiqueComponent implements OnInit {

  stat : any  = {} ;
  loading: boolean = true;

  constructor(private statservice: StatService) {}
  ngOnInit(){
     this.getstat();
  }

  getstat() {
    const obs = this.statservice.getStat().subscribe({
      next: (data) => {
        this.stat = data;
        this.createChartA();
        this.createChartB();
        this.loading = false;
      },
      error: (err) => {},
    });
  }

  createChartA(){
    this.statservice.createAreaChart("myAreaChart",Object.keys(this.stat.statchi),Object.values(this.stat.statchi),this.statservice.number_format);
  }

  createChartB(){
    this.statservice.createAreaChart("myAreaChart1",Object.keys(this.stat.statbenefice),Object.values(this.stat.statbenefice),this.statservice.number_format);
  }

  formatSecond(seconds:number) {
    if(seconds != null ){
            //months
            let months = Math.floor(seconds/(24*3600*30));
            seconds -= months*24*3600*30;
                //days 
            let days = Math.floor(seconds/(24*3600)); 
            seconds -= days*24*3600; 
            
            //hours 
            let hours = Math.floor(seconds/3600); 
            seconds -= hours*3600; 
            
            //minutes 
            let minutes = Math.floor(seconds/60); 
            seconds -= minutes*60;
    return [
        months + " mois",
        days + " jours",
        hours + " heures",
        minutes + ' minutes',
        Math.round(seconds*100)/100 + ' secondes'
    ].join(", ");
  }
  else{
    return '...';
  }
};


formatSecond2(seconds:number) {
  var minute = 60 * 1000,
      hour = minute *60 ,
      day = hour * 24,
      month = day * 30,
      ms = seconds * 1000,
      months = parseInt((ms / month).toString(), 10);    

  ms = ms - months * month;    
  var days = parseInt((ms / day).toString(), 10); 
  ms -= days * day;
  var hours = parseInt((ms / hour).toString(), 10);   
  ms -= hours * hour;

  var minutes = parseInt((ms / minute).toString(), 10);   
  ms -= minutes* minute;

  var seconds = parseInt((ms / 1000).toString(), 10);   
  ms -= seconds* 1000;

  return [
      months + " months",
      days + " days",
      hours + " hours",
      minutes + " minutes",
      seconds + " seconds"
  ].join(", ");
};
  
}
