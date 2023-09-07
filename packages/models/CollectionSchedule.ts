import Address from './Address';

interface CollectionSchedule {
  pk_collection_schedule: number;
  cs_schedule_date: Date;
  cs_comment: string | null;
  fk_collection_address: number;
  collectionAddress: Address;
}

export default CollectionSchedule;
