import { BehaviorSubject, Observable, Subject } from "rxjs";

export class MessageService {
  private static _instance: MessageService;
  private messages: string[] = [];
  private subject: Subject<string[]> = new Subject();
  public debugMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  add(message: string, error?: boolean) {
    this.debugMode.subscribe(debug => {
      if (debug || error) {
        this.messages.push(message);
        this.subject.next(this.messages);
      }
    });

  }

  clear() {
    this.messages = [];
    this.subject.next(this.messages);
  }

  getMessages(): Observable<string[]> {
    return this.subject.asObservable();
  }

  public static get Instance(): MessageService {
    // Do you need arguments? Make it a regular method instead.
    return this._instance || (this._instance = new this());
  }
}
