import { Injectable, BadRequestException } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import TaskRepository from '../../Repositories/TaskRepository'; // Importez le repository Prisma ou autre

@Injectable()
export default class SaveTaskUseCase
  implements UseCase<Promise<Task>, [dto: SaveTaskDto]>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto): Promise<Task> {
    // 1. VALIDATION DU DTO
    if (!dto.name || dto.name.trim() === '') {
      throw new BadRequestException('Title is required.');
    }

    try {
      // 2. ENREGISTREMENT DES DONNÉES
      const newTask = await this.taskRepository.save({
        id: dto.id,
        name: dto.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return newTask;
    } catch (error) {
      // 3. GESTION DES ERREURS
      throw new BadRequestException(`Failed to save task: ${error.message}`);
    }
  }
}
