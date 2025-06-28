import { useQuery, useMutation } from '@tanstack/react-query';
import { useStudentContext } from '../components/customHooks/StudentContext';
import { feeheads, studentMajorInfo, addPayment, studentProfile, studentHistory} from './apis'; 

export const useFeeHeads = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['feeHeads'],
    queryFn: feeheads,
  });


  console.log('Fee Heads:', data);

  return { data, isLoading, isError, error };
};

export const useStudentMajorInfo = () => {
  const { studentId } = useStudentContext();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['studentMajorInfo', studentId],
    queryFn: () => studentMajorInfo(studentId),
    enabled: !!studentId, 
  });

  console.log('Student Major Info:', data?.data);

  return { data: data?.data, isLoading, isError, error };
};

// export const useAddPayment = () => {
//   const { studentId } = useStudentContext();

//   const mutation = useMutation({
//     mutationFn: (cash) => addPayment(studentId, cash),
//     onSuccess: (data) => {
//       console.log('Payment Added:', data?.data);
//     },
//     onError: (error) => {
//       console.log('Payment Error:', error);
//     },
//   });

//   return mutation;
// };

export const useStudentProfile = () => {
  const { studentId } = useStudentContext();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['studentProfile', studentId],
    queryFn: () => studentProfile(studentId),
    enabled: !!studentId, 
  });

  console.log('Student Profile:', data);

  return { data, isLoading, isError, error };
};

export const useDueTotal = () =>{
  const {studentId} = useStudentContext();
  
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['dueAmount', studentId],
    queryFn: () => dueAmount(studentId),
    enabled: !!studentId, 
  });

  console.log('Due Amount:', data);

  return { data, isLoading, isError, error };

}

export const useStudentHistory = () =>{
  const {studentId} = useStudentContext();
   const { data, isLoading, isError, error } = useQuery({
    queryKey: ['studentHistory', studentId],
    queryFn: () => studentHistory(studentId),
    enabled: !!studentId, 
  });

  console.log('Student History:', data);

  return { data, isLoading, isError, error };

}