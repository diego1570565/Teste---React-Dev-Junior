import React, { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {Container, Title, Form, FormGroup, Label, Input, ErrorMessage, Button, ButtonGroup} from './styles';
import { useForm, Controller } from 'react-hook-form';

interface FormularioEnderecoProps {
  onClose: () => void;
  isEditando: boolean;
  visitaEditando?: any;
  onSave: (novaVisita: any) => void;
}

const FormularioEndereco: React.FC<FormularioEnderecoProps> = ({ onClose, isEditando, visitaEditando, onSave }) => {
  const { control, handleSubmit, setValue, reset, getValues, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
    defaultValues: {
      cep: '',
      uf: '',
      cidade: '',
      bairro: '',
      logradouro: '',
      numero: '',
    }
  });

  useEffect(() => {
    if (isEditando && visitaEditando) {
      setValue('cep', visitaEditando.cep);
      setValue('uf', visitaEditando.uf);
      setValue('cidade', visitaEditando.cidade);
      setValue('bairro', visitaEditando.bairro);
      setValue('logradouro', visitaEditando.logradouro);
      setValue('numero', visitaEditando.numero);
    }
  }, [isEditando, visitaEditando, setValue]);

  const buscarCep = async (value: string) => {
    try {
      const url = `https://viacep.com.br/ws/${value}/json/`;
      const response = await axios.get(url);
      const data = response.data;

      if (data.erro) {
        Swal.fire({
          title: 'Erro!',
          text: 'CEP não encontrado',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }

      setValue('uf', data.uf);
      setValue('cidade', data.localidade);
      setValue('bairro', data.bairro);
      setValue('logradouro', data.logradouro);

    } catch (error) {
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao buscar CEP',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue('cep', value);
    console.log(value);

    if (value.length === 8) {
      console.log('CEP já tratado: ', value);
      buscarCep(value);
    } else {
      setValue('uf', '');
      setValue('cidade', '');
      setValue('bairro', '');
      setValue('logradouro', '');
    }
  };

  const onSubmit = () => {
    const novaVisita = {
      cep: getValues('cep'),
      uf: getValues('uf'),
      cidade: getValues('cidade'),
      bairro: getValues('bairro'),
      logradouro: getValues('logradouro'),
      numero: getValues('numero'),
      ultimaModificacao: new Date().toISOString(),
      concluida: false,
    };
    console.log('Saindo do formulario: ', novaVisita);
    onSave(novaVisita);
    fechar()
  };

  const fechar = () => {
    reset();
    onClose();
  };

  return (
    <Container>
      <Title>{isEditando ? 'Editar Visita' : 'Nova Visita'}</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>CEP:</Label>
          <Controller
            name="cep"
            control={control}
            rules={{ required: 'CEP é obrigatório', pattern: { value: /^[0-9]{8}$/, message: 'CEP inválido' } }}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                onChange={(e) => {
                  field.onChange(e);
                  handleCepChange(e);
                }}
                maxLength={9}
                placeholder="Digite o CEP"
              />
            )}
          />
          {errors.cep && <ErrorMessage>{errors.cep.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>UF:</Label>
          <Controller
            name="uf"
            control={control}
            rules={{ required: 'UF é obrigatório' }}
            render={({ field }) => <Input {...field} type="text" readOnly />}
          />
          {errors.uf && <ErrorMessage>{errors.uf.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Cidade:</Label>
          <Controller
            name="cidade"
            control={control}
            rules={{ required: 'Cidade é obrigatória' }}
            render={({ field }) => <Input {...field} type="text" readOnly />}
          />
          {errors.cidade && <ErrorMessage>{errors.cidade.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Bairro:</Label>
          <Controller
            name="bairro"
            control={control}
            rules={{ required: 'Bairro é obrigatório' }}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
              />
            )}
          />
          {errors.bairro && <ErrorMessage>{errors.bairro.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Logradouro:</Label>
          <Controller
            name="logradouro"
            control={control}
            rules={{ required: 'Logradouro é obrigatório' }}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
              />
            )}
          />
          {errors.logradouro && <ErrorMessage>{errors.logradouro.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Número:</Label>
          <Controller
            name="numero"
            control={control}
            rules={{ required: 'Número é obrigatório' }}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
              />
            )}
          />
          {errors.numero && <ErrorMessage>{errors.numero.message}</ErrorMessage>}
        </FormGroup>

        <ButtonGroup>
          <Button type="button" onClick={fechar}>
            Cancelar
          </Button>
          <Button type="submit" disabled={!isValid}>
            Concluir
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};


export default FormularioEndereco;