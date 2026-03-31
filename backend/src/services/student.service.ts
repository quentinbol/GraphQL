import { StudentStore } from "../data/studentStore";
import { CreateStudentDto, Student, StudentModel } from "../models/Student";

export class StudentService {

    findAll(): Student[] {
        return StudentStore.findAll();
    }

    findById(id: string): Student {
        const student = StudentStore.findById(id);
        if (!student) {
            throw new Error(`Student with ID "${id}" not found.`);
        }
        return student;
    }

    add(student: CreateStudentDto): Student {
        StudentModel.validate(student);

        const existing = StudentStore.findAll().find(
            (s) => s.name.toLowerCase() === student.name.trim().toLowerCase()
        );
        if (existing) {
            throw new Error(`A student named "${student.name}" already exists.`);
        }

        return StudentStore.create(student.name, student.completedCredits);
    }

    count(): number {
        return StudentStore.count();
    }

}