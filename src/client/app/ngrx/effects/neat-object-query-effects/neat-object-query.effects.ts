import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of, concat } from 'rxjs';
import { Injectable } from '@angular/core';

import { NeatObjectQueryService } from '../../../core/services/neat-data/neat-object-query.service';
import {
  NeatObjectQueryActions,
  NeatObjectQueryFetchResults,
  NeatObjectQuerySetResults,
  ENeatObjectQueryActionTypes,
  NeatObjectQuerySetResultLabels,
  NeatObjectQuerySetStatus
} from '../../actions/neat-object-query.actions';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NeatObjectQueryEffects {
  constructor(
    private actions$: Actions<NeatObjectQueryFetchResults>,
    private neatObjectQueryer: NeatObjectQueryService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  @Effect()
  fetchNeatObjectQueryResults$: Observable<NeatObjectQueryActions> = this.actions$.pipe(
    ofType(ENeatObjectQueryActionTypes.NeatObjectQueryFetchResults),

    // switchMap will flatten nested observable and cancel all but the most recently received observable
    switchMap(action => {
      const { objectName, isRefreshed } = action.payload;

      return this.neatObjectQueryer.queryNeatObject(objectName, isRefreshed).pipe(
        switchMap(neatQueryObject => {
          // Handle error
          if (neatQueryObject.status === 'error') {
            setTimeout(() => this.router.navigate([''], {}), 50);
            this.snackBar.open(
              `Error occurred for ${objectName}. This may be because you're searching for a comet that has an asteroidal
            designation. We're working to fix that!`,
              'Close',
              {
                duration: 15000
              }
            );
            return concat(
              of(
                new NeatObjectQuerySetStatus({
                  objid: action.payload.objectName,
                  code: 'notfound'
                })
              )
            );
          }

          // Continue without errors
          const neatObjectQueryResults = neatQueryObject.results;

          // Combine ra and dec
          neatObjectQueryResults.forEach((el, ind) => {
            neatObjectQueryResults[ind] = { ...el, raDec: el.ra + ' / ' + el.dec };
          });

          const isObjectFound = !!neatObjectQueryResults.length;

          // After results received we trigger change of route
          if (!!isObjectFound) {
            // setTimeout(
            //   () =>
            //     this.router.navigate(['neat'], {
            //       queryParams: { objid: action.payload.objectName }
            //     }),
            //   50
            // );
          } else {
            setTimeout(() => this.router.navigate([''], {}), 50);
            this.snackBar.open(`Search did not yield data for ${objectName}`, 'Close', {
              duration: 5000
            });
          }

          // Return multiple actions in specific order using concat operator
          return concat(
            of(new NeatObjectQuerySetResults({ neatObjectQueryResults })),
            of(
              new NeatObjectQuerySetStatus({
                objid: action.payload.objectName,
                code: isObjectFound ? 'found' : 'notfound'
              })
            )
          );
        })
      );
    })
  );

  @Effect()
  fetchNeatObjectQueryResultLabels$: Observable<NeatObjectQueryActions> = this.actions$.pipe(
    ofType(
      ENeatObjectQueryActionTypes.NeatObjectQueryFetchResultLabels,
      ENeatObjectQueryActionTypes.NeatObjectQueryFetchResults
    ),
    switchMap(action => {
      return this.neatObjectQueryer.getNeatResultLabels().pipe(
        map(neatObjectQueryResultLabels => {
          // Combine ra and dec into single entry
          neatObjectQueryResultLabels.raDec = {
            label: 'RA/Dec',
            description:
              neatObjectQueryResultLabels.ra.description +
              ' / ' +
              neatObjectQueryResultLabels.dec.description,
            fractionSize: neatObjectQueryResultLabels.ra.fractionSize
          };

          return new NeatObjectQuerySetResultLabels({ neatObjectQueryResultLabels });
        })
      );
    })
  );
}
