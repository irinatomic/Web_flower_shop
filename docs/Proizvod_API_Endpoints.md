## API Endpoints for Proizvod Table
Listed are the API endpoints used to interact with the Proizvod table in the database.

| Method      | Address                                         |
|-------------|-------------------------------------------------|
| GET all     | http://localhost:9000/proizvod                  |
| GET by id   | http://localhost:9000/proizvod/:id              |
| POST        | http://localhost:9000/proizvod                  |
| PUT         | http://localhost:9000/proizvod/:id              |
| PUT         | http://localhost:9000/proizvod/promeni-cenu/:id |
| DELETE      | http://localhost:9000/proizvod/:id              |

### GET all

| Info    | Retrieves all data from the API.                            |
|---------|-------------------------------------------------------------|
| Returns | list: A list of all the data retrieved from the API.        |
| Raises  | APIError:  If there is an error while making the API call.  |

### GET by id

| Info    | Retrieves data from the API based on the provided id.        |
|---------|--------------------------------------------------------------|
| Returns | object: The data retrieved from the API in JSON format.      |
| Raises  | APIError: If there is an error while making the API call.    |

Returns:
```
{
  "id": 1,
  "naziv": "Midnight boquet",
  "opis": "Midnight buket stvara tramnu i misterioznu atmosferu - 10 astromerija",
  "cena": 1200,
  "kategorija_id": 1,
  "cvetovi": [
    {
      "id": 1,
      "kolicina": 10,
      "cvet_id": 7,
      "proizvod_id": 1,
      "Cvet": {
        "id": 7,
        "naziv": "Astromerija"
      }
    }
  ],
  "kategorija": {
    "id": 1,
    "naziv": "Buket"
  }
}
```

### POST

| Info    | Creates a new Proizvod object                                |
|---------|--------------------------------------------------------------|
| Returns | object: The created object in JSON format.                   |
| Raises  | APIError: If there is an error while making the API call.    |

Request body:
```
{
  "naziv": "Testni",
  "opis": "Opis test",
  "kategorija": "1",
  "cena": "500",
  "sadrzaj": {
    "1": "5",
    "9": "4",
    "11": "3"
  }
}
```

Response:
```
[
  {
    "id": 4,
    "opis": "Opis test",
    "cena": "500",
    "kategorija_id": "1",
    "naziv": "Testni"
  },
  true
]
```

### PUT

| Info    | Modifies an existing Proizvod object whose id is in the params   |
|---------|------------------------------------------------------------------|
| Returns | object: The modified object in JSON format.                      |
| Raises  | APIError: If there is an error while making the API call.        |

Request body:
```
{
  "naziv": "Testni",
  "opis": "Opis test - izmena",
  "kategorija": "1",
  "cena": "500",
  "sadrzaj": {
    "11": "3"
  }
}
```

Response:
```
{
  "id": 4,
  "naziv": "Testni",
  "opis": "Opis test - izmena",
  "cena": "500",
  "kategorija_id": "1"
}
```

### PUT promeni-cenu

| Info    | Modifies price of an existing Proizvod object whose id is in the params   |
|---------|---------------------------------------------------------------------------|
| Returns | object: The modified object in JSON format.                               |
| Raises  | APIError: If there is an error while making the API call.                 |

Request body:
```
{
    "cena": "100"
}
```

### DELETE

| Info    | Deletes Proizvod object with the id given in request parameters. |
|---------|------------------------------------------------------------------|
| Returns | object: The id of the deleted proizvod object.                   |
| Raises  | APIError: If there is an error while making the API call.        |
