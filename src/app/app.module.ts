import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { SnakeComponent } from './snake/snake.component';
import { ImageComponent } from './image/image.component';

import { ImageService } from './service/image.service';

import { MessageComponent } from './message/message.component';


@NgModule({
  declarations: [
    AppComponent,
    SnakeComponent,
    ImageComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
        {
            path: 'snake',
            component: SnakeComponent
        },
        {
            path: 'image',
            component: ImageComponent
        }
    ])
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
