import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Routes, Route, useParams, useMatch } from "react-router";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinPrice } from "../api";
import Chart from "./Chart";
import Price from "./Price";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  width: 100%;
  height: 15vh;
  display: flex;
  align-items: center;
`;

const Button = styled(Link)`
  font-size: 2.2rem;
  display: block;
  color: ${(props) => props.theme.accentColor};
  &:hover {
    color: ${(props) => props.theme.textColor};
  }
`;

const Title = styled.h1`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.div`
  text-align: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.coinListBgColor};
  padding: 20px;
  border-radius: 10px;
  box-shadow: rgb(10 10 10 / 10%) 0px 0.2rem 0.5rem;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    margin-bottom: 10px;
    font-size: 15px;
  }
`;
const Description = styled.p`
  padding: 20px;
  margin: 20px 0px;
  line-height: 25px;
  font-size: 18px;
  background-color: ${(props) => props.theme.coinListBgColor};
  border-radius: 10px;
  box-shadow: rgb(10 10 10 / 10%) 0px 0.2rem 0.5rem;
`;

const Taps = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;
const Tap = styled.span<{ isActive: boolean }>`
  box-shadow: rgb(10 10 10 / 10%) 0px 0.2rem 0.5rem;
  text-align: center;
  background-color: ${(props) => props.theme.coinListBgColor};
  padding: 7px 0px;
  border-radius: 15px;
  a {
    display: block;
    &:hover {
      transition: color 0.2s ease-in-out;
      color: ${(props) => props.theme.accentColor};
    }
  }
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
`;

interface RouteState {
  state: {
    name: string;
  };
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
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

function Coin() {
  const { coinId } = useParams();
  const { state } = useLocation() as RouteState;
  const priceMatch = useMatch(`/${coinId}/price`);
  const chartMatch = useMatch(`/${coinId}/chart`);
  const { isLoading: loadingInfo, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId ? coinId : "")
  );
  const { isLoading: loadingPrice, data: priceData } = useQuery<PriceData>(
    ["price", coinId],
    () => fetchCoinPrice(coinId ? coinId : "")
  );

  const loading = loadingInfo || loadingPrice;
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Button to="/">&larr;</Button>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>??????</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>??????</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>?????????</span>
              <span>${priceData?.quotes.USD.price.toFixed(2)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>??????</span>
              <span>{priceData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>?????? ?????????</span>
              <span>{priceData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Taps>
            <Tap isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tap>
            <Tap isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tap>
          </Taps>
          <Routes>
            <Route
              path={`/chart`}
              element={<Chart coinId={coinId as string} />}
            />
            <Route
              path={`/price`}
              element={<Price coinId={coinId as string} />}
            />
          </Routes>
        </>
      )}
    </Container>
  );
}
export default Coin;
