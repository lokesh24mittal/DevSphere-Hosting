import React from 'react'
import toast from 'react-hot-toast';
import { apiConnector } from '../ApiConnector';
import { catalogData } from '../Api';

export default  async function getCatalogPageData(categoryId) {
  console.log(categoryId);
  let result=[];
  const toastId=toast.loading("Loading...");
  try{
        const response =await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,{categoryId:categoryId});
        if(!response?.data?.success){
            throw new Error("Could not Fetch category page data")
                
        }
         result=response?.data;
  }
  catch(err){
console.log("CARALOG PAGE DATA API ERROR...",err);
toast.error(err.message);
result=err.response?.data
  }
  toast.dismiss(toastId);
  return result;
}
