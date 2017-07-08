import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
    @Input('message') message: string;
    @Input('user') user: string;
    @Input('direction') direction: string;
    @Input('url') url: string;
    @Input('time') time: string;
    @Output() imageLoaded: EventEmitter<any> = new EventEmitter();
    constructor() { }

    ngOnInit() {
        if (this.message && !this.url) {
            setTimeout(() => this.imageLoaded.emit(), 500);
        }
    }

    onImageLoad (event) {
        if (event.target.complete && event.target.height && event.target.width) {
            this.imageLoaded.emit();
        }
    }

}
