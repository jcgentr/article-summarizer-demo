- [ ] if summary already exists for url, return existing db summary
- [ ] be able to chat with AI about article (may evolve to RAG)
- [ ] determine if the url is readable
- [ ] build tables and data analytics for articles
- [ ] limit how long the article can be
- [ ] add OG image next to title
- [ ] add filters
- [ ] add print button
- [ ] be able to configure summarization
- [ ] develop chrome extension for saving
- [ ] make summaries expandable
- [ ] read progress bar on side
- [ ] improve loading loads of summaries if necessary
- [ ] improve login and signup flow (verify email not intuitive)
- [ ] improve author parsing
- [ ] show tags
- [ ] search by tags

- [ ] theme switcher

- [x] scroll to top button
- [x] add basic client-side search
- [x] add user accounts and hook up to summaries
- [x] deploy on Vercel and Supabase
- [x] add ability to rate article after reading (1-5 stars)
- [x] switch from FastAPI and sqlite to next.js and supabase
- [x] deploy on fly.io
- [x] build simple frontend UI to connect this to
- [x] convert this to a FastAPI app
- [x] capture title and author if they exists

# SCHEMA

## Database Schema

| Column     | Type      | Description                      |
| ---------- | --------- | -------------------------------- |
| id         | integer   | Primary key                      |
| url        | string    | Article URL                      |
| content    | text      | Full article content             |
| summary    | text      | AI-generated summary             |
| tags       | string[]  | Article categories               |
| author     | string    | Article author                   |
| title      | string    | Article title                    |
| word_count | integer   | Total word count                 |
| has_read   | boolean   | Read status                      |
| rating     | integer   | User rating (0-5)                |
| created_at | timestamp | When the record was created      |
| updated_at | timestamp | When the record was last updated |
| user_id    | uuid      | Foreign key to users table       |

# The Goodreads for web articles?
