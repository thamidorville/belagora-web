import api from './api';
import type { Agenda } from '../types/agenda';
import type { Agendamento } from '../types/agendamento';

export async function listarVitrineDoCliente(lat?: number, lng?: number): Promise<Agenda[]> {
  const params = lat && lng ? { lat, lng } : {};
  const response = await api.get('/agenda/vitrine-do-cliente', { params });
  return response.data;
}

export async function criarAgendamento(agendaId: string): Promise<void> {
  await api.post('/agendamento', { agendaId });
}

export async function listarMeusAgendamentos(): Promise<Agendamento[]> {
  const response = await api.get('/agendamento/meus-agendamentos');
  return response.data;
}

export async function cancelarAgendamento(id: string, motivo: string): Promise<void> {
  await api.patch(`/agendamento/${id}/cancelar`, { motivo });
}

export async function listarMeusAgendamentosGestor(): Promise<Agendamento[]> {
  const response = await api.get('/agendamento/meus-agendamentos-gestor');
  return response.data;
}

export async function listarMinhaAgendaFuncionario(): Promise<Agendamento[]> {
  const response = await api.get('/agendamento/meus-agendamentos-funcionario');
  return response.data;
}

export async function cancelarAgendamentoGestor(id: string, motivo: string): Promise<void> {
  await api.patch(`/agendamento/${id}/cancelar-gestor`, { motivo });
}

export async function concluirAgendamento(id: string): Promise<void> {
  await api.patch(`/agendamento/${id}/status`, { status: 'Concluido' });
}
