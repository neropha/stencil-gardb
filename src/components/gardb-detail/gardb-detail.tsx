import { Component, Host, h, State, Element, Listen } from "@stencil/core";
import { GardbService } from "../../services/gardb.service";
import { MessageService } from "../../services/message.service";
import { Gardener } from "../../utils/interfaces";

@Component({
  tag: "gardb-detail",
  styleUrl: "gardb-detail.scss",
  shadow: false,
})
export class Detail {
  public gardbService: GardbService;
  public messageService: MessageService;
  @State() open: boolean = true;
  @Element() private element: HTMLElement;
  @State() gardener: Gardener;

  constructor() {
    this.gardbService = GardbService.Instance;
    this.messageService = MessageService.Instance;
  }

  getGardener() {
    return this.gardbService.gardener.subscribe(data => {
      this.gardener = this.cleanResult(data);
    });
  }

  cleanResult(gardener: Gardener) {
    let hideColumns = ["location", "reserve01", "reserve02", "sourcefile", "created", "updated"];
    let output: Gardener;
    for (const [key, value] of Object.entries(gardener)) {
      if (!hideColumns.includes(key)) {
        output = {...output, [key]: value};
      }
    }
    return output;
  }

  componentWillLoad() {
    this.getGardener();
    console.log(this.element, "will load")
  }

  componentShouldUpdate() {
    console.log(this.element, "should update")
  }

  componentDidUpdate() {
    console.log(this.element, "did update")
  }

  componentDidLoad() {
    this.element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    console.log(this.element, "Did load")
  }

  @Listen("gardenerSelected")
  handleGardenerSelected() {
    this.getGardener();
  }

  close() {
    this.open = !this.open;
    this.gardbService.gardener.unsubscribe();
    this.gardener = null;
  }

  render() {
    if (this.gardener && this.open) {
      return (
        <Host class="mt-5">
          <button type="button" class="close btn-sm mt-3 mr-3" aria-label="Close" onClick={() => this.close()}>
            Zurück <i class="fa fa-times-circle fa-lg" aria-hidden="true"></i>
          </button>
          <div class="border p-3 mt-3">
            <h2 class="mb-3 mb-md-4">{this.gardener.Person}</h2>
            <table class="table border-bottom">
              {Object.keys(this.gardener).map(key => (
                <tr>
                  <td class="label">
                    <strong>{key}</strong>
                  </td>
                  <td>{this.gardener[key]}</td>
                </tr>
              ))}
            </table>
          </div>
        </Host>
      );
    } else {
      return <app-loading></app-loading>;
    }
  }
}
