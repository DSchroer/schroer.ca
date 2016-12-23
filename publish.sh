hexo generate
gsutil -m cp -r public/* gs://schroer.ca
gsutil -m acl ch -r -u AllUsers:R gs://schroer.ca