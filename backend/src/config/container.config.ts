import { InMemoryStudentRepository } from '../repositories/inMemoryStudent.repository';
import { MongoStudentRepository } from '../repositories/mongoStudent.repository';
import { IStudentRepository } from '../repositories/IStudent.repository';
import { StudentService } from '../services/student.service';
import { StudentController } from '../controllers/student.controller';
import { config } from './env.config';

const useMockRepository = config.nodeEnv === 'development';

const studentRepository: IStudentRepository = useMockRepository
	? new InMemoryStudentRepository()
	: new MongoStudentRepository();

const studentService: StudentService = new StudentService(studentRepository);
export const studentController: StudentController = new StudentController(studentService);
