import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'projectCourse3';

  // loadedFeature = 'recipe';
  // onNavigate(feature: string){
  //   this.loadedFeature = feature;
  // }
  constructor(private AuthService: AuthService) {}

  ngOnInit() {
    this.AuthService.autoLogin();
  }
}
