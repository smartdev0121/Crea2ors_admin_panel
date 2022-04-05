# Running locally

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

# AWS setup for the frontend
The frontend, being a static site with static assets, can easily be served from an AWS S3 bucket configured for static website hosting. 
The benefits of this are:
- Easy deployment. 
- Resource friendly. 
- Caching can be done in CloudFront (not done but should be done for prod especially). 
- Decouples the implementation from SSL setup (**not done now but should be done in CloudFront**)

### S3 bucket setup
The staging bucket configured for web site hosting is `nfty-meta-frontend-staging`. This site is publicly accessible (read-only).
Public access is managed through a bucket policy (bucket details -> permissions -> bucket policy):
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::nfty-meta-frontend-staging/*"
        }
    ]
}
```

No other setup has been needed, nor done. 
However, what is needed to enable HTTPS access is a TLS certificate and a domain name. These should be configured in CloudFront and Route53.

# Continuous deployment
The site is configured to deploy automatically to the bucket when a new commit is done in branch `accept`. 
The pipeline implementation is done in `.circleci/config.yaml`.

The CircleCI pipeline os configured with these environment variables defined on the CircleCI project:
- AWS_ACC_ACCESS_KEY_ID - same as for the backend
- AWS_ACC_DEFAULT_REGION - same as for the backend
- AWS_ACC_SECRET_ACCESS_KEY - same as for the backend
- AWS_ACC_FRONTEND_BUCKET - the name of the S3 bucket where the site should be deployed
- AWS_ACC_NFTY_API_URL - the URL of the API. It's best to configure it here (and not hardcode it somewhere in the code) because it can easily be changed if the API is move and more importanly it allows the pipeline to be reused for production as well - just create different env vars.

# Accessing the frontend
The frontend can be accessed at http://nfty-meta-frontend-staging.s3-website.us-east-2.amazonaws.com/. 
Make sure to fill in all form fields (image is optional). 
