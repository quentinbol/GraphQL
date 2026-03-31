import { Student } from '../models/Student';

let students: Student[] = [
  { id: '1', name: 'Alice Martin', completedCredits: 95 },
  { id: '2', name: 'Bob Tremblay', completedCredits: 62 },
  { id: '3', name: 'Clara Dubois', completedCredits: 30 },
  { id: '4', name: 'David Chen', completedCredits: 15 },
  { id: '5', name: 'Emma Lavoie', completedCredits: 78 },
];

let nextId = 6;

export const StudentStore = {
  findAll(): Student[] {
    return [...students];
  },

  findById(id: string): Student | undefined {
    return students.find((s) => s.id === id);
  },

  create(name: string, completedCredits: number): Student {
    const newStudent: Student = {
      id: String(nextId++),
      name: name.trim(),
      completedCredits,
    };
    students.push(newStudent);
    return newStudent;
  },

  count(): number {
    return students.length;
  },
};
