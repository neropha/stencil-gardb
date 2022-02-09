import { BehaviorSubject, Observable, Subject } from "rxjs";
/**
 * @description Provides Methods for Message component
 *
 * @class MessageService
 */
export class MessageService {
  private static _instance: MessageService;
  private messages: string[] = [];
  private subject: Subject<string[]> = new Subject();
  private debug: boolean;
  public debugMode: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
    this.debugMode.subscribe(debug => {
      this.debug = debug;
    });
  }

  add(message: string, error?: boolean): void {
    if (this.debug || error) {
      this.messages.push(message);
      this.subject.next(this.messages);
    }
  }

  clear(): void {
    this.messages = [];
    this.subject.next(this.messages);
  }

  getMessages(): Observable<string[]> {
    return this.subject.asObservable();
  }

  /**
   * @description little helper to enable logging in live environment
   * it's not really a secret!
   *
   * @param {string} person
   * @param {string} year
   * @param {string} keyword
   * @memberof MessageService
   */
  checkDebug(person: string, keyword: string): void {
    if (person == "debug" && keyword == "true") {
      this.debugMode.next(true);
      this.add("Debug mode enabled");
    } else if (person == "debug" && keyword == "false") {
      this.add("Debug mode disabled");
      this.debugMode.next(false);
    }
  }

  public static get Instance(): MessageService {
    // Do you need arguments? Make it a regular method instead.
    return this._instance || (this._instance = new this());
  }
}
