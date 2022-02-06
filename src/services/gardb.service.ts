import { AsyncSubject, BehaviorSubject } from "rxjs";
import { Gardener } from "../utils/interfaces";
import { MessageService } from "./message.service";
import { ApiOptions } from "../utils/options";

export class GardbService {
  public gardener: BehaviorSubject<Gardener> = new BehaviorSubject(<Gardener>{});
  public garDB = new AsyncSubject<any[]>();
  public apiOptions = {};

  // private testStorage: GarDB = []; // Just for testing

  public messageService: MessageService;
  private static _instance: GardbService;

  public static get Instance(): GardbService {
    // Do you need arguments? Make it a regular method instead.
    return this._instance || (this._instance = new this());
  }

  constructor() {
    this.messageService = MessageService.Instance;
    this.apiOptions = ApiOptions;
  }

  // @todo //make it 200
  private handleResponse(response: any) {
    if (!response.ok) {
      throw `Error: ${response.status} (${response.statusText})`;
    }
    return response;
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  public loadData(api: string) {
    try {
      if (typeof api && api !== undefined) {
        throw `@Prop() "api" is empty!`;
      }
    } catch (error) {
      this.messageService.add(error, true);
    }
    this.messageService.add("Fetching gardeners from API => " + api);

    return fetch(api, this.apiOptions)
      .then(this.handleResponse)
      .then(response => {
        this.messageService.add("GardbService: Succeeded fetching gardeners from API");
        return response.json();
      })
      .then(data => {
        this.garDB.next(data);
        this.garDB.complete();
      })
      .catch(error => {
        if (error.message) this.messageService.add(error.message);
        else this.messageService.add(error);
        this.messageService.add("Fehler: Datenbank konnte nicht geladen werden.", true);
      });
  }

  public getGardener() {
    this.messageService.add("GardbService: Get selected gardener");
    return this.gardener.asObservable();
  }

  public getGardenerFromId(id: number) {
    console.log(id);
    return;
  }

  public setGardener(record: Gardener) {
    this.messageService.add(`GardbService: Gardener selected: ${record.Person}`);
    this.gardener.next(record);
  }
}
