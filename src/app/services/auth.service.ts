import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { LoginResponse, StoreUser } from '../models/store.models';
import { StoreApiService } from './store-api.service';

interface Session {
  token: string;
  username: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly storeApi = inject(StoreApiService);
  private readonly storageKey = 'novo-shop-session';
  private readonly baseUrl = 'https://fakestoreapi.com';
  private readonly session = signal<Session | null>(this.loadSession());

  readonly currentUsername = this.session.asReadonly();

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/auth/login`, { username, password })
      .pipe(
        tap((response) => {
          const session = { token: response.token, username };
          localStorage.setItem(this.storageKey, JSON.stringify(session));
          this.session.set(session);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.session.set(null);
  }

  isLoggedIn(): boolean {
    return Boolean(this.session()?.token);
  }

  getLoggedUser(): Observable<StoreUser | undefined> {
    const username = this.session()?.username;
    return this.storeApi.getUsers().pipe(map((users) => users.find((user) => user.username === username)));
  }

  private loadSession(): Session | null {
    const rawSession = localStorage.getItem(this.storageKey);

    if (!rawSession) {
      return null;
    }

    try {
      return JSON.parse(rawSession) as Session;
    } catch {
      localStorage.removeItem(this.storageKey);
      return null;
    }
  }
}
