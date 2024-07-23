import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coin-valuation-parameters-page',
  templateUrl: './coin-valuation-parameters-page.component.html',
  styleUrls: ['./coin-valuation-parameters-page.component.css'],
})
export class CoinValuationParametersPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToValuationParameterCreate() {
    this.router.navigate(['/coin-valuation-parameters/create']);
  }
}
