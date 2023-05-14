import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerMailingList = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MailingList, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly lastMessageSent?: string | null;
  readonly email?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMailingList = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MailingList, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly lastMessageSent?: string | null;
  readonly email?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type MailingList = LazyLoading extends LazyLoadingDisabled ? EagerMailingList : LazyMailingList

export declare const MailingList: (new (init: ModelInit<MailingList>) => MailingList) & {
  copyOf(source: MailingList, mutator: (draft: MutableModel<MailingList>) => MutableModel<MailingList> | void): MailingList;
}

type EagerPlant = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Plant, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly location?: string | null;
  readonly imageURL?: string | null;
  readonly lastWatered?: string | null;
  readonly nextWater?: string | null;
  readonly detailsURL?: string | null;
  readonly description?: string | null;
  readonly belongsTo?: string | null;
  readonly firstNotificationSentAt?: string | null;
  readonly waterIntervalDays?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPlant = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Plant, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly location?: string | null;
  readonly imageURL?: string | null;
  readonly lastWatered?: string | null;
  readonly nextWater?: string | null;
  readonly detailsURL?: string | null;
  readonly description?: string | null;
  readonly belongsTo?: string | null;
  readonly firstNotificationSentAt?: string | null;
  readonly waterIntervalDays?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Plant = LazyLoading extends LazyLoadingDisabled ? EagerPlant : LazyPlant

export declare const Plant: (new (init: ModelInit<Plant>) => Plant) & {
  copyOf(source: Plant, mutator: (draft: MutableModel<Plant>) => MutableModel<Plant> | void): Plant;
}