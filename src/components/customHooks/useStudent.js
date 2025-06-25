import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const fetchStudentData = async (studentId, block) => {
  try {
    const response = await axios.get(`${BASE_URL}/getStudentDetails/${studentId}`, {
      params: block ? { block } : {}, // Only include block if provided
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

const fetchStudentMajorInfo = async (studentId, block) => {
  const response = await axios.get(`${BASE_URL}/getStudentInfo`, {
    params: { studentId, ...(block && { block }) },
  });
  return response.data;
};

const fetchStudentProfileDetails = async (studentId, block) => {
  const response = await axios.get(`${BASE_URL}/getStudentProfile`, {
    params: { studentId, ...(block && { block }) },
  });
  return response.data;
};

export const useStudentData = (studentId, block = '') => {
  const cachedStudentQuery = useQuery({
    queryKey: ['student', studentId, block],
    queryFn: () => fetchStudentData(studentId, block),
    enabled: !!studentId,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const majorInfoQuery = useQuery({
    queryKey: ['studentMajor', studentId, block],
    queryFn: () => fetchStudentMajorInfo(studentId, block),
    enabled: !!studentId,
    staleTime: 10 * 60 * 1000,
  });

  const profileDetailsQuery = useQuery({
    queryKey: ['studentProfile', studentId, block],
    queryFn: () => fetchStudentProfileDetails(studentId, block),
    enabled: !!studentId,
    staleTime: 10 * 60 * 1000,
  });

  return {
    cachedStudent: {
      data: cachedStudentQuery.data,
      isLoading: cachedStudentQuery.isLoading,
      error: cachedStudentQuery.error,
    },
    majorInfo: {
      data: majorInfoQuery.data,
      isLoading: majorInfoQuery.isLoading,
      error: majorInfoQuery.error,
    },
    profileDetails: {
      data: profileDetailsQuery.data,
      isLoading: profileDetailsQuery.isLoading,
      error: profileDetailsQuery.error,
    },
  };
};