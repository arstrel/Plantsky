export const schema = {
    "models": {
        "Plant": {
            "name": "Plant",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "location": {
                    "name": "location",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "imageURL": {
                    "name": "imageURL",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "lastWatered": {
                    "name": "lastWatered",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                },
                "nextWater": {
                    "name": "nextWater",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                },
                "detailsURL": {
                    "name": "detailsURL",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "description": {
                    "name": "description",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "belongsTo": {
                    "name": "belongsTo",
                    "isArray": false,
                    "type": "AWSEmail",
                    "isRequired": false,
                    "attributes": []
                },
                "wateringPeriodHours": {
                    "name": "wateringPeriodHours",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "firstNotificationSentAt": {
                    "name": "firstNotificationSentAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Plants",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {},
    "nonModels": {},
    "version": "2c425f0b3a4b697a2a0710414f2095d5"
};