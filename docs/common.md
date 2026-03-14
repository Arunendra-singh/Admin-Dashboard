git reset --hard commitID
git push origin branchName --force
git add --renormalize .
git ls-files --eol
git config core.ignorecase false
git config core.autocrlf true


remove unwanted directories
git clean -d --dry-run
git clean -f -d