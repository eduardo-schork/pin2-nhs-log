interface IBaseRepository<T> {
    findAll(): Promise<T[]>;
    findOne({ id }: { id: string }): Promise<T>;
    delete({ id }: { id: string }): Promise<void>;
    create({ data }: { data: T }): Promise<T>;
    update({ data }: { data: T }): Promise<T>;
}

export default IBaseRepository;
