import { fromEvent } from 'rxjs';
import { scan, throttleTime, map } from 'rxjs/operators';

// Introduction - first example
// http://reactivex.io/rxjs/manual/overview.html#first-examples
fromEvent(document.querySelector('button'), 'click')
  .pipe(
    throttleTime(1000),
    map(event => event.clientX),
    scan((count, clientX) => count + clientX, 0),
  )
  .subscribe(count => console.log(`clicked ${count} time`));
