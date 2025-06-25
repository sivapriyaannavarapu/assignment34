import { createContext, useState, useContext } from "react";

const StudentContext = createContext();

export const StudentProvider = ({children}) =>{
    const [studentId, setStudentId] = useState(0);
    return (
    <StudentContext.Provider value={{ studentId, setStudentId }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudentContext = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudentContext must be used within a StudentProvider');
  }
  return context;
};