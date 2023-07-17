import json
import boto3

def lambda_handler(event, context):
    s3 = boto3.resource('s3')
    bucket = s3.Bucket('mincone')
    
    size = sum(1 for _ in bucket.objects.all())
    
    print(f'Bucket size: {size}')

    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
