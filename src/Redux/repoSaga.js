import { takeLatest, call, put,select } from 'redux-saga/effects';
import axios from 'axios';
import { fetchReposStart, 
  fetchReposSuccess,
   fetchReposFailure,
   setDateRange,
   setPage,fetchAddSuccess,fetchCommitSuccess,fetchCommitFailure,fetchAddFailure,fetchCommitStart,fetchAddStart,fetchContributeDataStart, fetchContributeDataSuccess,fetchContributeDataFailure } from './repoSlice';
import { Slider } from 'antd';


const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const page =  (state) => state.reposdata.page;
const customDate = (state) => state.reposdata.customDate;


function getDateFromRange(range) {
  const now = new Date();
  
  let pastDate;


  switch (range) {
    case '1 week':
      pastDate = new Date(now.setDate(now.getDate() - 7));
      break;
    case '2 weeks':
      pastDate = new Date(now.setDate(now.getDate() - 14));
      break;
    case '1 month':
      pastDate = new Date(now.setMonth(now.getMonth() - 1));
      break;
    default:
      pastDate = new Date(now.setMonth(now.getMonth() - 1));
      break;
  }

  return pastDate.toISOString().split('T')[0];
}

const fetchCommitActivity = async (owner, repo) => {
  let response;
 while(true){
   response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`, {
    headers: {
      'Authorization': `${GITHUB_TOKEN}`
    }
  });
  if (response.status === 202) {
     
    await new Promise(resolve => setTimeout(resolve, 5000)); 
  } else if (response.status === 200) {
  
    break;
  } else {
   
    throw new Error(`Failed to fetch data: ${response.status}`);
  }
}
 
  return response.data;
};

const fetchCodeFrequency = async (owner, repo) => {
  let response;
  while (true) {
response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/stats/code_frequency`, {
  headers: {
    'Authorization': `${GITHUB_TOKEN}`
  }
});
     if (response.status === 202) {
     
      await new Promise(resolve => setTimeout(resolve, 5000));
    } else if (response.status === 200) {
    
      break;
    } else {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
  }

return response.data;
};
const fetchContribute = async (owner, repo) => {
 
  let response;

  while (true) {
    response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/stats/contributors`, {
      headers: {
        'Authorization': `${GITHUB_TOKEN}`,
      },
    });

    if (response.status === 202) {
     
      await new Promise(resolve => setTimeout(resolve, 5000)); 
    } else if (response.status === 200) {
    
      break;
    } else {
      
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
  }

  return response.data;

};

function* reposSaga(action) {
  try {
    const Page = yield select(page);
    const customdate = yield select(state => state.reposdata.customDate);
    const dateRange = yield select(state => state.reposdata.dateRange);

    const createdAfter = dateRange === 'custom' && customdate ? customdate : getDateFromRange(dateRange);
    
   
    
    const response = yield call(
      axios.get,
      `https://api.github.com/search/repositories?q=created:>${createdAfter}&sort=stars&order=desc&page=${Page}`,
      {
        headers: {
          'Authorization': `${GITHUB_TOKEN}`
        }
      }
    );
    yield put(fetchReposSuccess({items:response.data.items }));
  } catch (error) {
    // yield put(fetchReposFailure(error.message));
    if (error.response && error.response.status === 403) {
      yield put(fetchReposFailure('You have exceeded the rate limit. Please wait for a while.'));
    } else {
      yield put(fetchReposFailure(error.message));
    }
  }
}
 function* getChartData(type) {

 }

 function* commitActivitySaga(action) {
  try {
    const { owner, repo } = action.payload;
    const data = yield call(fetchCommitActivity, owner, repo);
    yield put(fetchCommitSuccess(data));
  } catch (error) {
    if (error.response && error.response.status === 403) {
      yield put(fetchCommitFailure('You have exceeded the rate limit. Please wait for a while.'));
    } else {
      yield put(fetchCommitFailure(error.message));
    }
  }
}

function* codeFrequencySaga(action) {
  try {
    const { owner, repo } = action.payload;
    const data = yield call(fetchCodeFrequency, owner, repo);
    yield put(fetchAddSuccess(data));
  } catch (error) {
    
    if (error.response && error.response.status === 403) {
      yield put(fetchAddFailure('You have exceeded the rate limit. Please wait for a while.'));
    } else {
      if (error.response && error.response.status === 403) {
        yield put(fetchAddFailure('You have exceeded the rate limit. Please wait for a while.'));
      } else {
        yield put(fetchAddFailure(error.message));
      }
    }
  }
}
function* contibutorsSaga(action) {

  try {
    const { owner, repo } = action.payload;
    const data = yield call(fetchContribute, owner, repo);
    yield put(fetchContributeDataSuccess(data));
    
  } catch (error) {
    yield put(fetchContributeDataFailure(error.message));
  }
}
function* rootSaga() {
  yield takeLatest(fetchReposStart.type, reposSaga);
  yield takeLatest(setDateRange.type, reposSaga);
  yield takeLatest(fetchCommitStart.type, commitActivitySaga);
  yield takeLatest(fetchAddStart.type, codeFrequencySaga);
  yield takeLatest(fetchContributeDataStart.type, contibutorsSaga);
}

export default rootSaga;
