import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { CoinValuationParametersService } from '../coin-valuation-parameters.service';
import { ValuationParameter } from '../valuation-parameters.model';

@Component({
  selector: 'app-coin-valuation-parameters-create',
  templateUrl: './coin-valuation-parameters-create.component.html',
  styleUrls: ['./coin-valuation-parameters-create.component.css'],
})
export class CoinValuationParametersCreateComponent implements OnInit {
  valuationParameter: ValuationParameter = {
    description: '',
    weight: null,
  };

  constructor(
    private valuationParameterService: CoinValuationParametersService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  createValuationParameter(): void {
    this.valuationParameterService
      .create(this.valuationParameter)
      .pipe(
        tap(() =>
          this.valuationParameterService.showMessage(
            'Valuation Parameter saved successfully!'
          )
        ),
        tap(() => this.router.navigate(['/coin-valuation-parameters']))
      )
      .subscribe();
  }

  cancel(): void {
    this.router.navigate(['/coin-valuation-parameters']);
  }
}
