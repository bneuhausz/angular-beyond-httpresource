import { Signal } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { debounceTime, distinctUntilChanged } from "rxjs";

export function debouncedAndDistinctSignal<T>(signal: Signal<T>) {
  return toSignal(toObservable(signal)
    .pipe(
      debounceTime(500),
      distinctUntilChanged()
    ), { initialValue: signal() }
  );
}