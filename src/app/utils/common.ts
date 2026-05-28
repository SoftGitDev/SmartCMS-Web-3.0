import { ResponseKeywordItem } from "../types/administrator";
import toastNotify from "./tostNotify";

var CryptoJS = require("crypto-js");
var secretkey = process.env.REACT_APP_CRYPTO_SECRET_KEY;

// Data encDataa
export const encData = (data: any) => {
  const SECRET_KEY = process.env.REACT_APP_ENC_KEY;
  const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};
// dcypt to access token, refresh token and user data
const decryptingData = () => {
  var userBytes = CryptoJS.AES.decrypt(
    sessionStorage.getItem("_user_"),
    secretkey,
  );
  var decryptedUserData = JSON.parse(userBytes.toString(CryptoJS.enc.Utf8));

  var tokenBytes = sessionStorage.getItem("_token_")
    ? CryptoJS.AES.decrypt(sessionStorage.getItem("_token_"), secretkey)
    : null;

  var decryptedToken =
    tokenBytes && JSON.parse(tokenBytes.toString(CryptoJS.enc.Utf8));

  return { decryptedUserData, decryptedToken };
};

// here set user data and store value in session storage
export const setLocalToken = (val: any) => {
  var cipherUserText = CryptoJS.AES.encrypt(
    JSON.stringify(val),
    secretkey,
  ).toString();
  return sessionStorage.setItem("_token_", cipherUserText);
};

export const getUserData = () => {
  try {
    const { decryptedUserData } = decryptingData();
    return decryptedUserData;
  } catch (error) {
    return null;
  }
};

export const getToken = () => {
  try {
    const { decryptedToken } = decryptingData();
    return decryptedToken;
  } catch (error) {
    return null;
  }
};

export function debounce(func: any, delay: any) {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

// here set user data and store value in session storage
export const setLocalUserData = (val: any) => {
  try {
    var cipherUserText = CryptoJS.AES.encrypt(
      JSON.stringify(val),
      secretkey,
    ).toString();
    return sessionStorage.setItem("_user_", cipherUserText);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export function base64ToFile(base64: string, filename: string) {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

// Compress image method - supports PNG, JPEG, WebP
export const imageCompress = (
  file: File,
  targetSizeKB = 500,
  maxWidth = 1920,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      return reject(new Error("Not an image file"));
    }

    const reader = new FileReader();

    reader.onload = (event: any) => {
      const img = new Image();

      img.onload = async () => {
        try {
          const sizeInKB = file.size / 1024;

          // If already under target size, return as is
          if (sizeInKB <= targetSizeKB) {
            const base64 = await converToBase64(file);
            resolve(base64 as string);
            return;
          }

          // Determine output format
          // PNG doesn't support quality parameter, so convert to JPEG if compression is needed
          let outputFormat = file.type;
          if (file.type === "image/png" || file.type === "image/gif") {
            outputFormat = "image/jpeg"; // Convert PNG/GIF to JPEG for better compression
          }

          let quality = 0.9;
          let canvas = document.createElement("canvas");
          let compressedBase64: string;
          let compressedFile: File;
          let compressedSizeKB: number;
          let attempts = 0;
          const maxAttempts = 15;

          // Calculate dimensions maintaining aspect ratio
          let width = img.width;
          let height = img.height;

          // If image is too large, scale it down first
          if (width > maxWidth) {
            const scale = maxWidth / width;
            width = maxWidth;
            height = height * scale;
          }

          do {
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d");
            if (!ctx) {
              reject(new Error("Failed to get canvas context"));
              return;
            }

            // For PNG transparency, fill with white background
            if (file.type === "image/png" && outputFormat === "image/jpeg") {
              ctx.fillStyle = "#FFFFFF";
              ctx.fillRect(0, 0, width, height);
            }

            // Clear canvas and draw image
            ctx.drawImage(img, 0, 0, width, height);

            // Convert to base64 with current quality
            compressedBase64 = canvas.toDataURL(outputFormat, quality);
            compressedFile = base64ToFile(
              compressedBase64,
              file.name.replace(
                /\.[^/.]+$/,
                outputFormat === "image/jpeg" ? ".jpg" : ".png",
              ),
            );
            compressedSizeKB = compressedFile.size / 1024;

            // If still too large, reduce quality or dimensions
            if (compressedSizeKB > targetSizeKB) {
              if (quality > 0.4) {
                // Reduce quality
                quality -= 0.1;
              } else {
                // If quality is already low, reduce dimensions
                width = Math.floor(width * 0.85);
                height = Math.floor(height * 0.85);
                quality = 0.9; // Reset quality when changing dimensions
              }
            }

            attempts++;
          } while (
            compressedSizeKB > targetSizeKB &&
            attempts < maxAttempts &&
            width > 100
          );

          // Final check
          if (compressedSizeKB > targetSizeKB) {
            toastNotify(
              `Unable to compress image below ${targetSizeKB}KB. Current size: ${compressedSizeKB.toFixed(2)}KB`,
              "error",
            );
            reject(
              new Error(`Image too large: ${compressedSizeKB.toFixed(2)}KB`),
            );
            return;
          }

          console.log(
            `Compressed from ${sizeInKB.toFixed(2)}KB to ${compressedSizeKB.toFixed(2)}KB`,
          );
          resolve(compressedBase64);
        } catch (error) {
          console.error("Compression error:", error);
          reject(error);
        }
      };

      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = event.target.result;
    };

    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};

// here a common use for this function to covert files in base64 format
export const converToBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = reject;
  });
};

