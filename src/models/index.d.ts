import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type PlantMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
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
  readonly wateringPeriodHours?: number;
  readonly firstNotificationSentAt?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Plant, PlantMetaData>);
  static copyOf(source: Plant, mutator: (draft: MutableModel<Plant, PlantMetaData>) => MutableModel<Plant, PlantMetaData> | void): Plant;
}