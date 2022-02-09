import { FunctionalComponent, h } from "@stencil/core";
import { Gardener } from "../utils/interfaces";

interface GardenerDetailProps {
  gardener: Gardener;
}
interface GardenerRowProps {
  gardener: Gardener;
  onClick: any;
}

export const GardenerRow: FunctionalComponent<GardenerRowProps> = ({ gardener, onClick }) => (
  <tr key={gardener.ID} onClick={onClick}>
      <td class="person">
      <div class="table__link">{gardener.Person}</div>
    </td>
    <td class="content">{gardener.Inhalt}</td>
    <td class="type">{gardener.Dokumententyp}</td>
    <td class="year">{gardener.Jahr}</td>
    <td class="author">{gardener.Autor}</td>
  </tr>
);

export const GardenerDetail: FunctionalComponent<GardenerDetailProps> = ({ gardener }) => (
  <tr id={"g" + gardener.ID} key={gardener.ID} class={"detail"}>
    <td colSpan={6}>
      <div class="detail__wrapper px-4 pt-3 pb-4">
        <h3 class="mb-2 mb-md-4">{gardener.Person}</h3>
        {Object.keys(gardener).map(key => (
          <div class="row pb-1">
            <div class="label col-xs-12 col-sm-2">
              <strong>{key}</strong>
            </div>
            <div class="col">{gardener[key]}</div>
          </div>
        ))}
      </div>
    </td>
  </tr>
);
