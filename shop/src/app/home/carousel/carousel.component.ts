import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
    @Input() image: string;
    @Input() title: string;
    @Input() description: string;

    constructor() {
    }

    ngOnInit() {
    }
}