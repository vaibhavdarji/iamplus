import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';

import { Router, RouterOutlet } from "@angular/router";

import { RouterTestingModule } from '@angular/router/testing';

import { SnakeComponent } from './snake/snake.component';
import { ImageComponent } from './image/image.component';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
          RouterTestingModule.withRoutes([
              {
                  path: 'snake',
                  component: SnakeComponent
              }, {
                  path: 'image',
                  component: ImageComponent
              }
          ])
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'I am Plus'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('I am Plus');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('I am Plus');
  }));
});
