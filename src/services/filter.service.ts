import { MessageService } from "./message.service";
import { GardbService } from "./gardb.service";
import { Gardener } from "../utils/interfaces";
/**
 * @method get
 *
 * @export
 * @class FilterService
 */
export class FilterService {
  public messageService: MessageService;
  public gardbService: GardbService;
  private static _instance: FilterService;
  public garDBLoad: any;
  public garDBFiltered: any;

  public static get Instance(): FilterService {
    // Do you need arguments? Make it a regular method instead.
    return this._instance || (this._instance = new this());
  }
  constructor() {
    this.messageService = MessageService.Instance;
    this.gardbService = GardbService.Instance;

    this.gardbService.garDBLoad.subscribe(results => {
      this.garDBLoad = results;
      this.garDBFiltered = results;
      this.gardbService.garDBLoad;
    });
  }

  /**
   * @name filterByPerson
   * @description Searches in Person and Autor
   * @param {string} needle
   */
  private filterByPerson(needle = "", haystack): [] {
    needle = needle.toLowerCase();
    return haystack.filter((gardener: Gardener) => {
      let indexedFields = [gardener.Person, gardener.Autor].join().toLowerCase();
      return indexedFields.includes(needle);
    });
  }

  /**
   * @name filterByYear
   * @description Searches in year
   * @param {string} needle
   */
  private filterByYear(needle = "", haystack): [] {
    needle = needle.toLowerCase();
    return haystack.filter((gardener: Gardener) => {
      let indexedFields = [gardener.Jahr].join().toLowerCase();
      return indexedFields.includes(needle);
    });
  }

  /**
   * @name filterByKeyword
   * @description Searches in Inhalt | Dokumententyp | Zeitschrift |
   * @param {string} needle
   */
  private filterByKeyword(needle = "", haystack): [] {
    needle = needle.toLowerCase();
    return haystack.filter((gardener: Gardener) => {
      let indexedFields = [gardener.Inhalt, gardener.Dokumententyp, gardener.Zeitschrift].join().toLowerCase();
      return indexedFields.includes(needle);
    });
  }

  /**
   * @description Filters by starting letter
   * @param {needle} str
   *
   */
  public filterByInitial(needle: string) {
    let results = this.garDBLoad.filter((gardener: Gardener) => {
      var name = gardener.Person.toLowerCase();
      if (!name.startsWith(needle)) {
        return false;
      }
      return true;
    });
    this.messageService.add(`FilterService: Filtered by initial => ${needle}`);
    this.gardbService.garDBStore.next(results);
  }

  /**
   * @description Resets Variable Store and return initial State => All results
   */
  public getAllResults() {
    this.gardbService.garDBStore.next(this.garDBLoad);
    this.messageService.add(`FilterService: Reset filters`);
  }

  /**
   * @name filter
   * @description Filterset with chained filter functions for form inputs,
   * contains a method chain for executing filter based on current result set
   *
   * @param {string} [person]
   * @param {string} [year]
   * @param {string} [keyword]
   *
   * @memberof FilterService
   */

  public filter(person?: string, year?: string, keyword?: string) {
    var _self = this;
    this.messageService.checkDebug(person, year, keyword);

    var filterStack = {
      result: this.garDBLoad,
      personFilter: function (person: string) {
        this.result = _self.filterByPerson(person, this.result);
        return this;
      },
      yearFilter: function (year: string) {
        this.result = _self.filterByYear(year, this.result);
        return this;
      },
      keywordFilter: function (keyword: string) {
        this.result = _self.filterByKeyword(keyword, this.result);
        return this;
      },
    };
    filterStack.personFilter(person).yearFilter(year).keywordFilter(keyword);
    this.gardbService.garDBStore.next(filterStack.result);
    this.messageService.add(`FilterService: Filtered by year => ${person}, ${year}, ${keyword}`);
  }
}
