import FleetVehicle from "../models/FleetVehicle";

class FleetVehicleRepo {
    async create(modal: string, cpfDriver: string, plate: string, revam: string): Promise<boolean> {
        try {
            await FleetVehicle.bulkCreate([
                {
                    fv_modal: modal,
                    fv_plate: plate,
                    fv_cpf_driver: cpfDriver,
                    fv_revam: revam
                }
            ]);
            return true;
        } catch (error) {
            return false;
        }
    }

    // delete(params: any): Promise<void> {
    //     try {
    //         throw new Error("Method not implemented.");
    //     } catch (error) {
            
    //     }
    // }

    // update(params: any): Promise<any> {
    //     try {
    //         throw new Error("Method not implemented.");
    //     } catch (error) {
            
    //     }
    // }

    // findById(params: any): Promise<any> {
    //     try {
    //         throw new Error("Method not implemented.");
    //     } catch (error) {
            
    //     }
    // }

    // findAll(params: any): Promise<any> {
    //     try {
    //         throw new Error("Method not implemented.");
    //     } catch (error) {
            
    //     }
    // }
    
}

export default new FleetVehicleRepo();