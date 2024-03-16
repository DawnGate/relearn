# Backend api for eCommerce website (in simple version)

# techs:

- nodejs
- mongodb
- express
- jwt

# Note

idea from https://github.com/navdeep1676/digitic-backend

# Something I learned and still don't know

First:

- It not have [LOG_MIDDLEWARE] to log action from user and tracking error when occur
- It not have correct [RESPONSE_STATUS_CODE] for user know something wrong, and frontend can know something to show for user
- Have many security problem in this source code @@
- Error not throw for correct
- router structure not good, if not maintain good will make confuse ex: if /user/:id put above /user/wishlist -> the wishlist will never reach, and occur problem
