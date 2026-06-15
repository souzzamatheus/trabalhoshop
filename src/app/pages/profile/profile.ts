import { AsyncPipe, NgIf, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { StoreUser } from '../../models/store.models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [AsyncPipe, NgIf, RouterLink, TitleCasePipe],
  templateUrl: './profile.html',
})
export class Profile {
  private readonly auth = inject(AuthService);
  readonly user$: Observable<StoreUser | undefined> = this.auth.getLoggedUser();
}
