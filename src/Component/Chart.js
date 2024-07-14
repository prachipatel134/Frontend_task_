import React,{useMemo} from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Spin } from 'antd';
import HighchartsReact from 'highcharts-react-official';
import HighchartsNoData from 'highcharts/modules/no-data-to-display';
import chartData from './contribute.json';

HighchartsNoData(Highcharts);

export default function Chart() {
    const commitActivity = useSelector(state => state?.reposdata?.contributeData);
    // const commitActivity = chartData;
    
 const loadingContributors = useSelector(state => state.reposdata.loadingContribute);
    const getChartOptions = () => {
        let categories = [];
        let series = [];

        if (commitActivity && commitActivity.length > 0) {

            const weeks = commitActivity[0].weeks;
            categories = weeks.map(item => new Date(item.w * 1000).toLocaleDateString());
            series = commitActivity.map(contributor => {
                return {
                    name: contributor.author.login,
                    data: contributor.weeks.map(week => week.c)
                };
            });
        }

        return {
            title: { text: 'Contributers Graph' },
            xAxis: { categories },
            series,
            tooltip: {
                formatter: function () {
                    return `<b>${this.series.name}</b><br/>Date: ${this.x}<br/>Contributions: ${this.y}`;
                }
            },
            lang: { noData: "No Data Available" },
            noData: {
                style: {
                    fontSize: '14px',
                    color: '#303030'
                }
            }
        };
    };

    return (
        loadingContributors ?
        <div className='flex justify-center items-center py-7'><Spin /></div>
        :
        <div>
            <HighchartsReact highcharts={Highcharts} options={getChartOptions()} />
        </div>
    );
}
