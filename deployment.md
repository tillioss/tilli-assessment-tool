 # Deployment with Vercel

 This document describes how to deploy the Tilli Assessment Tool to Vercel, including Appwrite backend configuration.

 ## Prerequisites

 - A Vercel account (https://vercel.com/)
 - An Appwrite account and project (https://appwrite.io/)
 - The project's code hosted on GitHub, GitLab, or Bitbucket
 - (Optional) Vercel CLI installed globally via `npm install -g vercel`

 ## Appwrite Setup

 Before deploying, ensure your Appwrite backend is configured:

 1. In the Appwrite Console, create or select a project.
 2. Enable the Database service and create two collections:
    - **Participants**
    - **Assessments**
 3. In each collection's permissions, allow write access for anonymous users (e.g., set write roles to `role:any`).
 4. Note the following IDs to use in environment variables:
    - **Project ID**: under Project Settings → General.
    - **Database ID**: under Database → [Your Database] → Settings.
    - **Participants Collection ID**: under Database → [Your Database] → Participants → Settings.
    - **Assessments Collection ID**: under Database → [Your Database] → Assessments → Settings.
 5. Configure CORS origins:
    - Under Project Settings → API → CORS Origins, add:
      - `https://<your-vercel-project>.vercel.app`
      - `https://*.vercel.app`
 6. (Optional) If using a self-hosted Appwrite endpoint or different region, update the endpoint in `client.ts` at the project root:
    ```ts
    import { Client } from 'appwrite'

    const client = new Client()
    client
      .setEndpoint('https://<YOUR_APPWRITE_ENDPOINT>/v1')
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    ```

 ## 1. Deploy via Vercel Dashboard

 1. Go to the Vercel Dashboard: https://vercel.com/dashboard
 2. Click **New Project** and import your repository.
 3. Select your Git provider and authorize access.
 4. Verify the following settings under **Project Settings**:
    - **Framework Preset**: Next.js
    - **Root Directory**: `/`
    - **Build Command**: `npm run build`
    - **Output Directory**: (leave as default for Next.js)
 5. Click **Deploy**. The first build may take a few minutes.

 ## 2. Set Environment Variables

 In your Vercel project dashboard:

 1. Navigate to **Settings** → **Environment Variables**.
 2. Add the following variables (matching your Appwrite IDs):
    - `NEXT_PUBLIC_APPWRITE_PROJECT_ID`
    - `NEXT_PUBLIC_APPWRITE_DATABASE_ID`
    - `NEXT_PUBLIC_APPWRITE_PARTICIPANTS_COLLECTION_ID`
    - `NEXT_PUBLIC_APPWRITE_ASSESSMENTS_COLLECTION_ID`
 3. Provide values for each environment (Development, Preview, Production).

 ## 3. Deploy via Vercel CLI (Optional)

 ```bash
 # Install/update Vercel CLI
 npm install -g vercel

 # Log in (opens browser)
 vercel login

 # Deploy interactively
 vercel

 # Deploy directly to production
 vercel --prod
 ```

 ## 4. Continuous Deployment

 After connecting the repository, Vercel will automatically build and deploy on every push to the default branch (e.g., `main`).

 ## 5. Custom Domain (Optional)

 1. In the Vercel Dashboard, select your project and go to **Domains**.
 2. Click **Add**, enter your custom domain, and follow the DNS setup instructions.

 That's it! Your Next.js app should now be live on Vercel with Appwrite backend configured.