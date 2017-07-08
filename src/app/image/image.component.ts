import { Component, OnInit } from '@angular/core';
import { ImageService } from '../service/image.service';


@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
    queryInput: HTMLElement;
    image: string;
    queryParameter: string;
    messages: any[] = new Array();
    MESSAGE_CONTAINER: HTMLElement;
    isSearching: boolean = false;
    sendBtn: HTMLElement;
    window: any = window;
    constructor(private _http: ImageService) { }

    ngOnInit() {
        this.queryInput = <HTMLElement>document.querySelector('#query_input');
        this.MESSAGE_CONTAINER = <HTMLElement>document.querySelector('.messages');
        this.sendBtn = <HTMLElement>document.querySelector('.send_message')
    }

    addImage (data: any) {
        let date = new Date();
        if (!data || data.length == 0) {
            this.messages.push({
                user: 'pixabay',
                message: 'No image found! Please try again',
                direction: 'right',
                time: this.getTime()
            });
        } else {
            let index = 0; //Math.floor(Math.random() * (3));
            this.messages.push({
                url: data[index]['previewURL'],
                user: 'pixabay',
                direction: 'right',
                time: this.getTime()
            });
        }
    }

    getTime() {
        let date = new Date();
        return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
    }

    searchImage (query: string) {
        this.isSearching = true;
        return this._http.getImage(query).subscribe(data => this.addImage(data.hits), error => console.log('error', error));
    }

    onSubmit () {
        if (this.queryParameter.trim() === '') return;
        this.messages.push({
            user: 'ME',
            message: this.queryParameter,
            direction: 'left',
            time: this.getTime()
        });
        this.searchImage(this.queryParameter);
        this.queryParameter = '';

    }

    scrollDown () {
        this.MESSAGE_CONTAINER.scrollTop = this.MESSAGE_CONTAINER.scrollHeight;
        this.isSearching = false;
    }

    audioSearch () {

        if('webkitSpeechRecognition' in this.window){
            let speechRecognizer = new this.window.webkitSpeechRecognition();
            speechRecognizer.continuous = true;
            speechRecognizer.interimResults = true;
            speechRecognizer.lang = 'en-IN';
            speechRecognizer.start();

            let finalTranscripts = '';
            speechRecognizer.onresult = (event) => {
                let interimTranscripts = '';


                for (let result of event.results) {
                    let transcript = result[0].transcript;
                    transcript.replace("\n", "<br>");
                    if (result.isFinal) {
                        finalTranscripts += transcript;
                    } else {
                        interimTranscripts += transcript;
                    }
                }


                if (finalTranscripts) {
                    this.queryParameter = finalTranscripts;

                    this.sendBtn.dispatchEvent(new Event('click'))
                }
            };

            speechRecognizer.onerror = function (event) {
                console.log('error in fetching');
            };
        }
    }

}
