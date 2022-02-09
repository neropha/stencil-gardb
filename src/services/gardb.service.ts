import { AsyncSubject, Subject} from "rxjs";
import { MessageService } from "./message.service";
import { ApiOptions } from "../utils/options";
import { Gardener } from "../utils/interfaces";

/**
 * Handles Gardeneners, Filter and Detail
 *
 * @class GardbService>
 */
export class GardbService {
  public garDBLoad = new AsyncSubject<any[]>(); // @see https://indepth.dev/reference/rxjs/subjects/async-subject
  public garDBStore = new Subject<any[]>();
  public apiOptions = {};

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
  private handleErrors(response: any) {
    if (!response.ok) {
      throw `Error: ${response.status} (${response.statusText})`;
    }
    return response;
  }

  /**
   * @description Filters by starting letter
   * @param {api} str
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch}
   *
   * @returns Promise
   */
  private loadFromApi(api: string): Promise<any> {
    this.messageService.add("Fetching gardeners from API => " + api);
    return fetch(api, this.apiOptions)
      .then(this.handleErrors)
      .then(response => {
        this.messageService.add("GardbService: Succeeded fetching gardeners from API");
        return response.json();
      })
      .then(data => {
        this.garDBStore.next(data);
        this.garDBLoad.next(data);
        this.garDBLoad.complete();
      })
      .catch(error => {
        if (error.message) this.messageService.add(error.message);
        else this.messageService.add(error);
        this.messageService.add("Fehler: Datenbank konnte nicht geladen werden.", true);
      });
  }

  getAllGardeners(api: string): Promise<any> {
    try {
      if (api != "" && api != undefined) return this.loadFromApi(api);
      else throw "property is required => api";
    } catch (error) {
      this.messageService.add(error, true);
    }
    return;
  }

  getGardenerById(id: number) {
    this.garDBLoad.subscribe(results => {
      results.filter((gardener: Gardener) => {
        if (id === gardener.ID) return;
      });
      return results.shift();
    });
  }
}
