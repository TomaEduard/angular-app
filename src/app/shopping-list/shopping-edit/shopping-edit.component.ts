import { Igredient } from './../../shared/igredient.model';
import { Component, 
  OnInit, 
  ViewChild,
  ElementRef,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild ('nameInput', { static: false }) nameInputRef: ElementRef;
  @ViewChild ('amountInput', { static: false }) amountInputRef: ElementRef;
  @Output() IgredientAdded = new EventEmitter<Igredient>();

  constructor() { }

  ngOnInit() {
  }

  onAddItem() {
    const ingredientName = this.nameInputRef.nativeElement.value;
    const ingredientAmount = this.amountInputRef.nativeElement.value;
    const newIgredient = new Igredient(ingredientName, ingredientAmount);
    this.IgredientAdded.emit(newIgredient);
  }

}
