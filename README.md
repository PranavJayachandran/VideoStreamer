# VideoStreamer

## Overview

VideoStreamer as the name suggests is a video streaming app that lets users upload, view and react to videos

![Untitled Diagram (1)](https://github.com/PranavJayachandran/VideoStreamer/assets/77000606/2a117e3b-f676-42a3-a1dc-71462d19fa5a)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/PranavJayachandran/VideoStreamer.git
   ```

2. Navigate to the frontend folder:

   ```bash
   cd VideoStreamer/frontend
   ```

3. Install frontend dependencies:

   ```bash
   npm install
   ```

4. Start the frontend development server:

   ```bash
   npm run dev
   ```

5. Open a new terminal window, navigate to the backend folder, and repeat steps 2-4 for the backend( have tyscript installed before the running the backend).

## Tables
### Channel
| Field     | Type          | Constraints               |
|-----------|---------------|---------------------------|
| id        | INT           | PRIMARY KEY, AUTO_INCREMENT|
| owner     | TEXT          | NOT NULL                  |
| member    | TEXT          | NOT NULL                  |

### Comments
| Field      | Type          | Constraints               |
|------------|---------------|---------------------------|
| id         | INT           | PRIMARY KEY, AUTO_INCREMENT|
| comment    | TEXT          | NOT NULL                  |
| user_id    | INT           | NOT NULL                  |
| video_id   | INT           | NOT NULL                  |
| comment_id | INT           | NULL                      |

### Dislikes
| Field   | Type  | Constraints               |
|---------|-------|---------------------------|
| id      | INT   | PRIMARY KEY, AUTO_INCREMENT|
| user_id | INT   | NOT NULL                  |
| video_id| INT   | NOT NULL                  |

### Likes
| Field   | Type  | Constraints               |
|---------|-------|---------------------------|
| id      | INT   | PRIMARY KEY, AUTO_INCREMENT|
| user_id | INT   | NOT NULL                  |
| video_id| INT   | NOT NULL                  |

### Metadata
| Field                   | Type          | Constraints               |
|-------------------------|---------------|---------------------------|
| id                      | INT           | PRIMARY KEY, AUTO_INCREMENT|
| thumbnail               | TEXT          | NOT NULL                  |
| user_id                 | INT           | NOT NULL                  |
| description             | TEXT          |                           |
| title                   | TEXT          | NOT NULL                  |
| originalVideoStoragePath| TEXT          |                           |
| videoPath               | TEXT          | NOT NULL                  |
| tags                    | TEXT          |                           |

### Users
| Field     | Type          | Constraints               |
|-----------|---------------|---------------------------|
| id        | INT           | PRIMARY KEY, AUTO_INCREMENT|
| username  | TEXT          | NOT NULL                  |
| password  | TEXT          | NOT NULL                  |


## Services
### Transcoding Service
Written in python it uses ffmpeg to convert the recieved video file into mpd format and writes the name of the mpd file into the metadata table

### Tags Generator Service
Written in python,the script utilizes the NLTK library for tokenization, stopword removal, and lemmatization to extract meaningful tags from video titles and descriptions

### Todo
- [x] Add all the interfaces in the frontend to one file.
- [ ] Improve the login auth.
- [ ] Customise the videoPlayer.
- [ ] Add notifications feature for new upload by joined channels.
- [ ] Add video recommendations in the video Screen (currently shows "something will comeback").
- [ ] Encrypt the password before storing.
