import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RecipeService } from '../recipes/recipes.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isDropdownOpen = false;
  userSub: Subscription;
  isAuthenticated = false;

  // @Output() featureSelected = new EventEmitter<string>();
  constructor(
    private router: Router,
    private DataStorageService: DataStorageService,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    })

  }
  // onSelect(feature: string){
  //   if (feature === 'recipe') { this.router.navigate([''], ) };
  //   if (feature === 'shopping-list') { this.router.navigate(['/shopping-list']) };
  //   //  this.featureSelected.emit(feature);
  // }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onSave() {
    this.DataStorageService.storeRecipes();
  }
  onFetch() {
    this.DataStorageService.fetchRecipes().subscribe();
  }
  onLogOut(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
