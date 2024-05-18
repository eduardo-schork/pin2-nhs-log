import DatabasePort from "../../database.port";

import registerRepository from "../../../../shared/repositories/auth/register.repository";

async function createSystemUser() {
    try {
        await DatabasePort.connectDataBase();

        await registerRepository.registerAdmin(
            "system",
            "09046138950",
            "system@system.com",
            "system"
        );

        await registerRepository.registerAdmin(
            "luiza",
            "65890996002",
            "luiza@gmail.com",
            "teste123"
        );

        return null;
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        throw error;
    }
}

const execute = async () => {
    await createSystemUser();
};

export const SeedUser = { execute };
