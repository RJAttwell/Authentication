Authentication Notes:

- As we are creating a web app for users to use, they will generate data.
- To associate that data with each individual user they must create an account. 
- Next time they come back onto the website, the can access that information.
- Authentication can also restrict access to certain part of the website.

Hashing:
- Before hand we had encrypted by using the Cipher method.
- Example: The password of 'qwerty', if we shift it by 1, the cipher text would be rvfsuz. Every letter has gone up by 1. A weak encryption system so we will now learn about hashing.
- Hashing removes the need for an encryption key. 
- We use the hash function to turn the password into a hash and store that in the database. It is almost impossible to turn a hash back into a password.

Salting:
- Generates a random set of characters 
- The characters along with the function gets combined and then put through the hash function. Increases complexity and characters. Makes it more secure.

- Salt rounds: Can salt the password and then run it through the hash functions. You can do this again. And again. Each time is a round.

- Makes password even more secure. 