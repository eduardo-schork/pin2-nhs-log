import offerRepository from "../../shared/repositories/offer.repository";
import initializeDatabase from "../arrange/initialize-database";

describe("CT-23", () => {
    describe("GIVEN a quotation without an offer", () => {
        it("SHOULD return nothing'", async () => {
            // Arrange
            await initializeDatabase();

            const assertData = {
                id: 11,
            };

            // Act
            const offer = await offerRepository.findAllByQuotation(assertData.id);

            // Assert
            expect(offer).toBeDefined();
        });
    });
});
