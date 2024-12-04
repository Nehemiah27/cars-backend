import * as fs from "fs";
import { v4 as uuid } from "uuid";
import { extname } from "path";
import multer from "multer";
import { addCarErrors, serverErrors } from "../constant/message.constant.js";
import path from "path";

const folderCheck = async () => {
  await accessFolder("audio");
  await accessFolder("video");
};

const accessFolder = async (folderName) => {
  try {
    await fs.promises.access(folderName);
  } catch (error) {
    if (error.code === "ENOENT")
      await fs.promises.mkdir(folderName, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const folder = file.fieldname === "audio" ? "audio" : "video";
    await folderCheck(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuid()}${extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedAudioExtensions = [".mp3", ".wav"],
      allowedVideoExtensions = [".mp4"],
      extension = extname(file.originalname).toLowerCase();

    if (
      (file.fieldname === "audio" &&
        !allowedAudioExtensions.includes(extension)) ||
      (file.fieldname === "video" &&
        !allowedVideoExtensions.includes(extension))
    ) {
      cb(new Error(`${file.fieldname} file type not allowed`));
    } else {
      cb(null, true);
    }
  },
}).fields([
  { name: "audio", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);

export const uploadHandler = async (req, res) => {
  return await new Promise((resolve) => {
    upload(req, res, async (err) => {
      if (err) {
        resolve({
          code: 400,
          message: serverErrors.INTERNAL_SERVER_ERROR,
        });
        return;
      }

      if (!req.files || !req.files.audio) {
        resolve({
          code: 400,
          message: addCarErrors.AUDIO_FILE_REQUIRED,
        });
        return;
      }

      const audioFile = req.files.audio[0],
        videoFile = req.files.video?.[0],
        audioPath = `/audio/${audioFile.filename}`;
      let videoPath = "";
      if (videoFile) videoPath = `/video/${videoFile.filename}`;
      resolve({
        code: 200,
        audioPath,
        videoPath,
      });
      return;
    });
  });
};

const fileDelete = (assetPath) => {
  fs.unlink(path.join(process.cwd(), assetPath), (err) => {});
};

const deleteFiles = (audioPath, videoPath) => {
  if (audioPath !== undefined && audioPath !== "") fileDelete(audioPath);
  if (videoPath !== undefined && videoPath !== "") fileDelete(videoPath);
};

export const respondWithDelete = (audioPath, videoPath, response) => {
  deleteFiles(audioPath, videoPath);
  return response;
};
