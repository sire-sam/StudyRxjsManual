import { ReplaySubject } from 'rxjs';

// Subject - Replay Subject

// buffer 100 values for new subscribers
// but an (optionnal) window time of 500ms
const subject = new ReplaySubject(100, 500);

const sub1 = subject.subscribe(next => console.log(`observer1 ${next}`));
let sub2;

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

setTimeout(() => subject.next(5), 200);
setTimeout(() => subject.next(6), 400);
setTimeout(() => subject.next(7), 600);
setTimeout(() => subject.next(8), 1000);

setTimeout(() => {
  sub2 = subject.subscribe(next => console.log(`observer2 ${next}`));
}, 800);

setTimeout(() => {
  sub1.unsubscribe();
  sub2.unsubscribe();
}, 1200);

