import React from "react";
import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const { data } = await customFetch.get("/jobs", { params });

    return { data, params };
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const AllJobsContext = createContext();
export const AllJobs = () => {
  const { data, params } = useLoaderData();
  console.log(data);
  return (
    <>
      <AllJobsContext.Provider value={{ data, params }}>
        <SearchContainer />
        <JobsContainer />
      </AllJobsContext.Provider>
    </>
  );
};

export const useAllJobsContext = () => {
  return useContext(AllJobsContext);
};
export default AllJobs;
