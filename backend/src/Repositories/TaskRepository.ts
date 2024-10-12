import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany();
  }

  async delete(id: number) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async save(
    data:
      | Prisma.XOR<Prisma.TaskCreateInput, Prisma.TaskUncheckedCreateInput>
      | Prisma.XOR<Prisma.TaskUpdateInput, Prisma.TaskUncheckedUpdateInput>,
  ) {
    // Si l'ID n'est pas présent, cela signifie que nous devons créer une nouvelle tâche
    if (!('id' in data)) {
      try {
        // Création de la nouvelle tâche
        const newTask = await this.prisma.task.create({
          data: data as Prisma.TaskCreateInput, // Casting explicite pour le cas de création
        });

        return newTask;
      } catch (error) {
        throw new Error(`Error creating task: ${error.message}`);
      }
    }

    // Sinon, c'est une mise à jour de la tâche existante
    try {
      // Extraire l'ID de manière explicite
      const { id, ...updateData } = data as Prisma.TaskUpdateInput & {
        id: number;
      };

      const updatedTask = await this.prisma.task.update({
        where: { id }, // Utilisation de l'ID pour localiser la tâche à mettre à jour
        data: updateData, // Passer uniquement les champs à mettre à jour
      });

      return updatedTask;
    } catch (error) {
      throw new Error(`Error updating task: ${error.message}`);
    }
  }
}
