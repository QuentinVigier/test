import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import DeleteTask from '../UseCase/DeleteTask/DeleteTask';
import GetAllTasksUseCase from '../UseCase/GetAllTasks/GetAllTasksUseCase';
import SaveTaskDto from '../UseCase/SaveTask/SaveTaskDto';
import UseCaseFactory from '../UseCase/UseCaseFactory';
import SaveTaskUseCase from '../UseCase/SaveTask/SaveTaskUseCase';

@Controller()
export default class TaskController {
  constructor(private readonly useCaseFactory: UseCaseFactory) {}

  // Récupère toutes les tâches
  @Get('/tasks')
  async getAll() {
    return (await this.useCaseFactory.create(GetAllTasksUseCase)).handle();
  }

  // Crée une nouvelle tâche
  @Post('/tasks')
  async create(@Body() dto: SaveTaskDto) {
    const createTaskUseCase = await this.useCaseFactory.create(SaveTaskUseCase);
    try {
      const result = await createTaskUseCase.handle(dto);
      console.log('Task created successfully:', result);
      return result;
    } catch (error) {
      console.error('Error creating task:', error.message);
      throw new BadRequestException('Unable to create task');
    }
  }

  // Met à jour une tâche existante
  @Patch('/tasks/:id')
  async update(@Param('id') id: string, @Body() dto: SaveTaskDto) {
    // On ajoute l'id au DTO avant de passer au use case
    const updateTaskUseCase = await this.useCaseFactory.create(SaveTaskUseCase);

    // Mise à jour de la tâche
    return updateTaskUseCase.handle({ ...dto, id: Number(id) });
  }

  // Supprime une tâche par ID
  @Delete('/tasks/:id')
  async delete(@Param('id') id: string) {
    return (await this.useCaseFactory.create(DeleteTask)).handle(Number(id));
  }
}
