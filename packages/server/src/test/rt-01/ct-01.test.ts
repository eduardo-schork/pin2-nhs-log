import TUserModel from "@/shared/src/models/User.model";
import userRepository from "../../shared/repositories/user.repository";
import initializeDatabase from "../arrange/initialize-database";

describe("CT-01", () => {
    describe("GIVEN a user registration with an empty name field", () => {
        it("SHOULD throw an error with the message 'Erro. Os campos obrigatórios devem ser preenchidos!'", async () => {
            // Arrange
            await initializeDatabase();

            const assertData: TUserModel = {
                name: "", 
                cpf: "167.475.700-06",
                email: "mariaceciliaholler@gmail.com",
                password: "teste123",
                createdAt: new Date(),
                createdBy: "admin",
            };

            // Act
            const createPromise = userRepository.create({ data: assertData });

            // Assert
            await expect(createPromise).rejects.toThrow(
                "Erro. Os campos obrigatórios devem ser preenchidos corretamente!"
            );
        });
    });
});
