import { Component } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'counter',
    templateUrl: './counter.component.html'
})
export class CounterComponent {
    public currentCount = 0;

    public incrementCounter() {
        this.currentCount++;
    }
}
