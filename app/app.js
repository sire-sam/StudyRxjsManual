import { BehaviorSubject } from 'rxjs';

// Subject - Behavior subject
const subject = new BehaviorSubject(0);

const sub1 = subject.subscribe(next => console.log(`observer1 ${next}`));

subject.next(1);
subject.next(2);

const sub2 = subject.subscribe(next => console.log(`observer2 ${next}`));

subject.next(3);

sub1.unsubscribe();
sub2.unsubscribe();