export function checkImageMimeType(reader: any) {
  var arr = new Uint8Array(reader.result).subarray(0, 4);
  var header = "";
  var realMimeType;
  for (var i = 0; i < arr.length; i++) {
    header += arr[i].toString(16);
  }

  switch (header) {
    case "89504e47":
      realMimeType = "image/png";
      break;
    case "ffd8ffDB":
    case "ffd8ffe0":
    case "ffd8ffe1":
    case "ffd8ffe2":
    case "ffd8ffe3":
    case "ffd8ffe8":
      realMimeType = "image/jpeg";
      break;
    default:
      realMimeType = "unknown"; // Or you can use the blob.type as fallback
      break;
  }
  return realMimeType;
}


// remove login section
export const removeLoginSession = () => {
    sessionStorage.removeItem("_user_");
    sessionStorage.removeItem("_token_");
    sessionStorage.removeItem("reloadflag");
};



//JSON FLATTNER 

export function extractKeywordsFromTemplate(templateString: string, stepNumber: number): ResponseKeywordItem[] {
    try {
        let jsonReady = templateString.replace(/{{[#/^][^}]+}}/g, '');
        jsonReady = jsonReady.replace(/"{{([^}]+)}}"/g, '"value"');
        jsonReady = jsonReady.replace(/}\s*{/g, '},{');
        const cleanPayload = JSON.parse(jsonReady);
        return extractResponseKeywords(cleanPayload, stepNumber);
    } catch (error) {
        console.error("Failed to parse template JSON:", error);
        return [];
    }
}

// Your existing function remains exactly the same to handle the pathing
function extractResponseKeywords(payload: any, stepNumber: number): ResponseKeywordItem[] {
    if (!payload || typeof payload !== "object") return [];
    const result: ResponseKeywordItem[] = [];

    function walk(value: any, path: string[] = [], leafKey: string = "") {
        if (Array.isArray(value)) {
            value.forEach((item) => walk(item, [...path], leafKey));
            return;
        }
        if (value !== null && typeof value === "object") {
            Object.keys(value).forEach((key) => {
                walk(value[key], [...path, key], key);
            });
            return;
        }
        if (leafKey) {
            const prefixPath = path.slice(0, -1);
            const pathString = prefixPath.length > 0 ? `.${prefixPath.join('.')}` : "";
            result.push({
                rawKey: leafKey,
                replaceKey: `{{#step${stepNumber}${pathString}}}{{${leafKey}}}{{/step${stepNumber}${pathString}}}`
            });
        }
    }

    walk(payload);
    return result.filter((v, i, a) =>
        a.findIndex(t => t.replaceKey === v.replaceKey) === i
    );
}

