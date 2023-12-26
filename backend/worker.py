import redis
import time
import os
import subprocess
import psycopg2
import json

import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
# Create a Redis connection
redis_client = redis.StrictRedis(host='localhost', port=6379, db=0)

# Define the name of the queue
queue_name = 'pythonQueue'

def process_job(job_data):
    data=json.loads(job_data)
    if data["function"]=="transcode":
        transcode(data)
    elif data["function"]=="createtags":
        createtags(data)

def createtags(data):
    title=data['title']
    description=data['description']
    id=data['id']
    title_tokens = word_tokenize(title)
    desc_tokens = word_tokenize(description)

    # Combine tokens and convert to lowercase
    all_tokens = title_tokens + desc_tokens
    all_tokens = [token.lower() for token in all_tokens]

    # Remove stopwords (common words that do not carry much meaning)
    stop_words = set(stopwords.words('english'))
    filtered_tokens = [token for token in all_tokens if token.isalnum() and token not in stop_words]

    # Lemmatization to reduce words to their base or root form
    lemmatizer = WordNetLemmatizer()
    lemmatized_tokens = [lemmatizer.lemmatize(token) for token in filtered_tokens]

    # Remove duplicates
    unique_tokens = list(set(lemmatized_tokens))
    print(unique_tokens)
    updateTags(unique_tokens,id)

def updateTags(tags,id):
    db_paramas={
    'host':'localhost',
    'port':5432,
    'database':'VideoStreamer',
    'user':'postgres',
    'password':'postgres'
    }

    try:
        tags_array_str = "{" + ",".join(map(str, tags)) + "}"
        connection=psycopg2.connect(**db_paramas)
        cursor=connection.cursor()
        
        cursor.execute("update metadata set tags=%s where id=%s;",(tags_array_str,id,))
        connection.commit()
    except psycopg2.Error as e:
        print("Error connecting to PostgreSQL:", e)

    finally:
        if connection:
            cursor.close()
            connection.close()     


def transcode(data):
    id=data['id']
    filename=data['fileName']
    input_file_path = "uploads/videos/"+filename
    output_folder_path = "videos"
    start_time = time.time()
    print(input_file_path)
    print(os.path.exists(input_file_path))
    try:
        convert_to_mpd(input_file_path, output_folder_path,filename,id)
        print("Conversion successful. MPD file generated.")
    except Exception as e:
        print("Error:", e)
        exit()

    end_time = time.time()
    print(f"Time taken: {end_time - start_time:.2f} seconds")

def convert_to_mpd(input_file_path, output_folder_path,filename,id):
    # Ensure the output folder exists
    if not os.path.exists(output_folder_path):
        os.makedirs(output_folder_path)

    # Output file path for the MPD file
    filename = filename.rsplit('.', 1)[0]
    output_file_path = os.path.join(output_folder_path,filename+".mpd")

    # FFmpeg command to convert the MKV file to MPD format
    cmd = [
        "ffmpeg",
        "-i", input_file_path,
        "-c:v", "libx264",
        "-c:a", "aac",
        "-strict", "experimental",
        "-f", "dash",
        "-min_seg_duration", "2147",
        "-use_template", "1",
        "-use_timeline", "1",
        "-seg_duration", "2147",
        "-init_seg_name", "init-stream"+filename + "$RepresentationID$.m4s",
        "-media_seg_name", "chunk-stream"+filename+"$RepresentationID$-$Number%05d$.m4s",
        "-b:v", "800k",
        "-b:a", "64k",
        "-profile:v", "main",
        output_file_path,
    ]

    # Execute the FFmpeg command
    try:
        subprocess.run(cmd, check=True, stderr=subprocess.PIPE)
        updataVideoPath(filename+".mpd",id)
    except subprocess.CalledProcessError as e:
        raise RuntimeError(f"FFmpeg error: {e.stderr.decode()}") from e
    

def updataVideoPath(path,id):
    db_paramas={
    'host':'localhost',
    'port':5432,
    'database':'VideoStreamer',
    'user':'postgres',
    'password':'postgres'
    }

    try:
        connection=psycopg2.connect(**db_paramas)
        cursor=connection.cursor()

        cursor.execute("update metadata set videopath=%s where id=%s;",(path,id))
        connection.commit()
    except psycopg2.Error as e:
        print("Error connecting to PostgreSQL:", e)

    finally:
        if connection:
            cursor.close()
            connection.close()  
# Continuously check for jobs in the queue
while True:
    # Blocking pop from the left side of the queue
    job = redis_client.blpop(queue_name, timeout=0)
    
    if job:
        job_data = job[1].decode('utf-8')
        print("Picked the job",job_data)
        process_job(job_data)
    else:
        print("No jobs in the queue. Waiting for new jobs...")
# process_job("video-1703248642669.mp4")


# data={"title":"How to Build a 320 Crore Media Company from Scratch - Exact NUMBERS revealed",
#       "description":"""I'm Varun, and this is a show where we get really deep about the future of tech, entertainment and business. While other podcasts scratch the surface, I think it is important to meet the best people in their fields and go much deeper. 
# Today, we have an extraordinary guest with us, Shradha Sharma. An acclaimed Indian journalist and a visionary entrepreneur, Shradha is the heart and soul behind YourStory, a digital media platform that's reshaping narratives in India.
# Shradha's journey is more than just inspiring. Born into a middle-class family in Patna, Bihar, she chose a path less traveled. When founding YourStory in 2008, she had one goal: to shift the media's focus from the already successful to the underdogs, the self-made entrepreneurs who were fighting their way up.
# I have a special place in my heart for YourStory. It was Shradha and her team who covered my journey when I was embarking on my own startup adventure. They told my story when I was just starting out, at a time when I was, in many ways, a nobody. Now, YourStory has brought to light over 150,000 entrepreneurial stories. Which is just insane. 
# So, what are we waiting for? Let's dive into a conversation about the future of media and business with Shradha Sharma.""",
# "id":21}
# createtags(data)