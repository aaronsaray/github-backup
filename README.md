# Github Backup Script

This is a script that backs up all of your OWNED repositories using `git clone` to a directory you specify.  The folder will contain a directory based off of
the current date with YYYY-MM-DD as the format.  It will use the `ssh_url` to clone, so you should have your ssh keys set up properly.  It only checks out/clones
the default branch.

## Usage

* clone to a directory locally `git clone git@github.com:aaronsaray/github-backup.git`
* `cd` into the directory
* Install NPM dependencies `npm install`
* Run the backup: `FOLDER=/home/aaron/backups GHTOKEN=yourAccessToken node run-backup.js`

### Creating a token

* Visit https://github.com/settings/tokens/new and create a new token.
  * No expiration (or anything you want)
  * Give it the top level `repo` status
