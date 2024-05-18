import offerRepository from "../../shared/repositories/offer.repository";
import initializeDatabase from "../arrange/initialize-database";

describe("CT-24", () => {
    describe("GIVEN an existing offer to update", () => {
        it("SHOULD update the offer's status successfully", async () => {
            // Arrange
            await initializeDatabase();

            const assertData = {
                id: 2,
                quotationId: 4,
                status: "Aprovado",
            };

            // Act
            const updatedOffer = await offerRepository.update({
                // @ts-ignore
                data: assertData,
            });

            // Assert
            expect(updatedOffer?.status).toEqual(assertData.status);
        });
    });
});
