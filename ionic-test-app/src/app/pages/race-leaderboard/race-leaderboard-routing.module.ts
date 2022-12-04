import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RaceLeaderboardPage } from './race-leaderboard.page';

const routes: Routes = [
  {
    path: '',
    component: RaceLeaderboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RaceLeaderboardPageRoutingModule {}
