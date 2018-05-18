import { Observable } from 'rxjs';

// Anatomy of an Observable
// http://reactivex.io/rxjs/manual/overview.html#anatomy-of-an-observable

// Subscribing to Observables
//
// create:argument is a "subscribe" function aka:
// Calling observable.subscribe with an Observer,
// the function "subscribe" in Observable.create() is run for that given Observe
// eslint-disable-next-line
const obs = Observable.create(function subscribe(observer) {
  setInterval(
    () => {
      console.log('interval execution');
      observer.next('hi');
    },
    1000,
  );
});
const intervalSubs = obs.subscribe(x => console.log(x));

// Executing Observables
//
// next*(error|complete)?
// zero to infinite Next notifications may be delivered.
// If either Error or Complete is delivered, then nothing else can be delivered afterwards.
const obs2 = Observable.create((observer) => {
  try {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
    observer.next(4); // not delivered
  } catch (e) {
    observer.error(e);
  }
});
obs2.subscribe(x => console.log(x));

// Disposing Observable Executions
//
// subscribe() return Subscription (the ongoing execution), call unsubscribe() cancel the execution

// __Important:__
// --------------
// Observable must define how to dispose resources of that execution
// exemple: even if we did unsubscribe for previously defined intervalSubs,
// interval still exists, see loging of "interval execution" in consol
setTimeout(() => intervalSubs.unsubscribe(), 4000);

//  return a custom unsubscribe function from within function subscribe() to cleanup.
const obs3 = Observable.create((observer) => {
  const id = setInterval(
    () => {
      console.log('interval too execution');
      observer.next('hi too');
    },
    1000,
  );

  return function unsubscribe() {
    clearInterval(id);
  };
});
const intervalTooSub = obs3.subscribe(x => console.log(x));
setTimeout(() => {
  intervalTooSub.unsubscribe();
  console.log('no more "interval too" logging');
}, 4000);

// __Note__
// This is pretty simple pattern
const straightSubscribe = function subscribe(observer) {
  const id = setInterval(() => {
    observer.next('hi straight');
  }, 1000);

  return function unsubscribe() {
    clearInterval(id);
  };
};
const straightUnsubscribe = straightSubscribe({ next: x => console.log(x) });
setTimeout(() => straightUnsubscribe(), 4000);

// The reason we use Rx types like Observable, Observer, and Subscription
// is to get safety (such as the Observable Contract) and composability with Operators.
