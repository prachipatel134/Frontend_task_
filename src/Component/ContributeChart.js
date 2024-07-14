import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Spin } from 'antd';
import HighchartsReact from 'highcharts-react-official';
import HighchartsNoData from 'highcharts/modules/no-data-to-display';

HighchartsNoData(Highcharts);

const ContributeChart = ({ view,repoId }) => {
  // useEffect(() => {
  //   console.log('View changed:', view);
  // }, [view]);

  const commitActivity = useSelector(state => state?.reposdata?.commitdata);
  const codeFrequency = useSelector(state => state?.reposdata?.adddeletedata);
  const loadingCommit = useSelector(state => state.reposdata.loadingCommit);
  const loadingAdditions = useSelector(state => state.reposdata.loadingAdd);
  

  const isLoading = loadingCommit || loadingAdditions;

  const getChartOptions = () => {
    let categories = [], seriesData = [], seriesName = '';

    if (view === 'commits' && commitActivity?.[0]?.length) {
      categories = commitActivity?.[0]?.map(item => new Date(item.week * 1000).toLocaleDateString()) || [];
      seriesData = commitActivity?.[0]?.map(item => item.total) || [];
      seriesName = 'Commits';
    } else if (view === 'additions' && codeFrequency?.[0]?.length) {
      categories = codeFrequency?.[0]?.map(item => new Date(item[0] * 1000).toLocaleDateString()) || [];
      seriesData = codeFrequency?.[0]?.map(item => item[1]) || [];
      seriesName = 'Additions';
    } else if (view === 'deletions' && codeFrequency?.[0]?.length) {
      categories = codeFrequency?.[0]?.map(item => new Date(item[0] * 1000).toLocaleDateString()) || [];
      seriesData = codeFrequency?.[0]?.map(item => item[2]) || [];
      seriesName = 'Deletions';
    }

    return {
      title: { text: `Weekly ${seriesName} Graph` },
      xAxis: { categories },
      series: [{ data: seriesData, name: seriesName }],
      tooltip: {
        formatter: function () {
          return `<b>${this.series.name}</b><br/>week:${this.x}
          <br/>changes: ${this.y}`;
        }
      },

      lang: { noData: 'No Data Available' },
      noData: {
        style: {
          fontSize: '14px',
          color: '#303030'
        }
      }
    };
  };

  return (
  isLoading ? (
     <div className='flex justify-center items-center py-7'><Spin /></div>
    ) : (
      <HighchartsReact highcharts={Highcharts} options={getChartOptions()} />
    )
  );
};

export default ContributeChart;
