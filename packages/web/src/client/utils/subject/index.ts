export type SubscriberFunc<T> = (value: T) => void;

export class Subject<T> {
  private listeners: SubscriberFunc<T>[] = [];
  public value: T | null = null;

  public next(value: T): void {
    this.value = value;

    this.listeners.forEach((listener) => listener(value));
  }

  public subscribe(func: SubscriberFunc<T>): void {
    this.listeners.push(func);

    if (this.value) {
      func(this.value);
    }
  }

  public unsubscribe(func: SubscriberFunc<T>): void {
    this.listeners = this.listeners.filter((listener) => listener === func);
  }
}
