import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user/user.service';
import { User } from '../../core/model/User_model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userInfo: User | null = null;
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userInfo = this.userService.getUser();
    console.log(this.userInfo);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
