import { createConnection } from 'typeorm';
import { Users } from './users'; 

async function main() {
  try {
    const connection = await createConnection();
    await connection.synchronize(); 
    await connection.getRepository(Users).save(new Users()); 

    console.log('Tabela User criada');
  } catch (error) {
    console.error('Erro ao criar', error);
  }
}

main();
