const crypto = require("crypto");
const algorithm = "aes-192-cbc"; //algorithm to use

exports.encryptNik = (text) => {
  const password = "nik";
  const key = crypto.scryptSync(password, "docpro", 24);
  const iv = Buffer.alloc(16, 0);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
  return encrypted;
};
exports.encryptTtl = (text) => {
  const password = "ttl";
  const key = crypto.scryptSync(password, "docpro", 24);
  const iv = Buffer.alloc(16, 0);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
  return encrypted;
};
exports.encryptAlamat = (text) => {
  const password = "alamat";
  const key = crypto.scryptSync(password, "docpro", 24);
  const iv = Buffer.alloc(16, 0);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
  return encrypted;
};

exports.encryptPhone = (text) => {
  const password = "phone";
  const key = crypto.scryptSync(password, "docpro", 24);
  const iv = Buffer.alloc(16, 0);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
  return encrypted;
};

// Decrypt
exports.decryptNik = (encrypt) => {
  const password = "nik";
  const key = crypto.scryptSync(password, "docpro", 24);
  const iv = Buffer.alloc(16, 0);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  var decrypted =
    decipher.update(encrypt, "hex", "utf8") + decipher.final("utf8");

  return decrypted;
};
exports.decryptTtl = (encrypt) => {
  const password = "ttl";
  const key = crypto.scryptSync(password, "docpro", 24);
  const iv = Buffer.alloc(16, 0);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  var decrypted =
    decipher.update(encrypt, "hex", "utf8") + decipher.final("utf8");

  return decrypted;
};
exports.decryptAlamat = (encrypt) => {
  const password = "alamat";
  const key = crypto.scryptSync(password, "docpro", 24);
  const iv = Buffer.alloc(16, 0);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  var decrypted =
    decipher.update(encrypt, "hex", "utf8") + decipher.final("utf8");

  return decrypted;
};
exports.decryptPhone = (encrypt) => {
  const password = "phone";
  const key = crypto.scryptSync(password, "docpro", 24);
  const iv = Buffer.alloc(16, 0);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  var decrypted =
    decipher.update(encrypt, "hex", "utf8") + decipher.final("utf8");

  return decrypted;
};
