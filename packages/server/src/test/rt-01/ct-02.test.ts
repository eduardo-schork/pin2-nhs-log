import TUserModel from "@/shared/src/models/User.model";
import userRepository from "../../shared/repositories/user.repository";
import initializeDatabase from "../arrange/initialize-database";

describe("CT-02", () => {
    describe("GIVEN a user registration with an invalid CPF field", () => {
        it("SHOULD throw an error with the message 'Erro. CPF inválido!'", async () => {
            // Arrange
            await initializeDatabase();

            const assertData: TUserModel = {
                name: "Luiza", 
                cpf: "096",
                email: "nurnbergluiza@gmail.com",
                password: "teste123",
                createdAt: new Date(),
                createdBy: "admin",
            };

            // Act
            const createPromise = userRepository.create({ data: assertData });

            // Assert
            await expect(createPromise).rejects.toThrow(
                "Erro. CPF inválido!"
            );
        });
    });
});
