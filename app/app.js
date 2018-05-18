import { Observable } from 'rxjs';

// Observer
// http://reactivex.io/rxjs/manual/overview.html#observer

// Observers are simply a set of callbacks: next, error, and complete
const observerCallbacks = {
  next: x => console.log('Observer got next value', x),
  error: err => console.log('Observer got __error__', err),
  complete: () => console.log('Oberserver got a __complete__ notification'),
};

// Observers also be partial
const partialObserver = {
  next: x => console.log('Observer without complete got next value', x),
  error: err => console.log('Observerwithout  got error', err),
};

// Or just provide callback
const observerCallBack = (x) => {
  console.log('Observer callback got next value', x);
};

//
const observable = Observable.create((observer) => {
  const id = setInterval(
    () => {
      observer.next('x');
    },
    250,
  );

  return () => {
    clearInterval(id);
  };
});

//
const subCallbacks = observable.subscribe(observerCallbacks);
const subPartial = observable.subscribe(partialObserver);
const subCallback = observable.subscribe(observerCallBack);

setTimeout(() => {
  subCallbacks.unsubscribe();
  subPartial.unsubscribe();
  subCallback.unsubscribe();
}, 1100);

//
const observableComplete = Observable.create((observer) => {
  const id = setInterval(
    () => {
      observer.next('y');
    },
    250,
  );

  setTimeout(() => {
    clearInterval(id);
    observer.complete();
  }, 1000);
});

setTimeout(
  () => {
    console.log('----complete-----');
    observableComplete.subscribe(observerCallbacks);
    observableComplete.subscribe(partialObserver);
    observableComplete.subscribe(observerCallBack);
  },
  1600,
);

//
const observableError = Observable.create((observer) => {
  try {
    setInerval(
      () => {
        observer.next('z');
      },
      250,
    );
  } catch (e) {
    observer.error(e);
  }
});

setTimeout(
  () => {
    console.log('----error-----');

    // log error
    observableError.subscribe(observerCallbacks);

    // log error
    setTimeout(() => {
      observableError.subscribe(partialObserver);
    }, 500);

    // through error (no error callback provide)
    setTimeout(() => {
      observableError.subscribe(observerCallBack);
    }, 1000);
  },
  3100,
);

// observable.subscribe create an Observer object using the first callback argument as next.
// All three types of callbacks may be provided as arguments.
setTimeout(
  () => {
    console.log('__callbacks as argument__');
    const oCb = observerCallbacks;
    const sub = observable.subscribe(oCb.next, oCb.error, oCb.complete);
    observableComplete.subscribe(oCb.next, oCb.error, oCb.complete);
    observableError.subscribe(oCb.next, oCb.error, oCb.complete);
    // unsub
    setTimeout(() => sub.unsubscribe(), 1100);
  },
  4600,
);
