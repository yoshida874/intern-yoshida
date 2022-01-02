import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanDeactivate, UrlTree } from '@angular/router';

export interface OnBeforeunload {
  loadWarning: boolean;
  shouldConfirmOnBeforeunload: () => boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ProblemGuard implements CanDeactivate<OnBeforeunload> {
  constructor(private router: Router) {}
  canDeactivate(component: OnBeforeunload): boolean | UrlTree {
    if (component.shouldConfirmOnBeforeunload()) {
      const msg =
        'このページを離れてもよろしいですか？' +
        '\n行った変更が保存されない可能性があります。';
      if (confirm(msg)) {
        component.loadWarning = false;
        return this.router.parseUrl('top');
      } else {
        return false;
      }
    }
    return true;
  }
}
