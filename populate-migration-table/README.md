## Populate Migration Table

Script to populate a dynamodb table for the purpose of migrating users.

### Usage

Create a `users.json` file in the root directory. This should be in the format of:
```
[
    {
        "email": "email1@mail.com",
        "uid": "legacy_uid_1"
    },
    {
        "email": "email2@mail.com",
        "uid": "legacy_uid_2
    }
]
```

Setup your AWS profiling. You can change the line in `package.json` from `AWS_PROFILE=profile` to whatever your profile name is.

Run `yarn && yarn start`