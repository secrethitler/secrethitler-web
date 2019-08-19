name: `game_start`
channel: private ??
data:
```js
{
    role: 'liberal|fascist|hitler',
    // null if liberal
    party_members: null | [
        {
            user_id: String,
            role: 'fascist|hitler'
        },
        {
            user_id: String,
            role: 'fascist|hitler'
        },
    ]
}
```

name: `new_president`  
channel: global  
data:
```js
{
    // User ID of new president.
    user_id: String
}
```

name: `chancellor_nominated`  
channel: global  
data:
```js
{
    // User ID of nominated chancellor.
    user_id: String
}
```

name: `chancellor_vote`  
channel: global  
data:
```js
{
    yes: Number,
    no: Number
}
```

name: `chancellor_vote_result`
channel: global
data:
```js
{
    votes: [
        {
            user_id: String,
            voted_yes: Boolean
        },
        ...
    ]
}
```

name: `president_pick_policy`  
channel: private  
data:
```js
{
    policies: [
        'liberal',
        'fascist',
        'fascist'
    ]
}
```

name: `chancellor_pick_policy`  
channel: private  
data:
```js
{
    policies: [
        'liberal',
        'fascist'
    ]
}
```

name: `policy_enacted`  
channel: global  
data:
```js
{
    policy: 'liberal|fascist'
}
```
