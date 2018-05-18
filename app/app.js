import { Observable, interval } from 'rxjs';

// Subscription
// http://reactivex.io/rxjs/manual/overview.html#subscription

// Subscription has an unsubscribe method, that just disposes the resource (as seen before)
// But __important__ Subscriptions can also be put together
const obs1 = interval(400);
const obs2 = interval(300);
const sub = obs1.subscribe(() => console.log('x'));
const childSub = obs2.subscribe(() => console.log('y'));
const anotherChildSub = obs1.subscribe(() => console.log('z'));
const yetAnotherSub = obs2.subscribe(() => console.log('O'));

sub.add(childSub);
childSub.add(anotherChildSub);
sub.add(yetAnotherSub);

setTimeout(() => {
  // example of remove: "yetAnotherSub" it will not be unsubscribe
  sub.remove(yetAnotherSub); // comment this to unsubscribe "yetAnotherSub"
  sub.unsubscribe(); // unsubscribe from all 3 subscriptions
}, 1000);
