# CL-Challenge
Code Challenge - Fetch GitHub user followers 3 deep

#Endpoint
 /users/:github_userId/followers

#Instructions

Clone the git Repo

```
git clone https://github.com/saade155/CL-Challenge.git
```

Install the package via npm.

```
npm install
```

Run the server

```
npm run dev
```

Access the endpoint locally passing in the desired girhub userid

```
localhost:8000/users/:github_userid/followers
```

This will formulate an object of the requested user and his first 5 followers, followers' first 5 followers, down to 3 deep.