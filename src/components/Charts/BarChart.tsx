import { useEffect, useRef } from "react";
import { Box, Card, Container } from "@mantine/core";
import * as echarts from "echarts";
import { processBarChartData } from "../../utils/processData";
import { CropData } from "../../interfaces";

interface BarChartComponentProps {
  data: CropData[];
}

const BarChart: React.FC<BarChartComponentProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const processedData = processBarChartData(data);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current!);

    const crops = processedData.map((item) => item.crop);
    const avgYield = processedData.map((item) => item.avgYield);

    const options: echarts.EChartsOption = {
      title: {
        text: "Average Crop Yield (Kg/Ha)",
        textStyle: { color: "turquoise" },
      },
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: crops,
        axisLabel: { rotate: 45, color: "turquoise" },
      },
      yAxis: {
        type: "value",
        name: "Average Yield (Kg/Ha)",
        nameTextStyle: { color: "turquoise" },
        axisLabel: { color: "turquoise" },
      },
      series: [{ type: "bar", data: avgYield, barWidth: "50%" }],
    };

    chartInstance.setOption(options);
    return () => chartInstance.dispose();
  }, [processedData]);

  return (
    <Container size={"md"} className="d-flex justify-content-center">
      <Card shadow="sm" withBorder radius={"md"} className="d-flex justify-content-center">
        <Box my={50} component="div" className="d-flex justify-content-center">
          <Box ref={chartRef} style={{ width: "100%", height: "400px" }} />
        </Box>
      </Card>
    </Container>
  );
};

export default BarChart;
