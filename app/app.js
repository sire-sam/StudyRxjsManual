import { Observable, Subject, from } from 'rxjs';
import { multicast } from 'rxjs/operators';

// Subject
// http://reactivex.io/rxjs/manual/overview.html#subject
const subj = new Subject();

// Every Subject is an Observable
//
subj.subscribe(x => console.log('a', x));
subj.subscribe({ next: x => console.log('b', x) });

// Every Subject is an Observer
//
subj.next(1);
subj.next(2);

// Subject is an Observer so you may provide a Subject as observer of another Observable
const obs = from([3, 4, 5]);

obs.subscribe(subj);

// Note:
// Subjects are the only way of making any Observable execution be shared to multiple Observers

// Multicasted Observables intro
//
// multicasted Observable uses a Subject to make Observers see the same Observable execution
// under the hood
const src = from([1, 2, 3]);
const subjMulticast = new Subject();
const multicasted = src.pipe(multicast(subjMulticast));

multicasted.subscribe(x => console.log('multiCasted A', x));
multicasted.subscribe(y => console.log('multiCasted B', y));

// same result as `obs.subscribe(subj)` in previous example
multicasted.connect();

