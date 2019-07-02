const data = {
                  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
                  messages: [
                    {
                      id: 1,
                      username: "Bob",
                      content: "Has anyone seen my marbles?",
                    },
                    {
                      id: 2,
                      username: "Anonymous",
                      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
                    },
                  ]
}

export default data;