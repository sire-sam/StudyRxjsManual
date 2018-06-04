import { Subject, interval } from 'rxjs';
import { multicast, refCount } from 'rxjs/operators';

// Subject - Multicasted Observables - reference counting
const src = interval(500);
const subj = new Subject();
const refCounted = src.pipe(multicast(subj)).pipe(refCount());
let sub2;

console.log('observerA subscribe');
const sub1 = refCounted.subscribe(next => console.log(`observerA called ${next}`));

setTimeout(() => {
  console.log('observerB subscribe');
  sub2 = refCounted.subscribe(next => console.log(`oberserverB called ${next}`));
}, 600);

setTimeout(() => {
  console.log('observerA unsubscribe');
  sub1.unsubscribe();
}, 1200);

setTimeout(() => {
  console.log('observerB unsubscribe');
  sub2.unsubscribe();
}, 1800);
