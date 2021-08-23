import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}
  @Output() featureSelected = new EventEmitter<string>();

  onSelect(feature) {
    this.featureSelected.emit(feature);
  }
  onSaveData() {
    this.dataStorageService.storeRecipes();
  }
  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }
  ngOnDestroy() {
    this.authService.user.unsubscribe();
  }
}
