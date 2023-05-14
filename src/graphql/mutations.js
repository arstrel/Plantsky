/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMailingList = /* GraphQL */ `
  mutation CreateMailingList(
    $input: CreateMailingListInput!
    $condition: ModelMailingListConditionInput
  ) {
    createMailingList(input: $input, condition: $condition) {
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
export const updateMailingList = /* GraphQL */ `
  mutation UpdateMailingList(
    $input: UpdateMailingListInput!
    $condition: ModelMailingListConditionInput
  ) {
    updateMailingList(input: $input, condition: $condition) {
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
export const deleteMailingList = /* GraphQL */ `
  mutation DeleteMailingList(
    $input: DeleteMailingListInput!
    $condition: ModelMailingListConditionInput
  ) {
    deleteMailingList(input: $input, condition: $condition) {
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
export const createPlant = /* GraphQL */ `
  mutation CreatePlant(
    $input: CreatePlantInput!
    $condition: ModelPlantConditionInput
  ) {
    createPlant(input: $input, condition: $condition) {
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
export const updatePlant = /* GraphQL */ `
  mutation UpdatePlant(
    $input: UpdatePlantInput!
    $condition: ModelPlantConditionInput
  ) {
    updatePlant(input: $input, condition: $condition) {
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
export const deletePlant = /* GraphQL */ `
  mutation DeletePlant(
    $input: DeletePlantInput!
    $condition: ModelPlantConditionInput
  ) {
    deletePlant(input: $input, condition: $condition) {
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
