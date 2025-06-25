import axios from "axios";

const API_BASE_URL = "http://localhost:8080"

export const feeheads = async()=>{
    try{
        const response = await fetch(`${API_BASE_URL}/getAllFeeHeads`);
        const result = await response.json();
        return result;
    }
    catch(error){
        console.log(error);
    }
}

export const studentMajorInfo = async(studentId) =>{
    const result = await axios.get(`${API_BASE_URL}/getStudentInfo?studentId=${studentId}`);
    return result;
}

export const addPayment = async (studentId, cash) => {
    console.log(cash);
    const result = await axios.post(`${API_BASE_URL}/payment?studentId=${studentId}`,cash);
    console.log(result);
    return result.data;
    
};

export const studentProfile = async(studentId)=>{
    try{
        const response = await fetch(`${API_BASE_URL}/getStudentProfile?studentId=${studentId}`);
        const result = await response.json();
        return result;
    }catch(error){
        console.log(error);
    }
}

export const dueAmount = async(studentId) =>{
    const result = await axios.get(`${API_BASE_URL}/getTotalDue?studentId=${studentId}`);
    return result;
}