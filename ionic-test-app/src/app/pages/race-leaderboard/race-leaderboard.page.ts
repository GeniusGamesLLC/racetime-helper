import {Component, OnInit} from '@angular/core';
import {Entrant, Race} from "../../model/racetime";
import {std} from "mathjs";
import {NavParams} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";

const fiveMinutes:number = 1000 * 60 * 5;
const eightMinutes:number = 1000 * 60 * 8;
const oneHundredFiftyMinutes:number = 1000 * 60 * 150;
const oneHundredMinutes:number = 1000 * 60 * 100;

@Component({
  selector: 'app-race-leaderboard',
  templateUrl: './race-leaderboard.page.html',
  styleUrls: ['./race-leaderboard.page.scss'],
})
export class RaceLeaderboardPage implements OnInit {

  public race: Race | undefined;
  public lastUpdated: string | undefined;
  private websocket: WebSocket | undefined;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params=>{
      if(params['id']){
        this.setupWebSocket(params['id']);
      }
    });
  }

  ngOnInit() {
  }

  setupWebSocket(slug:string){
    this.websocket = new WebSocket(`wss://racetime.gg/ws/race/${slug}`);
    this.websocket.onmessage = (messsage)=>{
      console.log(messsage);
      if(messsage.data){
        console.log(JSON.parse(messsage.data));
        if(JSON.parse(messsage.data).type==="race.data"){
          this.race = JSON.parse(messsage.data).race;
          this.lastUpdated = new Date().toISOString();
        }
      }
    }
  }
  async loadRace(raceSlug:string){
    let res = await fetch(`https://cors-anywhere.herokuapp.com/https://racetime.gg/ootr/${raceSlug}/data`);
    this.race =  await res.json();
    this.lastUpdated = new Date().toISOString();
  }

  msToReadableString(duration:number){
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / 1000 / 60) % 60);
    const hours = Math.floor((duration  / 1000 / 3600 ) % 24)

    return [
      ("0" + hours.toString()).slice(-2),
      ("0" + minutes.toString()).slice(-2),
      ("0" + seconds.toString()).slice(-2),
    ].join(':');
  }

  /**
   * Math from https://docs.google.com/document/d/1IHrOGxFQpt3HpQ-9kQ6AVAARc04x6c96N1aHnHfHaKM/edit#
   * Leaderboard: https://www.zeldaspeedruns.com/ootr-standings
   */

  getRacePoints(tFinish: number, tAverage: number, tJet: number, tGamble: number){
    return Math.min(1500,Math.max(100,Math.floor((1 - ( (tFinish - tAverage - tJet - tGamble) / tAverage) ) * 1000)))
  }

  getTFinish(raceStartTime:string,entrantEndTime:string = new Date().toISOString()){
    return (new Date(entrantEndTime).getTime() - new Date(raceStartTime).getTime()) ;
  }
  /**
   * Will take the average of the top 7 times
   * @param top7Finish
   */
  getTAverage(top7Finish:number[]){
    return top7Finish.reduce((a, b) => a + b) / top7Finish.length;
  }


  getStandardDeviation(top7Finish:number[]){
    return <number>(<any>std(top7Finish));
    /*
    // Creating the mean with Array.reduce
    let mean = top7Finish.reduce((acc, curr)=>{
      return acc + curr
    }, 0) / top7Finish.length;

    // Assigning (value - mean) ^ 2 to every array item
    top7Finish = top7Finish.map((k)=>{
      return (k - mean) ** 2
    })

    // Calculating the sum of updated array
    let sum = top7Finish.reduce((acc, curr)=> acc + curr, 0);

    // Calculating the variance
    let variance = sum / top7Finish.length

    // Returning the standard deviation
    return Math.sqrt(sum / top7Finish.length)
    */
  }

  getRaceTimes(startTime:string, entrants:Entrant[]){
    let now = new Date().toISOString();
    return entrants.map(entrant=>this.getTFinish(startTime,entrant.finished_at || this.lastUpdated));
  }
  getTop7Finish(raceTimes:number[]){
    return raceTimes.sort((a,b) => b-a).reverse().slice(0,7);
  }

  getTJetHandicap(tAverage:number){
    return Math.min(1, Math.max(0, (oneHundredFiftyMinutes - tAverage) / (oneHundredFiftyMinutes - oneHundredMinutes))) * eightMinutes;
  }
  getTJet(tFinish: number, tAverage: number, tJH: number){
    return Math.min(eightMinutes, Math.max(0, ((tFinish - tAverage) / eightMinutes) * .35 ) * tJH);
  }

  getTGamble(tFinish: number, tAverage: number, tGH: number, sigmaFinish: number){
    return Math.min(fiveMinutes, Math.max(0, ( ((tFinish - tAverage) / tGH) * Math.max(0, (sigmaFinish / 3.5) - 1 ) * .3 ) ) * tGH );
  }

  getSigmaFinish(tGH:number, tAverage:number){
    return (tGH / tAverage ) * 100;
  }

  getTGambleHandicap = this.getStandardDeviation

}
