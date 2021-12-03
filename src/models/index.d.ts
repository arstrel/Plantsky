import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type MailingListMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PlantMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class MailingList {
  readonly id: string;
  readonly lastMessageSent?: string;
  readonly email?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<MailingList, MailingListMetaData>);
  static copyOf(source: MailingList, mutator: (draft: MutableModel<MailingList, MailingListMetaData>) => MutableModel<MailingList, MailingListMetaData> | void): MailingList;
}

export declare class Plant {
  readonly id: string;
  readonly name?: string;
  readonly location?: string;
  readonly imageURL?: string;
  readonly lastWatered?: string;
  readonly nextWater?: string;
  readonly detailsURL?: string;
  readonly description?: string;
  readonly belongsTo?: string;
  readonly firstNotificationSentAt?: string;
  readonly waterIntervalDays?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Plant, PlantMetaData>);
  static copyOf(source: Plant, mutator: (draft: MutableModel<Plant, PlantMetaData>) => MutableModel<Plant, PlantMetaData> | void): Plant;
}