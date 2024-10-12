import { BadRequestException, Injectable } from '@nestjs/common';
import { UseCase } from '../../index';
import TaskRepository from '../../Repositories/TaskRepository';
import { Task } from '@prisma/client';

@Injectable()
export default class CreateTask
  implements UseCase<Promise<Task>, [createTaskDto: CreateTaskDto]>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const newTask = await this.taskRepository.save(createTaskDto);
      return newTask;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

interface CreateTaskDto {
  id: null | number;
  name: string;
}