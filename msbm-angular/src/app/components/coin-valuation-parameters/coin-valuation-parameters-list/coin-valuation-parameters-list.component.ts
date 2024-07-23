import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { CoinValuationParametersService } from '../coin-valuation-parameters.service';
import { ValuationParameter } from '../valuation-parameters.model';

@Component({
  selector: 'app-coin-valuation-parameters-list',
  templateUrl: './coin-valuation-parameters-list.component.html',
  styleUrls: ['./coin-valuation-parameters-list.component.css'],
})
export class CoinValuationParametersListComponent implements OnInit {
  isLoading: boolean;
  valuationParameters: ValuationParameter[];
  displayedColumns = ['action', 'id', 'description', 'weight'];

  constructor(
    private serviceValuationParameters: CoinValuationParametersService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchValuationParameters();
  }

  fetchValuationParameters(): void {
    this.isLoading = true;

    this.serviceValuationParameters
      .fetch()
      .pipe(
        tap((valuationParameters) => {
          this.valuationParameters = valuationParameters;
        }),
        tap(() => (this.isLoading = false))
      )
      .subscribe();
  }

  delete(parameter: ValuationParameter): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Do you confirm delete this parameter?',
    });

    dialogRef
      .afterClosed()
      .pipe(tap((result) => this.removeParameter(result, parameter)))
      .subscribe();
  }

  removeParameter(result, parameter): void {
    if (result) {
      this.serviceValuationParameters
        .delete(parameter)
        .pipe(
          tap(() =>
            this.serviceValuationParameters.showMessage(
              'Valuation Parameter deleted successfully!'
            )
          ),
          tap(() => this.fetchValuationParameters())
        )
        .subscribe();
    }
  }
}
