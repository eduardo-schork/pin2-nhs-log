type TBaseModel = {
    createdAt: Date;
    createdBy: string;
    updatedAt?: Date;
    updatedBy?: string;
    deletedAt?: Date;
    deletedBy?: string;
};

export default TBaseModel;
