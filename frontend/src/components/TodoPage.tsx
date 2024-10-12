import { Check, Delete } from '@mui/icons-material';
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';

const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [editingTask, setEditingTask] = useState<{ id: number, name: string } | null>(null);

  const handleFetchTasks = async () => setTasks(await api.get('/tasks'));

  const handleDelete = async (id: number) => {
    try {
      // Appel à l'API pour supprimer la tâche
      await api.delete(`/tasks/${id}`);
      // Rafraîchir la liste des tâches après la suppression
      await handleFetchTasks();
    } catch (error) {
      console.log('Error deleting task:', error);
    }
  };

  const handleSave = async () => {
    if (newTaskName.trim()) {
      try {
        // Appel à l'API pour créer une nouvelle tâche
        await api.post('/tasks', { name: newTaskName });
        // Rafraîchir la liste des tâches après la création
        await handleFetchTasks();
        // Réinitialiser le champ de la nouvelle tâche
        setNewTaskName('');
      } catch (error) {
        console.log('Error saving task:', error);
      }
    }
  };

  const handleUpdate = async (task: Task) => {
    if (editingTask && editingTask.name !== task.name) {
      try {
        // Appel à l'API pour mettre à jour la tâche
        await api.patch(`/tasks/${task.id}`, { name: editingTask.name });
        // Rafraîchir la liste des tâches après la mise à jour
        await handleFetchTasks();
        // Réinitialiser l'état d'édition
        setEditingTask(null);
      } catch (error) {
        console.log('Error updating task:', error);
      }
    }
  };

  useEffect(() => {
    (async () => {
      handleFetchTasks();
    })();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      <Box justifyContent="center" mt={5} flexDirection="column">
        {tasks.map((task) => (
          <Box key={task.id} display="flex" justifyContent="center" alignItems="center" mt={2} gap={1} width="100%">
            <TextField
              size="small"
              value={editingTask?.id === task.id ? editingTask.name : task.name}
              onChange={(e) => setEditingTask({ id: task.id, name: e.target.value })}
              fullWidth
              sx={{ maxWidth: 350 }}
            />
            <Box>
              <IconButton
                color="success"
                disabled={!editingTask || editingTask.id !== task.id || editingTask.name === task.name}
                onClick={() => handleUpdate(task)}
              >
                <Check />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(task.id)}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        ))}

        <Box display="flex" justifyContent="center" alignItems="center" mt={2} gap={1}>
          <TextField
            size="small"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="Nouvelle tâche"
          />
          <Button variant="outlined" onClick={handleSave} disabled={!newTaskName.trim()}>
            Ajouter une tâche
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default TodoPage;