# Comments are writen by me for my better understanding, don't remove them in future
# 1. Use Node.js 18 Alpine as base image
FROM node:18-alpine AS base

# 2-7 dependency installation stage
# 2. Install dependencies only when needed
FROM base AS deps

# 3. apk: alpine's package manager, libc6-compat(not compact): adds compatibilty for glibc
RUN apk add --no-cache libc6-compat

# 4. set working directory inside the container
WORKDIR /app

# 5. install pnpm globally inside the container
RUN npm install -g pnpm

# 6. copy package.json and pnpm-lock.yaml to make sure cache is preserved if code changes but dependencies dont
COPY package.json pnpm-lock.yaml ./

# 7. install dependencies: --frozen-lockfile: fails if lockfile is out of sync. tldr: it is safer
RUN pnpm install --frozen-lockfile

# 8-12 build stage (each stage is a separate container; no shared layers)
# 8. rebuild the source code only when necessary
FROM base AS builder
WORKDIR /app

# 9. Install pnpm in build stage (each stage is a separate container; no shared layers)
RUN npm install -g pnpm

# 10. Copies already-installed node_modules from deps stage (saves time).
COPY --from=deps /app/node_modules ./node_modules

# 11. copy rest of the source code into the container
COPY . .

# ============== Environment variables for build stage only ==============
# The ARG directives make the following variables available to docker build --build-arg
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG OPENROUTER_API_KEY
ARG NEXT_PUBLIC_VAPI_PUBLIC_KEY
ARG NEXT_PUBLIC_HOST_URL
ARG NEXT_PUBLIC_SITE_URL

# The ENV directives make these available to Next.js during the build step (process.env in code)
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV OPENROUTER_API_KEY=$OPENROUTER_API_KEY
ENV NEXT_PUBLIC_VAPI_PUBLIC_KEY=$NEXT_PUBLIC_VAPI_PUBLIC_KEY
ENV NEXT_PUBLIC_HOST_URL=$NEXT_PUBLIC_HOST_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
# =======================================================================

# 12. build script as defined in package.json copying the environment variables for build, later while building the image they are neglected
# COPY .env.local ./
RUN pnpm run build

# 13-19  Production runner stage
# 13. this will run the app in production (smallest image as possible)
FROM base AS runner
WORKDIR /app

# ENV key=value

# create non-root user
# 14. adds a new user group nodejs  and user nextjs, this is good practice for security practices
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 15-17copy only whats needed for production
# 15. copy public folder (static assets) from the builder stage
COPY --from=builder /app/public ./public

# 16. set correct permission for prerender cache
# Creates .next folder and gives ownership to nextjs user (so app can write prerendered data at runtime).
RUN mkdir .next
RUN  chown nextjs:nodejs .next 

# 17. copy standalone build output
# Next.js creates a standalone server in .next/standalone.
# Copies that to the production image.
# Also copies .next/static, which contains static assets from the build.
# --chown=nextjs:nodejs ensures the copied files are owned by the non-root user.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 18- 20 security and runtime
# 18. switches from root to nextjs user
USER nextjs

# 19. listen to port 3000
EXPOSE 3000

# 20. Sets environment variables for the app to listen on all IPs (0.0.0.0)
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 21 health check
# HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
#     CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# 21. Start the server
CMD ["node", "server.js"]
