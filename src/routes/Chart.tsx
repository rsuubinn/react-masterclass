import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IData[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  let validData = data ?? [];
  if ("error" in validData) {
    validData = [];
  }
  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: validData?.map((price) => ({
                x: price.time_close * 1000,
                y: [price.open, price.high, price.low, price.close],
              })),
            },
          ]}
          title="Candlestick"
          options={{
            noData: {
              text: "데이터가 존재하지 않습니다.",
              style: {
                fontSize: "16px",
              },
            },
            fill: {
              opacity: 1,
            },
            theme: {
              mode: "dark",
            },
            chart: {
              background: "transparent",
              width: "100%",
              toolbar: {
                show: false,
              },
            },
            xaxis: {
              type: "datetime",
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
            },
            yaxis: {
              labels: {
                show: false,
              },
            },
            grid: {
              show: false,
            },
          }}
        ></ApexChart>
      )}
    </div>
  );
}

export default Chart;
