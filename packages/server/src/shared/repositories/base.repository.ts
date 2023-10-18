interface IBaseRepository<T> {
    findAll(): Promise<T[]>;
    findOne({ id }: { id: string }): Promise<T | null>;
    delete({ id }: { id: string }): Promise<boolean>;
    create({ data }: { data: T }): Promise<T>;
    update({ data }: { data: T }): Promise<T | null>;
}

export default IBaseRepository;
