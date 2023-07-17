import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import * as iam from 'aws-cdk-lib/aws-iam';

export class SampleCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'SampleCdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    // Create the IAM role
    const role = new iam.Role(this, 'LambdaMinconeS3BucketRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });

    // Attach the policy to the role
    role.addToPolicy(new iam.PolicyStatement({
      actions: ['s3:ListBucket'],
      resources: ['arn:aws:s3:::mincone*'],
    }));

    const fn = new lambda.Function(this, 'test-s3-function', {
      runtime: lambda.Runtime.PYTHON_3_10,
      handler: 's3.lambda_handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '/src')),
      role: role
    });
  }
}
