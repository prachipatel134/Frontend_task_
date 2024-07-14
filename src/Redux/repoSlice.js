import { createSlice } from '@reduxjs/toolkit';

const repoSlice = createSlice({
  name: 'repos',
  initialState: {
    reposdata: [],
    loading: false,
    loadingAdd:false,
    loadingContribute:false,
    loadingCommit:false,
    error: null,
    page:1,
    expandedRepo: null,
    commitdata:[],
    adddeletedata:[],
    contributeData:[],
    
    dateRange: '1 month',
  },
  reducers: {
    fetchReposStart(state) {
      state.loading = true;
    },
    fetchCommitStart(state) {
      state.loadingCommit = true;
    },
    fetchContributeDataStart(state){
      state.loadingContribute = true;
    },
    setExpandedRepo(state, action) {
      state.expandedRepo = action.payload;
    },
    fetchAddStart(state) {
      state.loadingAdd = true;
    },
    fetchReposSuccess(state, action) {
      state.loading = false;
      if (state.page === 1) {
        state.reposdata = action.payload.items; 
      } else {
        state.reposdata = [...state.reposdata, ...action.payload.items]; 
      }
    },
    fetchReposFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setDateRange(state, action) {
      
      state.page = 1;
      state.dateRange = action.payload;
    },
    setCustomDate(state, action) {
      
      state.customDate = action.payload;
    },
    setPage(state,action){
      state.loading = true;
      state.page = action.payload;
    },
    fetchCommitSuccess(state,action){
      state.loadingCommit = false;
      state.commitdata = [action.payload];
    },
    fetchCommitFailure(state,action){
      state.loadingCommit = false;
      state.error = [action.payload];
    },
    fetchAddSuccess(state,action){
      state.loadingAdd = false;
      state.adddeletedata = [action.payload];
    },
    fetchAddFailure(state,action){
      state.loadingAdd = false;
      state.error = [action.payload];
    },
    fetchContributeDataSuccess(state, action) {
      state.loadingContribute = false;
      state.contributeData= action.payload;
    },
    fetchContributeDataFailure(state, action) {
      state.loadingContribute = false;
      state.error = action.payload;
    },
    
  },
});

export const { fetchReposStart,
  fetchCommitStart,fetchAddStart,
  setExpandedRepo,
   fetchReposSuccess, 
   fetchReposFailure,
   setDateRange,
   setPage,
   fetchAddSuccess,
   fetchCommitSuccess,
   fetchAddFailure,
   fetchCommitFailure,
  fetchContributeDataFailure,
fetchContributeDataSuccess,fetchContributeDataStart,setCustomDate } = repoSlice.actions;
export default repoSlice.reducer;
