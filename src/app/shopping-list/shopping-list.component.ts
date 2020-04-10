import { Component, 
  OnInit 
} from '@angular/core';
import { Igredient } from '../shared/igredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  igredients: Igredient[] = [
    new Igredient('Apples', 5),
    new Igredient('Tomatoes', 10),
  ];

  constructor() { }

  ngOnInit() {
  }

  onIgredientAdded(igredient: Igredient) {
    this.igredients.push(igredient);
  }
}
