import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-snake',
    templateUrl: './snake.component.html',
    styleUrls: ['./snake.component.css']
})
export class SnakeComponent implements OnInit {

    TIME: number = 160;// Game level, by decreasing will speed up
    BLOCK_W: number = 45; // snake's one block width
    BLOCK_H: number = 30;// snake's one block height
    INC_SCORE: number = 50; //Score
    SNAKE_COLOR: string = "#e4e4e4"; //Snake color
    CTX; //Canvas attribute
    DIRECTIONS: any[] = new Array(); //temporary move(direct) store
    X_DIR: number[] = new Array(-1, 0, 1, 0); //x position adjustment
    Y_DIR: number[] = new Array(0, -1, 0, 1); // y position adjustment
    QUEUE: any[] = new Array();
    FROG: number = 1; // default food (eat to start)
    PATH_MAP: any[] = new Array();
    X_POS: number = ( 5 + (Math.random() * (this.BLOCK_W - 10)) | 0); //calculate position x
    Y_POS: number = ( 5 + (Math.random() * (this.BLOCK_H - 10)) | 0); //calculate position x
    DIRECTION: number = (Math.random() * 3 | 0);
    INTERVAL: number = 0; //time interval
    SCORE: number = 0;
    SUM: number = 0;
    EASY: number = 0;
    i: number;
    DIR;
    RESULT_CONTAINER: HTMLElement;
    CANVAS: HTMLCanvasElement;
    finish: boolean = false;
    constructor(private router: Router) {
        for (this.i = 0; this.i < this.BLOCK_W; this.i++) {
            this.PATH_MAP[this.i] = [];
        }
    }

    ngOnInit() {
        this.CANVAS = <HTMLCanvasElement>document.getElementById('snakeBox');
        this.CTX = this.CANVAS.getContext("2d");
        this.RESULT_CONTAINER = <HTMLElement>document.getElementById('result');
        this.bindEvents();
        this.start();
    }

    randomPlacement () {

        let x;
        let y;
        do {
            x = Math.random() * this.BLOCK_W | 0;
            y = Math.random() * this.BLOCK_H | 0;
        }
        while (this.PATH_MAP[x][y]);
        this.PATH_MAP[x][y] = 1;

        this.CTX.fillStyle = this.SNAKE_COLOR;
        this.CTX.strokeRect(x * 10 + 1, y * 10 + 1, 8, 8);

        this.INTERVAL = window.setInterval(() => this.setSpeed(), this.TIME);
    }

    start() {
        this.randomPlacement(); // Default somewhere placement
    }

    setSpeed () {
        if (this.EASY) {
            this.X_POS = (this.X_POS + this.BLOCK_W) % this.BLOCK_W;
            this.Y_POS = (this.Y_POS + this.BLOCK_H) % this.BLOCK_H;
        }

        --this.INC_SCORE;

        if (this.DIRECTIONS.length) {
            this.DIR = this.DIRECTIONS.pop();
            if ((this.DIR % 2) !== (this.DIRECTION % 2)) {
                this.DIRECTION = this.DIR;
            }
        }

        if ((this.EASY || (0 <= this.X_POS && 0 <= this.Y_POS && this.X_POS < this.BLOCK_W && this.Y_POS < this.BLOCK_H)) && 2 !== this.PATH_MAP[this.X_POS][this.Y_POS]) {
            if (1 === this.PATH_MAP[this.X_POS][this.Y_POS]) {
                this.SCORE += Math.max(5, this.INC_SCORE);
                this.INC_SCORE = 50;
                this.randomPlacement();
                this.FROG++;
            }
                //ctx.fillStyle("#ffffff");
                this.CTX.fillRect(this.X_POS * 10, this.Y_POS * 10, 9, 9);
                this.PATH_MAP[this.X_POS][this.Y_POS] = 2;
                this.QUEUE.unshift([this.X_POS, this.Y_POS]);
                this.X_POS += this.X_DIR[this.DIRECTION];
                this.Y_POS += this.Y_DIR[this.DIRECTION];
                if (this.FROG < this.QUEUE.length) {
                    this.DIR = this.QUEUE.pop();
                    this.PATH_MAP[this.DIR[0]][this.DIR[1]] = 0;
                    this.CTX.clearRect(this.DIR[0] * 10, this.DIR[1] * 10, 10, 10);
                }
            } else if (!this.DIRECTIONS.length) {
                this.announceResult();
            }
    }

    announceResult() {
        this.finish = true;
        window.clearInterval(this.INTERVAL);
    }

    restart () {
        this.router.navigateByUrl('/').then( () => this.router.navigateByUrl('/snake'));
    }


    bindEvents () {
        document.addEventListener('keydown', (evt) => {
            var code = evt.keyCode - 37;
            if (0 <= code && code < 4 && code !== this.DIRECTIONS[0]) {
                this.DIRECTIONS.unshift(code);
            } else if (-5 == code) {
                if (this.INTERVAL) {
                    window.clearInterval(this.INTERVAL);
                    this.INTERVAL = 0;
                } else {
                    this.INTERVAL = window.setInterval(() => this.setSpeed(), this.TIME);
                }
            } else {
                this.DIR = this.SUM + code;
                if (this.DIR == 44 || this.DIR == 94 || this.DIR == 126 || this.DIR == 171) {
                    this.SUM += code;
                } else if (this.DIR === 218) this.EASY = 1;
            }
        })
    }
}
