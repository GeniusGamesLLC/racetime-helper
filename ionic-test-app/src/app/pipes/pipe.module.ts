import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {HashPipe} from "./hash.pipe";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [
    HashPipe
  ],
  exports:[
    HashPipe
  ]
})
export class PipeModule {}
