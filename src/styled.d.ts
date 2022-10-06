import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    coinListBgColor: string;
    trendingUpColor: string;
    trendingFlatColor: string;
    trendingDownColor: string;
  }
}
