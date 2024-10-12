import { BadRequestException, Injectable } from '@nestjs/common';
import { UseCase } from '../../index';
import TaskRepository from '../../Repositories/TaskRepository';
import { Task } from '../../Entities/Task'; // Assurez-vous d'importer l'entité Task

@Injectable()
export default class UpdateTask
  implements UseCase<Promise<Task>, [id: number, updateTaskDto: UpdateTaskDto]>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      const updatedTask = await this.taskRepository.update(id, updateTaskDto);
      if (!updatedTask) {
        throw new BadRequestException('Task not found');
      }
      return updatedTask;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

// Définissez l'interface UpdateTaskDto selon vos besoins
interface UpdateTaskDto {
  title?: string;
}