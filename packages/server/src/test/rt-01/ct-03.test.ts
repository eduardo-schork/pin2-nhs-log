import userRepository from "../../shared/repositories/user.repository";
import initializeDatabase from "../arrange/initialize-database";

describe("CT-03", () => {
    describe("GIVEN a user is successfully registered", () => {
        it("SHOULD register the user successfully 'Usuário criado com sucesso'", async () => {
            // Arrange
            await initializeDatabase();

            const assertData = {
                name: "Luiza", 
                cpf: "16747570006",
                email: "nurnbergluiza@gmail.com",
                password: "teste123",
                createdAt: new Date(),
                createdBy: "admin",
            };

            // Act
            const createPromise = userRepository.create({ data: assertData });

            // Assert
            const expectedResult = expect.objectContaining({
                name: "Luiza", 
                cpf: "16747570006",
                email: "nurnbergluiza@gmail.com",
                password: "teste123",
                createdAt: expect.any(Date), 
                updatedAt: expect.any(Date),
            });

            await expect(createPromise).resolves.toEqual(expectedResult);
        });
    });
});
