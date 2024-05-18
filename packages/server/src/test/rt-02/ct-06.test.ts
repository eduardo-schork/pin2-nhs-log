import LoginModel from "@/shared/src/models/Login.model";
import loginRepository from "../../shared/repositories/auth/login.repository";
import initializeDatabase from "../arrange/initialize-database";

describe("CT-06", () => {
    describe("GIVEN a user is successfully logged in", () => {
        it("SHOULD login the user successfully 'Usuário logado com sucesso'", async () => {
            // Arrange
            await initializeDatabase();

            const assertData: LoginModel = {
                email: "system@system.com",
                password: "system",
                createdAt: new Date(),
                createdBy: "admin",
            };

            // Act
            const userId = await loginRepository.authenticateUser(assertData.email, assertData.password);

            // Assert
            expect(userId).not.toBeNull(); 
        });
    });
});
