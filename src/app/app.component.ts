import { Component, OnInit } from '@angular/core';
import { AccordionInterface } from './accordion/accordionInterface';
import { MockedAPIService } from './services/mockedAPI.service';
import { LoaderService } from './services/loader.service';
import { Observable, Subject, map } from 'rxjs';
import { increment, decrement, reset } from './store/counter.actions';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'reusable-component';
  accordionList: AccordionInterface[] = [];
  loading$: Subject<boolean> = this.loader.isLoading$; //flag to show or hide loader
  showButton: boolean = true; //flag to show or hide loading button
  count$: Observable<number>; //counter for NgRx actions
  constructor(
    private mockedData: MockedAPIService,
    private loader: LoaderService,
    private store: Store<{ count: number }>
  ) {
    this.count$ = store.select('count');
  }

  ngOnInit() {}

  //This function retrieves and modifies accordion data
  loadData() {
    this.mockedData
      .getData()
      .pipe(
        map((data) => {
          const transformedData = data.map((item: AccordionInterface) => {
            return {
              ...item,
              title: item.title.toUpperCase(),
              description: item.description.toLowerCase(),
            };
          });

          return transformedData;
        })
      )
      .subscribe((transformedData: AccordionInterface[]) => {
        this.accordionList = transformedData;
      });

    this.showButton = false;
  }

  removeData() {
    this.accordionList = [];
    this.showButton = true;
  }

  showAllData() {
    console.log('all data', this.accordionList);
  }

  //NgRx actions
  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

  //Steps:
  // After creating our component, we specify the actions needed in this component(add,delete..)
  // We can use selectors to select just a section of the state we are interested in from the main state object
  // 1-Defined actions to express events.
  // 2-Defined a reducer function to manage the state of the counter.
  // 3-Registered the global state container that is available throughout your application.
  // 4-Injected the Store service to dispatch actions and select the current state of the counter.

  // store.dispatch:
  //  It returns the Store object itself, which is an Observable,
  //  so that components can hook into the select() method
  //  in order to monitor changes of the state when the Store composes a new state object.
}
