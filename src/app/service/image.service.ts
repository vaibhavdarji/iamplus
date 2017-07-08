import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

@Injectable()
export class ImageService {
    private query: string;
    private API_KEY: string = environment.PIXABAY_API_KEY;
    private API_URL: string = environment.PIXABAY_API_URL;
    private QUERY_URL: string = this.API_URL + this.API_KEY + '&q=';
    private PER_PAGE: string = '&per_page=3&orientation=horizontal';
    constructor(private _http: Http) { }

    getImage (query: string) {
        return this._http.get(this.QUERY_URL + query + this.PER_PAGE).map(response => response.json());
    }

}
