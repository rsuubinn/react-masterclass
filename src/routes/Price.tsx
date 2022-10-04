import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { fetchCoinPrice } from "../api";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

const PriceContainer = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
`;

const PrcieItem = styled.div`
  &:first-child {
    grid-column-start: span 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > span:nth-child(2) {
      font-size: 35px;
    }
  }
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  /* width: 100%;
  height: 10vh; */
  padding: 10px 20px;
  & > div:nth-child(2) {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 30px;
  }
`;

interface PriceIndicatorProps {
  percentage: number;
}

function PriceIndicator({ percentage }: PriceIndicatorProps) {
  return (
    <div>
      <div>{percentage.toFixed(2)}%</div>
      {percentage > 0 ? (
        <TrendingUpIcon />
      ) : percentage === 0 ? (
        <TrendingFlatIcon />
      ) : (
        <TrendingDownIcon />
      )}
    </div>
  );
}

const PriceIndicatorStyled = styled(PriceIndicator)<{ percentage: number }>``;

interface PriceProps {
  coinId: string;
}

interface IPrice {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<IPrice>(
    ["price", coinId],
    () => fetchCoinPrice(coinId),
    {
      refetchInterval: 10000,
    }
  );
  const usd = data?.quotes.USD;
  const athDate = new Date(usd?.ath_date!);
  const athDateParse = athDate.toLocaleDateString("ko-KR");
  const athTimeParse = athDate.toLocaleTimeString("ko-KR");
  return (
    <div>
      {isLoading ? (
        "loading..."
      ) : (
        <PriceContainer>
          <PrcieItem>
            <span>
              {athDateParse} {athTimeParse}
              <br />
              최고가 달성
            </span>
            <span>${usd?.ath_price.toFixed(2)}</span>
          </PrcieItem>
          <PrcieItem>
            <span>30분 전보다</span>
            <PriceIndicatorStyled percentage={usd?.percent_change_30m!} />
          </PrcieItem>
          <PrcieItem>
            <span>1시간 전보다</span>
            <PriceIndicatorStyled percentage={usd?.percent_change_1h!} />
          </PrcieItem>
          <PrcieItem>
            <span>6시간 전보다</span>
            <PriceIndicatorStyled percentage={usd?.percent_change_6h!} />
          </PrcieItem>
          <PrcieItem>
            <span>12시간 전보다</span>
            <PriceIndicatorStyled percentage={usd?.percent_change_12h!} />
          </PrcieItem>
          <PrcieItem>
            <span>24시간 전보다</span>
            <PriceIndicatorStyled percentage={usd?.percent_change_24h!} />
          </PrcieItem>
          <PrcieItem>
            <span>7일 전보다</span>
            <PriceIndicatorStyled percentage={usd?.percent_change_7d!} />
          </PrcieItem>
        </PriceContainer>
      )}
    </div>
  );
}

export default Price;
