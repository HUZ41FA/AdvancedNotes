# Advanced Notes + AWS

AdvancedNotes an intuitive notes application built using TypeScript and ReactJS, powered by Vite for blazing-fast performance.

## Architectural Diagram
![Architecture Diagram](./public/ArchitectureDiagram.png)

## Technologies Used:

-   **TypeScript**: Ensures type safety and cleaner codebase.
-   **ReactJS**: Provides a dynamic and interactive user interface.
-   **Vite**: Lightning-fast development and production builds.
-   **Amazon Web Services**: Cloud Service Provider.


## Markdown Support:

AdvancedNotes supports Markdown, allowing you to:

-   Format text with ease using Markdown syntax.
-   Create headings, lists, code blocks, and more.


## Getting Started:

To run the app locally, follow these steps:

1.  Clone the repository: `https://github.com/HUZ41FA/AdvancedNotes.git`
2.  Install dependencies: `npm install`
3.  Start the development server: `npm run dev`


## Steps To Deploy on AWS:

1. Create a bucket in S3:
```
aws s3api create-bucket --bucket <your-bucket-name>
```

2. Build your project:
```
npm run build
```

3. Upload the build files to s3 bucket:
```
aws s3 cp ./dist s3://<your-bucket-name>/ --recursive
```

4. Enable static hosting on your S3 bucket:
```
aws s3 website s3://<your-bucket-name> --index-document index.html
```

5. Create a public hosted zone in Route53:
```
aws route53 create-hosted-zone --name <domain-name> --caller-reference <a-unique-string>
```