import React, { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReposStart, setPage } from "../Redux/repoSlice";
import RepoItem from "./RepoItem";

import DateSelect from "./DateSelect";
import { Button, Spin, Result } from "antd";

const RepoList = () => {
  const dispatch = useDispatch();
  const { reposdata, loading, error } = useSelector((state) => state.reposdata);
  const page = useSelector((state) => state.reposdata.page);
  const loader = useRef(null);

  useEffect(() => {
    dispatch(fetchReposStart());
  }, [page]);

  const loadMore = () => {
    dispatch(setPage(page + 1));
    dispatch(fetchReposStart());
  };

  if (loading && page === 1)
    return (
      <div className="flex justify-center items-center h-[100vh] w-full fixed">
        <Spin />
      </div>
    );
  if (error)
    return (
      <div>
        <Result
          status="403"
          // title="403"
          subTitle={error}
        />
      </div>
    );

  return (
    <div className="container mx-auto xl:px-20 lg:px-12 px-6 xl:w-[65%] lg:w-[70%] w-[80%]">
      <div className="flex justify-between py-5 items-center">
        <h2 className="font-bold lg:text-2xl text-lg text-center">
          Most Starred Github Repos
        </h2>
        <div>
          <DateSelect />
        </div>
      </div>
      <div>
        {reposdata
          ?.slice()
          .reverse()
          .map((repo) => (
            <RepoItem key={repo.id} repo={repo} />
          ))}
      </div>
      {loading && (
        <div className="flex justify-center items-center py-4">
          <Spin />
        </div>
      )}
      <Button onClick={loadMore} block>
        Load More
      </Button>
    </div>
  );
};

export default RepoList;
