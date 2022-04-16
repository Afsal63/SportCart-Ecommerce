import { OFFER_LIST_FAIL, OFFER_LIST_REQUEST, OFFER_LIST_SUCCESS,OFFER_ADD_REQUEST,OFFER_ADD_SUCCESS,OFFER_ADD_FAIL, OFFER_DELETE_REQUEST, OFFER_DELETE_SUCCESS, OFFER_DELETE_FAIL, COOPEN_ADD_REQUEST, COOPEN_ADD_SUCCESS, COOPEN_ADD_FAIL, COOPENS_LIST_REQUEST, COOPENS_LIST_SUCCESS, COOPENS_LIST_FAIL, COOPENS_APPLY_REQUEST, COOPENS_APPLY_SUCCESS, COOPENS_APPLY_FAIL, COOPENS_CANCEL_REQUEST, COOPENS_CANCEL_SUCCESS, COOPENS_CANCEL_FAIL, COOPENS_DELETE_REQUEST, COOPENS_DELETE_SUCCESS, COOPENS_DELETE_FAIL } from "../constants/offerConstants"
import axios from 'axios'



export const listOffers = ()=>async (dispatch,getState)=>{
    try {
        dispatch({type:OFFER_LIST_REQUEST})
        const {userLogin:{userInfo}} = getState()
        const config = { headers: {Authorization: `Bearer ${userInfo.token}`},}
        const {data}=await axios.get(`/api/offers`,config)
        // console.log(data)
        dispatch({type:OFFER_LIST_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type: OFFER_LIST_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
    }
  }

  export const listCoopens = ()=>async (dispatch,getState)=>{
    try {
        dispatch({type:COOPENS_LIST_REQUEST})
        const {userLogin:{userInfo}} = getState()
        const config = { headers: {Authorization: `Bearer ${userInfo.token}`},}
     
        const {data}=await axios.get(`/api/coopens`,config)
        
        dispatch({type:COOPENS_LIST_SUCCESS,payload:data})
        
    } catch (error) {
        dispatch({type: COOPENS_LIST_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
    }
  }

  

export const addOffer = (offer)=>async (dispatch)=>{
  console.log(offer);
    try {
        dispatch({type:OFFER_ADD_REQUEST})
        const config = { headers: {'Content-Type': 'application/json',},}
        const {data}=await axios.post('/api/offers',offer,config)
        // console.log(data)
        dispatch({type:OFFER_ADD_SUCCESS,createSuccess:true,payload:data})
    } catch (error) {
        dispatch({type: OFFER_ADD_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
    }
  }  

  export const addCoopen = (coopen)=>async (dispatch)=>{
   
    try {
        dispatch({type:COOPEN_ADD_REQUEST})
        const config = { headers: {'Content-Type': 'application/json',},}
        const {data}=await axios.post('/api/coopens',coopen,config)
        // console.log(data)
        dispatch({type:COOPEN_ADD_SUCCESS,createSuccess:true,payload:data})
    } catch (error) {
        dispatch({type: COOPEN_ADD_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
    }
  }  

  

export const deleteOffer = (id) => async (dispatch, getState) => {
    try {
      dispatch({type: OFFER_DELETE_REQUEST,})  
      const {userLogin: { userInfo },} = getState()
      const config = {headers: {Authorization: `Bearer ${userInfo.token}`,},}
      await axios.delete(`/api/offers/${id}`, config)
      dispatch({type: OFFER_DELETE_SUCCESS,})
    } catch (error) {
        dispatch({type: OFFER_DELETE_FAIL,
        payload:error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message})
    }
  }


  export const coopenApplay=(id)=> async(dispatch,getState)=>{
 
    try {
      dispatch({type:COOPENS_APPLY_REQUEST})
      const {userLogin:{userInfo},}=getState()
      const config={headers:{Authorization:`Bearer ${userInfo.token}`,}}

      const {data}= await axios.get(`/api/coopens/${id}/apply`,config)
      console.log(data);
      dispatch({type:COOPENS_APPLY_SUCCESS ,payload:data})
    } catch (error) {
      dispatch({type:COOPENS_APPLY_FAIL,
      payload:error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message})

    }
  }

  export const deleteCoupon = (id) => async (dispatch, getState) => {
    try {
      dispatch({type: COOPENS_DELETE_REQUEST,})  
      const {userLogin: { userInfo },} = getState()
      const config = {headers: {Authorization: `Bearer ${userInfo.token}`,},}
      await axios.delete(`/api/coopens/${id}`, config)
      dispatch({type: COOPENS_DELETE_SUCCESS, })
    } catch (error) {
        dispatch({type: COOPENS_DELETE_FAIL,
        payload:error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message})
    }
  }
