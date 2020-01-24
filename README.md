# WIP: azf-svarut
Add descriptive description here...

### Letter endpoints
#### POST /letter -  Add letter to queue
Bla bla bla

Response:
```json
{
  "wip": true
}
```

#### GET /letter/***id*** - Get letter status
Response:
```json
{
  "wip": true
}
```

### Statistics endpoints
#### GET /stats - Gets statistics
Response:
```json
{
  "wip": true
}
```

#### GET /stats/***service*** - Gets statistics for service (eg. MinElev)
Response: 
```json
{
  "wip": true
}
```

# Getting started

1. Make sure to have [Azure Function Core tools](https://www.npmjs.com/package/azure-functions-core-tools) installed before we start.

2. Clone repo and install dependencies
```
$ git clone https://github.com/vtfk/azf-svarut.git
$ npm install
```

3. Add ***local.settings.json*** and replace the connection strings:
```json
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsStorage": "{AzureWebJobsStorage}",
    "COSMOS_CONNECTION": "mongodb://cosmosdb-connectionstring",
    "COSMOS_COLLECTION": "svarut-queue",
    "STORAGE_CONNECTION_URL": "https://blobstorage.url",
    "STORAGE_CONTAINER": "prod-svarut-letters",
    "SVARUT_URL": "https://svarut.ks.no",
    "SVARUT_USERNAME": "svarut_username",
    "SVARUT_PASSWORD": "svarut_password",
    "PAPERTRAIL_HOST": "logs.papertrailapp.com",
    "PAPERTRAIL_PORT": 1234,
    "PAPERTRAIL_HOSTNAME": "azf-svarut"
  }
}
```

4. Start local development server:
```
$ func start
```

# Deploy Azure Function

Using [Azure Function cli](https://www.npmjs.com/package/azure-functions-core-tools):
```
$ func azure functionapp publish azf-svarut
```