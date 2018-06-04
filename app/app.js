import { Subject, interval } from 'rxjs';
import { multicast } from 'rxjs/operators';

// Subject - Multicasted Observables
const src = interval(500);
const subj = new Subject();
const multicasted = src.pipe(multicast(subj));
let sub2;

const sub1 = multicasted.subscribe(next => console.log(`sub1: next: ${next}`));
const subConnect = multicasted.connect();

setTimeout(() => {
  sub2 = multicasted.subscribe(next => console.log(`sub2: next: ${next}`));
}, 600);

setTimeout(() => sub1.unsubscribe(), 1200);
setTimeout(() => {
  sub2.unsubscribe();
  subConnect.unsubscribe();
}, 2000);
