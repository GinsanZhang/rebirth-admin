import { Component, EventEmitter, Input, OnInit, Renderer2 } from '@angular/core';
import { MenuBarService } from './menu-bar.service';
import { WindowRef } from 'rebirth-ng';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
  host: {
    '[class]': `getClassNames()`,
  },
  exportAs: 'menuBar'
})
export class MenuBarComponent implements OnInit {
  static MAX_MIDDLE_SCREEN = 768;
  static MIN_MIDDLE_SCREEN = 576;
  @Input() configs;
  @Input() isTextMenuBarOpen: boolean;

  isIconMenuBarOpen = false;
  positionChange = new EventEmitter<any>();

  constructor(private menuBarService: MenuBarService, private windowRef: WindowRef, private renderer: Renderer2) {
  }

  getClassNames() {
    let classNames = '';
    classNames += this.isTextMenuBarOpen ? 'open-text-menu' : 'hide-text-menu';
    classNames += ' ';
    classNames += this.isIconMenuBarOpen ? 'open-icon-menu' : 'hide-icon-menu';
    return classNames;
  }

  updateMenuBarStatus() {
    this.isTextMenuBarOpen = this.windowRef.innerWidth >= MenuBarComponent.MAX_MIDDLE_SCREEN;
    this.isIconMenuBarOpen = this.windowRef.innerWidth >= MenuBarComponent.MIN_MIDDLE_SCREEN;
  }

  ngOnInit(): void {
    this.menuBarService.initPath();
    this.updateMenuBarStatus();
    this.positionChange
      .debounceTime(200)
      .distinctUntilChanged()
      .subscribe(() => this.updateMenuBarStatus());
    this.renderer.listen('window', 'resize', ($event) => this.positionChange.emit($event));
  }

  shouldRenderCell(userRole): boolean {
    return this.menuBarService.hasPrivilege(userRole);
  }

  onToggleChildren(path): void {
    this.menuBarService.path = path;
  }

  shouldShowElement(path): boolean {
    return this.menuBarService.isStartWithCurrentPath(path);
  }

  toggle() {
    this.isTextMenuBarOpen = !this.isTextMenuBarOpen;
    if (this.windowRef.innerWidth >= MenuBarComponent.MIN_MIDDLE_SCREEN) {
      this.isIconMenuBarOpen = true;
    } else {
      this.isIconMenuBarOpen = this.isTextMenuBarOpen;
    }
  }

}
