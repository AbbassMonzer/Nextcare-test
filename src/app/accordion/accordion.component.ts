import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccordionInterface } from './accordionInterface';
@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
})
export class AccordionComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<any>();
  @Input() accordionConfig: AccordionInterface[] = [];
  panelOpenState: boolean = false;
  cardView: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  emitData() {
    this.cardView = !this.cardView;
    this.newItemEvent.emit(true);
  }
}
