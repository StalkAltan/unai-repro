import { Component } from '@angular/core';

@Component({
  selector: 'unai-repro-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app1';

  constructor() {
    console.log("non breaking change");
  }
}
