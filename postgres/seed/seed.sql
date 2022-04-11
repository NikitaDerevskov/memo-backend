-- Seed data with a fake user for testing

insert into users (name, email, password, joined) values ('a', 'a@a.com', '$2a$10$WAK21U0LWl7C//jJ.DOB2uPP1DJQh7KUDgasdyQeGzkop2Pzl8W7u', '2022-03-29T21:47:37.232Z');

insert into folders (title, created, user_id) values ('How to', '2022-03-29T21:47:37.232Z', 1);
insert into folders (title, created, user_id) values ('Git', '2022-03-29T21:47:37.232Z', 1);

insert into cards (title, content, last_modified, folder_id) values ('How to do it?', 'It is easy.', '2022-03-29T21:47:37.232Z', 1);
insert into cards (title, content, last_modified, folder_id) values ('How to google?', 'Just google', '2022-03-29T21:47:37.232Z', 1);
insert into cards (title, content, last_modified, folder_id) values ('Git status, what it is?', 'Displays paths that have differences between the index file and the current HEAD commit, paths that have differences between the working tree and the index file, and paths in the working tree that are not tracked by Git (and are not ignored by gitignore(5)). The first are what you would commit by running git commit; the second and third are what you could commit by running git add before running git commit.', '2022-03-29T21:47:37.232Z', 2);
insert into cards (title, content, last_modified, folder_id) values ('Git commit', 'Create a new commit containing the current contents of the index and the given log message describing the changes. The new commit is a direct child of HEAD, usually the tip of the current branch, and the branch is updated to point to it (unless no branch is associated with the working tree, in which case HEAD is "detached" as described in git-checkout(1))', '2022-03-29T21:47:37.232Z', 2);

