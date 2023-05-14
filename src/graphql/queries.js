/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMailingList = /* GraphQL */ `
  query GetMailingList($id: ID!) {
    getMailingList(id: $id) {
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
export const listMailingLists = /* GraphQL */ `
  query ListMailingLists(
    $filter: ModelMailingListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMailingLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        lastMessageSent
        email
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncMailingLists = /* GraphQL */ `
  query SyncMailingLists(
    $filter: ModelMailingListFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMailingLists(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        lastMessageSent
        email
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getPlant = /* GraphQL */ `
  query GetPlant($id: ID!) {
    getPlant(id: $id) {
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
export const listPlants = /* GraphQL */ `
  query ListPlants(
    $filter: ModelPlantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncPlants = /* GraphQL */ `
  query SyncPlants(
    $filter: ModelPlantFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPlants(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
