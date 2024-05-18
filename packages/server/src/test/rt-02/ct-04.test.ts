import LoginModel from "@/shared/src/models/Login.model";
import loginRepository from "../../shared/repositories/auth/login.repository";
import initializeDatabase from "../arrange/initialize-database";

describe("CT-04", () => {
    describe("GIVEN a user login with empty fields", () => {
        it("SHOULD throw an error with the message 'Erro. Os campos obrigatórios devem ser preenchidos!'", async () => {
            // Arrange
            await initializeDatabase();

            const assertData: LoginModel = {
                email: "",
                password: "",
                createdAt: new Date(),
                createdBy: "admin",
            };

            // Act
            const createPromise = loginRepository.authenticateUser(assertData.email, assertData.password);

            // Assert
            await expect(createPromise).rejects.toThrow(
                "Erro. Os campos obrigatórios devem ser preenchidos corretamente!"
            );
        });
    });
});
