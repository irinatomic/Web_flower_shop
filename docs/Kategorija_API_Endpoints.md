## API Endpoints for Kategorija Table
Listed are the API endpoints used to interact with the Kategorija table in the database.

| Method      | Address                               |
|-------------|---------------------------------------|
| GET all     | http://localhost:9000/kategorija        |
| GET by id   | http://localhost:9000/kategorija/:id    |
| POST        | http://localhost:9000/kategorija        |
| PUT         | http://localhost:9000/kategorija/:id    |
| DELETE      | http://localhost:9000/kategorija/:id    |

### GET all

| Info    | Retrieves all data from the API.                            |
|---------|-------------------------------------------------------------|
| Returns | list: A list of all the data retrieved from the API.        |
| Raises  | APIError:  If there is an error while making the API call.  |
| Auth    | None                                                        |

### GET by id

| Info    | Retrieves data from the API based on the provided id.        |
|---------|--------------------------------------------------------------|
| Returns | object: The data retrieved from the API in JSON format.      |
| Raises  | APIError: If there is an error while making the API call.    |
| Auth    | None                                                         |

Returns:
```
{
  "id": 1,
  "naziv": "Buket"
}
```

### POST

| Info    | Creates a new kategorija object                              |
|---------|--------------------------------------------------------------|
| Returns | object: The created object in JSON format.                   |
| Raises  | APIError: If there is an error while making the API call.    |
| Auth    | Admin                                                        |

Request body:
```
{
  "naziv": "Test"
}
```

Reponse:
```
{
  "id": 3,
  "naziv": "Test"
}
```

### PUT

| Info    | Modifies an existing kategorija object whose id is in the params   |
|---------|--------------------------------------------------------------------|
| Returns | object: The modified object in JSON format.                        |
| Raises  | APIError: If there is an error while making the API call.          |
| Auth    | Admin                                                              |

Request body:
```
{
  "naziv": "Test_izmena"
}
```

Response:
```
{
  "id": 3,
  "naziv": "Test_izmena"
}
```

### DELETE

| Info    | Deletes kategorija object with the id given in request parameters. |
|---------|--------------------------------------------------------------------|
| Returns | object: The id of the deleted kategorija object.                   |
| Raises  | APIError: If there is an error while making the API call.          |
| Auth    | Admin                                                              |
