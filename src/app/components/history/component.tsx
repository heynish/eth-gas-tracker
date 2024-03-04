import { GasBlock } from "@/services/gas";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const DynamicChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface Props {
  data: GasBlock[];
}

export function History(props: Props) {
  const options: ApexOptions = {
    chart: {
      zoom: {
        enabled: false,
        autoScaleYaxis: false,
      },
    },
    colors: ["#00d7c0", "#4a00ff", "#ff00d3"],
    stroke: {
      show: true,
      curve: "smooth" as any,
      width: 2,
    },
    xaxis: {
      categories: props.data.map((block, i) => i % 5 ? '' : block.blockNr),
    },
  };

  const series = [
    {
      name: "baseFee",
      type: "column",
      data: props.data.map((block) => block.baseFee),
    },
    {
      name: "utilization",
      type: "line",
      data: props.data.map((block) => block.utilization),
    },
  ];

  return (
    <div className="flex flex-col bg-white rounded-xl w-full max-w-[1200px] aspect-[1.91/1] p-4 md:p-12">
      <div className="flex justify-between">
        <h2 className="text-3xl">Gas History</h2>
      </div>

      <div className="grow my-4">
        <DynamicChart options={options} series={series} height="auto" />
      </div>
    </div>
  );
}
