import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
   region: "default",
   endpoint: 'https://storage.iran.liara.space',
   credentials: {
      accessKeyId: 'o6gp10fdbnb278q5',
      secretAccessKey: 'ca833e6c-e95a-4069-b8a0-844298ae8b91',
   },
});

export async function s3UploadAction(data) {
   const file = data.get("file");
   if (!file) throw new Error("no file");
   const bytes = await file.arrayBuffer();
   const buffer = Buffer.from(bytes);

   const supImage = `${Date.now()}_${file.name}`;

   const params = {
      Body: buffer,
      Bucket: process.env.LIARA_BUCKET_NAME,
      Key: supImage,
   };

   try {
      await s3.send(new PutObjectCommand(params));
      return {
         success: true,
         imagePath: `https://sup.storage.iran.liara.space/${supImage}`,
      };
   } catch (error) {
      return {
         error,
      };
   }
}
