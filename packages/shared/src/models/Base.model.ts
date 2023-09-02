type TBaseModel = {
    createdAt: number;
    createdBy: string;
    updatedAt?: number;
    updatedBy?: string;
    deletedAt?: number;
    deletedBy?: string;
}

export default TBaseModel