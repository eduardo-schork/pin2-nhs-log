import userRepository from "../../shared/repositories/user.repository";
import initializeDatabase from "../arrange/initialize-database";

describe("CT-08", () => {
    describe("GIVEN an existing user to update", () => {
        it("SHOULD update the user successfully", async () => {
            // Arrange
            await initializeDatabase();

            const userId = 2;
            const newUserData = {
                name: "Luiza",
                cpf: "16747570010",
                email: "nurnbergluiza@gmail.com",
            };

            // Act
            const updatedUser = await userRepository.updateUser(userId, newUserData.name, newUserData.cpf, newUserData.email);
  
            // Assert
            const { name, cpf, email } = updatedUser[1][0];
            expect({ name, cpf, email }).toEqual(newUserData);
        });
    });
});
