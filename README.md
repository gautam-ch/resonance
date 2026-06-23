# Resonance AI

A professional-grade AI Text-to-Speech (TTS) platform designed for high-quality voice synthesis and management.

## 🚀 Overview

Resonance is a modern, scalable platform that enables users to generate natural-sounding speech from text using advanced AI models. Built with a focus on multitenancy and performance, it provides a seamless interface for voice selection, audio generation, and organization management.

## ✨ Key Features

- **High-Fidelity TTS**: Generate audio with expressive AI voices including support for emotional cues.
- **Voice Management**: Browse and select from a library of system-managed and custom voices.
- **Multi-tenant Architecture**: Full support for organizations and teams via Clerk integration.
- **Real-time Recording**: Capture original audio directly in the browser for custom voice training.
- **Type-Safe API**: End-to-end type safety using tRPC and TypeScript.
- **Cloud-Native Storage**: Distributed audio storage leveraging Cloudflare R2/S3.
- **Scalable Inference**: Python-based TTS engine running on Modal for on-demand GPU compute.

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (App Router), [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query) & [tRPC](https://trpc.io/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Inference Layer**: [Python](https://www.python.org/) & [Modal](https://modal.com/)
- **Storage**: [Cloudflare R2](https://www.cloudflare.com/products/r2/) / S3
- **Billing**: [Polar](https://polar.sh/)

## 🏁 Getting Started

### Prerequisites

- Node.js (Latest LTS)
- PostgreSQL database
- Modal account (for TTS inference)
- Clerk account (for authentication)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd resonance
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (copy `.env.example` if available).

4. Initialize the database:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

## ⚙️ Environment Variables

Ensure the following variables are set in your `.env` file:

- `DATABASE_URL`: PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk public key
- `CLERK_SECRET_KEY`: Clerk private key
- `CHATTERBOX_API_URL`: URL for the Modal inference endpoint
- `CHATTERBOX_API_KEY`: Secret key for inference authentication
- `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`: Storage credentials

## 📄 License

Private / Proprietary. All rights reserved.
