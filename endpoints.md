### POST /game/create
Request:
```js
{
    "user_name": String
}
```
Response:
```js
{
    "channel_name": String,
    "user_id": String,
    "user_name": String,
    "is_admin": Boolean
}
```

### POST /game/join
Request:
```js
{
    "user_name": String,
    "channel_name": String
}
```

Response:
```js
{
    "channel_name": String,
    "user_id": String,
    "user_name": String,
    "creator_id": String
}
```

### POST /game/start


### /pusher/auth
Request:
```js
{
    "user_name": String,
    "channel_name": String
}
```

Response:
```js
{
    "auth": String,
    "channel_data": {
        "user_id": String,
        "user_info": {
            "user_name": String
        }
    }
}
```

### GET /game/{channel_name}/state
Response:
```js
{

}
```
