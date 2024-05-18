import LoginModel from "@/shared/src/models/Login.model";
import loginRepository from "../../shared/repositories/auth/login.repository";
import initializeDatabase from "../arrange/initialize-database";

describe("CT-05", () => {
    describe("GIVEN a user login with invalid fields", () => {
        it("SHOULD throw an error with the message 'Erro. Usuário não encontrado!'", async () => {
            // Arrange
            await initializeDatabase();

            const assertData: LoginModel = {
                email: "nurnbergluiza@gmail.com",
                password: "teste",
                createdAt: new Date(),
                createdBy: "admin",
            };

            // Act
            const createPromise = loginRepository.authenticateUser(assertData.email, assertData.password);

            // Assert
            await expect(createPromise).rejects.toThrow(
                "Erro. Usuário não encontrado!"
            );
        });
    });
});
