import axios from 'axios';

describe("CT-39", () => {
    describe("GIVING the correct parameter to register an user", () => {
        it("SHOULD register the user and return sucess", async () => {
            // Arrange
            const url = "http://localhost:8000/api/admin/register";

            const query = new URLSearchParams({
                userName: "luizaaanurnberg",
                userCpf: "14255564975",
                userEmail: "nurnberluiza@gmail.com",
                userPassword: "123456789"
            });

            // Act
            const response = await axios.post(`${url}?${query}`);
            const fleet = response.data;

            // Assert
            expect(response.status).toBe(200);
            expect(fleet).toBeDefined();
        });
    });
});