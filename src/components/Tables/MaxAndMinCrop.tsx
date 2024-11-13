import { Table } from '@mantine/core'
import cropData from "../Assets/IndiaAgroDataset.json"
import { CropDataType } from "../utils/types";
import { getMaxMinProductionByYear } from '../utils/utils';

function MaxAndMinCrop() {
    const maxMinProduction = getMaxMinProductionByYear(cropData as CropDataType[]);
  return (
    <div className="table-container">
    <h3 className="subtitle">Maximum and Minimum Production by Year</h3>
    <Table className="mantine-table" striped highlightOnHover withTableBorder withColumnBorders>
      <thead>
        <tr>
          <th>Year</th>
          <th>Crop with Maximum Production in that Year</th>
          <th>Crop with Minimum Production in that Year</th>
        </tr>
      </thead>
      <tbody>
        {maxMinProduction.map((row: { year: number; maxCrop: string; minCrop: string; }) => (
          <tr key={row.year || "0"}>
            <td>{row.year || "0"}</td>
            <td>{row.maxCrop || "0"}</td>
            <td>{row.minCrop || "0"}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
  )
}

export default MaxAndMinCrop
