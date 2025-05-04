// scripts/prisma-push.js

import { exec } from 'child_process'

exec('npx prisma generate && npx prisma db push', (err, stdout, stderr) => {
  if (err) {
    console.error(`❌ Prisma migration failed:\n${stderr}`)
    process.exit(1)
  }
  console.log(`✅ Prisma DB synced:\n${stdout}`)
})
