import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getTokenData } from '../../utils/token';
import { listarMinhaAgendaFuncionario } from '../../services/agendamentoService';
import FundoTema from '../../styles/FundoTema';
import { tema } from '../../styles/tema';
import type { Agendamento } from '../../types/agendamento';

function AgendaPage() {
  const { token } = useAuth();
  const dados = getTokenData(token);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const lista = await listarMinhaAgendaFuncionario();
        setAgendamentos(lista);
      } catch (error) {
        console.error('Erro ao carregar agenda:', error);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  function estiloStatus(status: string): React.CSSProperties {
    if (status === 'Confirmado') return tema.statusVerde;
    if (status === 'Cancelado') return tema.statusVermelho;
    return tema.statusAzul;
  }

  if (carregando) {
    return <p>Carregando...</p>;
  }

  return (
    <FundoTema largura="total">
      <div style={tema.hero}>
        <h1 style={tema.heroTitulo}>Oi, {dados?.nome}</h1>
        <p style={tema.heroSubtitulo}>Aqui você visualiza seus horários e agendamentos.</p>
      </div>

      {agendamentos.length === 0 ? (
        <p style={tema.vazio}>Você ainda não possui agendamentos.</p>
      ) : (
        <table style={tema.tabelaVidro}>
          <thead>
            <tr>
              <th style={tema.th}>Data</th>
              <th style={tema.th}>Horário</th>
              <th style={tema.th}>Cliente</th>
              <th style={tema.th}>Serviço</th>
              <th style={tema.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {agendamentos.map((a) => (
              <tr key={a.id}>
                <td style={tema.td}>{a.data}</td>
                <td style={tema.td}>{a.horarioInicio} - {a.horarioFim}</td>
                <td style={tema.td}>{a.clienteNome}</td>
                <td style={tema.td}>{a.servicoNome}</td>
                <td style={tema.td}>
                  <span style={estiloStatus(a.status)}>{a.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </FundoTema>
  );
}

export default AgendaPage;
