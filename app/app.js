import { Observable } from 'rxjs';

// Observable
// http://reactivex.io/rxjs/manual/overview.html#observable

// Intro Example
//
const observable = Observable.create((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  setTimeout(() => {
    observer.next(4);
    observer.complete();
  }, 1000);
});


console.log('just before subscribe');
observable.subscribe({
  next: x => console.log('next value', x),
  error: err => console.log('error', err),
  complete: () => console.log('done'),
});

// Observables as generalizations of functionsObservables as generalizations of functions
// http://reactivex.io/rxjs/manual/overview.html#observables-as-generalizations-of-functions

// Observable subscription are like function call
// they are not like events, one subscrive trigger a "call"
const observable2 = Observable.create((observer) => {
  console.log('hello');
  observer.next(42);
});


observable2.subscribe(x => console.log(x));
observable2.subscribe(y => console.log(y));

// -> Observable are not asynchronous by default,
// they are synchronous just like function
// proved by following whre subscribe 'call' is logged between "before" and "after" log
// if it was asynchrnous logs from observer and subscriber would be displayed after "after" log
console.log('Before');
observable2.subscribe(x => console.log(x));
console.log('After');

// Observable can return multiple value something a function can't do (only one return statement)
// but still "synchronously"
const multipleOutput = Observable.create((observer) => {
  console.log('Hello');
  observer.next(42);
  observer.next(100);
  observer.next(200);
  observer.complete();
});
console.log('before multipleOutput');
multipleOutput.subscribe(output => console.log('multiple output', output));
console.log('after multipleOutput');

// -> but they can "push" values asynchronously
const multiAsync = Observable.create((observer) => {
  console.log('Hello, one will be async');
  observer.next(42);
  observer.next(100);
  observer.next(200);
  setTimeout(()=> observer.next(300),1000)
  observer.next(400);
})
console.log('before multiAsync');
multiAsync.subscribe(output => console.log('multiAsync output', output));
console.log('after multiAsync');

/*
Conclusion:

func.call() means "give me one value synchronously"
observable.subscribe() means "give me any amount of values, either synchronously or asynchronously"

 */
