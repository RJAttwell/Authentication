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

Cookies:
- Example:
    - Browser makes GET request to server.
    - Server makes a response (sends JS, CSS, HTML files to display website, etc.)
    - Browser makes an action (POST request) that in turn causes a response from the server in which the server creates a cookie.
    - Server sends cookie and tells browser to save it. 
    - Next time the browser makes a GET request to that server, it sends along the cookie for the server to remember the action that was made.

Sessions: 
- A session is the amount of time in which the browser and server are in engagement. 

- Session begins at log in and ends at log out.

Passport.JS:
- Will use these NPM packages:
    - passport
    - passport-local
    - passport-local-mongoose
    - express-session 

OAuth:
- Can delegate task of encryption and adding extra security to google/facebook/etc.
- Can have users sign in using Google/Facebook/Twitter
- Can request certain information from user's google account and also read/read + write access. 
- OAuth will allow users to revoke our website's access via a third party website.
- OAuth makes it so users will log in on the third party website they trust such as google/facebook and then accepts or refuses permissions that our website asks for.

- Auth code is like a ticket to gain access once. An Access Token is like a year pass that allows us to access information that is stored on that third party website.