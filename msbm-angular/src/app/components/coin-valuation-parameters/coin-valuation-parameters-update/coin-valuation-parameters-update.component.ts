import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { CoinValuationParametersService } from '../coin-valuation-parameters.service';
import { ValuationParameter } from '../valuation-parameters.model';

@Component({
  selector: 'app-coin-valuation-parameters-update',
  templateUrl: './coin-valuation-parameters-update.component.html',
  styleUrls: ['./coin-valuation-parameters-update.component.css'],
})
export class CoinValuationParametersUpdateComponent implements OnInit {
  valuationParameter: ValuationParameter = {
    description: '',
    weight: null,
  };

  constructor(
    private serviceValuationParameter: CoinValuationParametersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.serviceValuationParameter
      .fetchById(id)
      .pipe(tap((parameter) => (this.valuationParameter = parameter)))
      .subscribe();
  }

  updateValuationParameter(): void {
    this.serviceValuationParameter
      .update(this.valuationParameter)
      .pipe(
        tap(() =>
          this.serviceValuationParameter.showMessage(
            'Valuation Parameter updated successfully!'
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
