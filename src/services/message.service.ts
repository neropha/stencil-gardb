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
  public debugMode: BehaviorSubject<boolean> = new BehaviorSubject(false);

  add(message: string, error?: boolean): void {
    this.debugMode.subscribe(debug => {
      if (debug || error) {
        this.messages.push(message);
        this.subject.next(this.messages);
      }
    });
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
   * TODO make sure to disable logging when debug is set to FALSE!
   * ! Logging happens even in debug mode!
   *
   * @param {string} person
   * @param {string} year
   * @param {string} keyword
   * @memberof MessageService
   */
  checkDebug(person: string, year: string, keyword: string): void {
    if (person == "debug" && year == "2000" && keyword == "true") {
      this.debugMode.next(true);
      this.add("Debug mode enabled");
    } else if (person == "Annika" && year == "1982" && keyword == "false") {
      this.add("Debug mode disabled");
      this.debugMode.next(false);
    }
  }

  public static get Instance(): MessageService {
    // Do you need arguments? Make it a regular method instead.
    return this._instance || (this._instance = new this());
  }
}
