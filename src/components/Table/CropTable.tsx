import React, { useState } from "react";
import { Box, Container, Table, Pagination, Card } from "@mantine/core";
import { processTableData } from "../../utils/processData"
import { CropData } from "../../interfaces";
import './TableComponent.css';

interface CropTableProps {
  data: CropData[];
}

const CropTable: React.FC<CropTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 12;

  const aggregatedData = processTableData(data);
  const totalPages = Math.ceil(aggregatedData.length / rowsPerPage);
  const currentData = aggregatedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <Container size={"md"} className="d-flex justify-content-center">
      <Card shadow="sm" withBorder radius={"md"} className="d-flex justify-content-center">
        <Box my={10} component="div" className="d-flex justify-content-center">
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Year</th>
                <th>Crop with Maximum Production</th>
                <th>Crop with Minimum Production</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((row, index) => (
                <tr key={index}>
                  <td>{row.year}</td>
                  <td>{row.maxCrop}</td>
                  <td>{row.minCrop}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
        <Box className="d-flex justify-content-center">
          <Pagination total={totalPages} value={currentPage} onChange={setCurrentPage} />
        </Box>
      </Card>
    </Container>
  );
};

export default CropTable;
