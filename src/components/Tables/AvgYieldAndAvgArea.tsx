import { Table } from "@mantine/core";
import cropData from "../Assats/IndiaAgroDataset.json";
import { CropDataType } from "../utils/types";
import { getAverageYieldAndArea } from "../utils/utils";

function AvgYieldAndAvgArea() {
  const averageYieldArea = getAverageYieldAndArea(cropData as CropDataType[]);
  return (
    <div className="table-container">
      <h3 className="subtitle">Average Yield and Area by Crop</h3>
      <Table
        className="mantine-table"
        striped
        highlightOnHover
        withTableBorder
        withColumnBorders
      >
        <thead>
          <tr>
            <th>Crop</th>
            <th>Average Yield of the Crop between 1950-2020</th>
            <th>Average Cultivation Area of the Crop between 1950-2020</th>
          </tr>
        </thead>
        <tbody>
          {averageYieldArea.map((row) => (
            <tr key={row.crop}>
              <td>{row.crop || 0}</td>
              <td>
                {row.avgYield || 0}
              </td>
              <td>
                {row.avgArea || 0}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AvgYieldAndAvgArea;
