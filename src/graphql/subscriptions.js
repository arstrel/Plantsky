/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMailingList = /* GraphQL */ `
  subscription OnCreateMailingList(
    $filter: ModelSubscriptionMailingListFilterInput
  ) {
    onCreateMailingList(filter: $filter) {
      id
      lastMessageSent
      email
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateMailingList = /* GraphQL */ `
  subscription OnUpdateMailingList(
    $filter: ModelSubscriptionMailingListFilterInput
  ) {
    onUpdateMailingList(filter: $filter) {
      id
      lastMessageSent
      email
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteMailingList = /* GraphQL */ `
  subscription OnDeleteMailingList(
    $filter: ModelSubscriptionMailingListFilterInput
  ) {
    onDeleteMailingList(filter: $filter) {
      id
      lastMessageSent
      email
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreatePlant = /* GraphQL */ `
  subscription OnCreatePlant($filter: ModelSubscriptionPlantFilterInput) {
    onCreatePlant(filter: $filter) {
      id
      name
      location
      imageURL
      lastWatered
      nextWater
      detailsURL
      description
      belongsTo
      firstNotificationSentAt
      waterIntervalDays
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdatePlant = /* GraphQL */ `
  subscription OnUpdatePlant($filter: ModelSubscriptionPlantFilterInput) {
    onUpdatePlant(filter: $filter) {
      id
      name
      location
      imageURL
      lastWatered
      nextWater
      detailsURL
      description
      belongsTo
      firstNotificationSentAt
      waterIntervalDays
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeletePlant = /* GraphQL */ `
  subscription OnDeletePlant($filter: ModelSubscriptionPlantFilterInput) {
    onDeletePlant(filter: $filter) {
      id
      name
      location
      imageURL
      lastWatered
      nextWater
      detailsURL
      description
      belongsTo
      firstNotificationSentAt
      waterIntervalDays
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
