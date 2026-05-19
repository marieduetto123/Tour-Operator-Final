#!/bin/bash
# deploy.sh — commit, push to GitHub, and deploy to Vercel production
set -e

MSG="${1:-Update dashboard}"

git add .
git commit -m "$MSG

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
git push
vercel --prod --yes

echo ""
echo "✅ Pushed to GitHub: https://github.com/marieduetto123/Tour-Operator-Final"
echo "✅ Deployed to Vercel (see project dashboard for URL)"
