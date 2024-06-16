import { ChartsContainer, StatsContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  try {
    const response = await customFetch.get("/jobs/stats");
    return response.data;
  } catch (error) {
    return error;
  }
  return null;
};

const Stats = () => {
  const { defaultStats, monthlyApplicationsStats } = useLoaderData();
  console.log(monthlyApplicationsStats);

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplicationsStats?.length > 1 && (
        <ChartsContainer data={monthlyApplicationsStats} />
      )}
    </>
  );
};

export default Stats;
