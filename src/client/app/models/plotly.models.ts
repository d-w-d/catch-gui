import { Layout, Config, Data } from 'node_modules/@types/plotly.js';

export type TPlotlyColor =
  | string
  | Array<string | undefined | null>
  | Array<Array<string | undefined | null>>;

export interface IPlotlySettings {
  isMiniMode: boolean;
  layout: Partial<Layout>;
  config: Partial<Config>;
  data: Data[];
}

export interface IPlotlyPayLoad {
  xData: number[];
  yData?: number[];
  tooltipInfo?: string[];
  type: 'histogram' | 'scatter';
  xAxisTitle: string;
  yAxisTitle: string;
  plotTitle: string;
  description: string;
}
