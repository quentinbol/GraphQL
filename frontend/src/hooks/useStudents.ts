import { useQuery, useMutation } from '@apollo/client';
import {
  GET_ALL_STUDENTS,
  GET_STUDENT_BY_ID,
  ADD_STUDENT,
} from '../graphql/operations';
import {
  GetStudentsData,
  GetStudentData,
  AddStudentData,
  CreateStudentInput,
} from '../types/student';

export const useStudents = () => {
  const { data, loading, error, refetch } = useQuery<GetStudentsData>(GET_ALL_STUDENTS);
  return {
    students: data?.students ?? [],
    studentCount: (data as any)?.studentCount ?? 0,
    loading,
    error,
    refetch,
  };
};

export const useStudent = (id: string) => {
  const { data, loading, error } = useQuery<GetStudentData>(GET_STUDENT_BY_ID, {
    variables: { id },
    skip: !id,
  });
  return { student: data?.student ?? null, loading, error };
};

export const useAddStudent = () => {
  const [addStudent, { loading, error }] = useMutation<
    AddStudentData,
    { input: CreateStudentInput }
  >(ADD_STUDENT, {
    refetchQueries: [{ query: GET_ALL_STUDENTS }],
  });

  const createStudent = async (input: CreateStudentInput) => {
    const result = await addStudent({ variables: { input } });
    return result.data?.addStudent;
  };

  return { createStudent, loading, error };
};
