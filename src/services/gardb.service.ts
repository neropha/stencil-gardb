import { BehaviorSubject, AsyncSubject } from 'rxjs';
import { Gardener } from "../utils/interfaces";
import { MessageService } from "./message.service";

export class GardbService {
  public api: string;
  public selectedRecord: Gardener = null;
  public gardeners: BehaviorSubject<any>;
  public subbo = new AsyncSubject<any[]>();

  // private testStorage: GarDB = []; // Just for testing

  public messageService: MessageService;
  private static _instance: GardbService;

  public static get Instance(): GardbService {
    // Do you need arguments? Make it a regular method instead.
    return this._instance || (this._instance = new this());
  }

  constructor() {
    this.messageService = MessageService.Instance;
  }

  public apiOptions: {
    method: "GET";
    mode: "cors";
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // headers: {
    //   "Content-Type": "application/json; charset=utf-8"
    // },
    redirect: "follow";
    referrerPolicy: "no-referrer";
    // body: JSON.stringify(data) // body data type must match "Content-Type" header
  };

  public handleResponse(response: any) {
    if (!response.ok) {
      throw `Error: ${response.status} (${response.statusText})`;
    }
    return response;
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

  async loadData(api?: string) {
    if (typeof api == "undefined") {
      return;
    }
    this.messageService.add("GardbService: Fetching gardeners from API => " + api);
    let loadedData = await fetch(api, this.apiOptions)
      .then(this.handleResponse)
      .then(response => {
        this.messageService.add("GardbService: Succeeded fetching gardeners from API");
        this.api = api;
        return response.json();
      })
      .catch(error => {
        if (error.message) {
          this.messageService.add(error.message);
        } else {
          this.messageService.add(error);
        }
        this.messageService.add("Datenbank konnte nicht geladen werden.");
      });
      this.subbo.next(loadedData);
      this.subbo.complete();

  }

  public getSelectedRecord() {
    return this.selectedRecord;
  }

  public setSelectedRecord(record: Gardener) {
    console.log("set", record);
    this.selectedRecord = record;
  }
}
