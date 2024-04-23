import { AsyncPipe, CommonModule } from '@angular/common';
import {  Component, Injector, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { map, shareReplay, takeWhile, tap, timer } from 'rxjs';
//TODO estile not found
@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './page-not-found.component.html',
})
export class PageNotFoundComponent implements OnInit {
  private routeInjector = inject(Router);

  countDown$ = timer(0, 1000).pipe(
    map((value) => 10 - value),
    takeWhile((value) => value >= 0),
    shareReplay(1),
  );

  redirectHome$ = this.countDown$.pipe(
    tap((value) => {
      if (value <= 0) {
        this.routeInjector.navigate(['']);
      }
    }),
    takeUntilDestroyed(),
  );

  ngOnInit(): void {
    this.redirectHome$.subscribe();
  }
}
