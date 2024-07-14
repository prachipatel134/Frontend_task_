import React, { useState } from 'react';
import { Collapse, Avatar, Tag, Space, Select } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isBetween from 'dayjs/plugin/isBetween';
import ContributeChart from './ContributeChart';
import { fetchCommitStart, fetchAddStart, setExpandedRepo, fetchContributeDataStart } from '../Redux/repoSlice';
import Chart from './Chart';

dayjs.extend(relativeTime);
dayjs.extend(isBetween);

const formatTime = (timestamp) => {
  const date = dayjs(timestamp);
  const now = dayjs();
  const diffInHours = now.diff(date, 'hour');

  if (diffInHours < 48) {
    return date.fromNow();
  } else {
    return date.format('MMM D, YYYY');
  }
};

export default function RepoItem({ repo }) {
  const dispatch = useDispatch();
  const [view, setView] = useState('additions');
  const expandedRepo = useSelector(state => state.reposdata.expandedRepo);

  const handleViewChange = (value) => {
  
    setView(value);
   
    
    if (expandedRepo === repo.id) {
      if (value === 'commits') {
        dispatch(fetchCommitStart({ owner: repo.owner.login, repo: repo.name }));
      } else if (value === 'additions') {
        dispatch(fetchAddStart({ owner: repo.owner.login, repo: repo.name }));
      }
    }
  };

  const handleExpand = (key) => {
    if (key.length > 0 && key[0] === repo.id.toString()) {
      if (expandedRepo !== repo.id) {
        dispatch(setExpandedRepo(repo.id));
        dispatch(fetchContributeDataStart({ owner: repo.owner.login, repo: repo.name }));
        if (view === 'commits') {
          dispatch(fetchCommitStart({ owner: repo.owner.login, repo: repo.name }));
        } else if (view === 'additions') {
          dispatch(fetchAddStart({ owner: repo.owner.login, repo: repo.name }));
        }
      }
    }
  };
  
  const items = [
    {
      key: repo.id.toString(),
      label: (
        <div className='flex py-2 gap-x-2'>
          <div>
            <Avatar src={repo.owner.avatar_url} alt={repo.owner.login} />
          </div>
          <div className='w-full'>
            <div className='flex justify-between items-center w-full'>
              <span style={{ marginLeft: 8 }} className='font-bold text-lg'>{repo.name}</span>
              <Tag>
                <Space>
                  <StarOutlined /> Star {repo.stargazers_count}
                </Space>
              </Tag>
            </div>
            <p className='pb-3 ps-1'>{repo.description}</p>
            <div className='flex justify-between items-center w-full'>
              <Tag>{repo.open_issues_count} Issues</Tag>
              <p>Last Pushed {formatTime(repo.pushed_at)} by {repo.owner.login}</p>
            </div>
          </div>
        </div>
      ),
      children: (
        <>
          <Select 
            value={view}
            onChange={handleViewChange} 
            style={{ width: 200 }}
            options={[
              { value: 'deletions', label: 'Deletions' },
              { value: 'additions', label: 'Additions' },
              { value: 'commits', label: 'Commits' },
            ]}
          />
          
          <ContributeChart view={view} repo={repo.id} />
          <Chart  />
        </>
      ),
    },
  ];

  return (
    <Collapse
      collapsible="header"
      expandIconPosition="end"
      onChange={handleExpand}
      activeKey={expandedRepo === repo.id ? [repo.id.toString()] : []}
      items={items}
    />
  );
}
