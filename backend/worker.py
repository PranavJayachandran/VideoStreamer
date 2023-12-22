import redis
import time
import os
import subprocess
import psycopg2
import json
# Create a Redis connection
redis_client = redis.StrictRedis(host='localhost', port=6379, db=0)

# Define the name of the queue
queue_name = 'pythonQueue'

def process_job(job_data):
    data=json.loads(job_data)
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
    filename = filename.rsplit('.mp4', 1)[0]
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
