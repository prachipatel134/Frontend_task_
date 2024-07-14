import React from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const RepoDetails = ({ repo, view }) => {
  const commitActivity = useSelector(state => state.reposdata.commitActivity);
  const codeFrequency = useSelector(state => state.reposdata.codeFrequency);

  const getCommitActivityChartOptions = () => ({
    title: { text: 'Weekly Commit Activity' },
    xAxis: { categories: commitActivity.map(item => new Date(item.week * 1000).toLocaleDateString()) },
    series: [{ data: commitActivity.map(item => item.total), name: 'Commits' }],
  });

  const getCodeFrequencyChartOptions = () => ({
    title: { text: `Weekly Code Frequency (${view})` },
    xAxis: { categories: codeFrequency.map(item => new Date(item[0] * 1000).toLocaleDateString()) },
    series: [
      { data: codeFrequency.map(item => item[1]), name: 'Additions', visible: view === 'additions' },
      { data: codeFrequency.map(item => item[2]), name: 'Deletions', visible: view === 'deletions' },
    ],
  });

  return (
    <div>
      {view === 'commits' ? (
        <HighchartsReact highcharts={Highcharts} options={getCommitActivityChartOptions()} />
      ) : (
        <HighchartsReact highcharts={Highcharts} options={getCodeFrequencyChartOptions()} />
      )}
    </div>
  );
};

export default RepoDetails;
