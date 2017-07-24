/**
 * Used to query for variants.
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { FilterableSearchService } from './filterable-search.service.interface';
import { Gene, Variant } from './genomic-data';
import { CIViCSearchService } from './civic-search.service';
import { VariantDataProvider } from './database-services.interface';

@Injectable()
export class VariantSearchService implements FilterableSearchService {

  constructor(private civicSearchService: CIViCSearchService) {}

  variantDataProviders: VariantDataProvider[] = [this.civicSearchService];

  // Provided by the gene search filterable dropdown on selection.
  geneContext: Gene;
  onGeneChosen(gene: Gene) {
    this.geneContext = gene;
  }

  public search = (term: string): Observable<Variant[]> => {
    // map them into a array of observables and forkJoin
    return Observable.forkJoin(this.variantDataProviders
      .map(
        searchService => searchService.provideVariants(term, this.geneContext)
      )
    ).map((variantArrays: Variant[][]) => {
        // TODO: Prevent gene overlap, as in CADD submits a gene which CIViC already had.  They should be merged.
        const massiveVariantArray: Variant[] = [];

        for (const geneArray of variantArrays) {
          for (const gene of geneArray) {
            massiveVariantArray.push(gene);
          }
        }

        return massiveVariantArray;
      }
    );
  }

}
