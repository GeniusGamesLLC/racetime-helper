import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RaceLeaderboardPage } from './race-leaderboard.page';

describe('RaceLeaderboardPage', () => {
  let component: RaceLeaderboardPage;
  let fixture: ComponentFixture<RaceLeaderboardPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceLeaderboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RaceLeaderboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
