import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RaceLeaderboardPageRoutingModule } from './race-leaderboard-routing.module';

import { RaceLeaderboardPage } from './race-leaderboard.page';
import {PipeModule} from "../../pipes/pipe.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RaceLeaderboardPageRoutingModule,
    PipeModule
  ],
  declarations: [RaceLeaderboardPage]
})
export class RaceLeaderboardPageModule {}
