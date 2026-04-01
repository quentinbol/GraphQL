import { IStudentRepository } from "./IStudent.repository";
import { StudentSchema } from "../models/student.model";
import { CreateStudentDto, Student } from "../types/student.types";


export class MongoStudentRepository implements IStudentRepository {
    private toStudent(document: Student): Student {
        return {
            id: document.id,
            name: document.name,
            completedCredits: document.completedCredits,
        };
    }

    async findAll(): Promise<Student[]> {
        const students = await StudentSchema.find({}, { _id: 0, __v: 0 }).lean<Student[]>().exec();

        return students.map((student) => this.toStudent(student));
    }

    async findById(id: string): Promise<Student | undefined> {
        const student = await StudentSchema
            .findOne({ id }, { _id: 0, __v: 0 })
            .lean<Student>()
            .exec();

        return student ? this.toStudent(student) : undefined;
    }

    async findByName(name: string): Promise<Student | undefined> {
        const normalizedName = name.trim();
        const escapedName = normalizedName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const student = await StudentSchema
            .findOne({ name: { $regex: `^${escapedName}$`, $options: 'i' } }, { _id: 0, __v: 0 })
            .lean<Student>()
            .exec();

        return student ? this.toStudent(student) : undefined;
    }

    async create(dto: CreateStudentDto): Promise<Student> {
        const lastStudent = await StudentSchema
            .findOne({}, { id: 1, _id: 0 })
            .sort({ id: -1 })
            .lean<{ id: string }>()
            .exec();

        const nextId = String((Number(lastStudent?.id ?? '0') || 0) + 1);

        const created = await StudentSchema.create({
            id: nextId,
            name: dto.name.trim(),
            completedCredits: dto.completedCredits,
        });

        return this.toStudent(created.toObject());
    }

    async count(): Promise<number> {
        return StudentSchema.countDocuments().exec();
    }
}